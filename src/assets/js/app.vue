<template>
  <div>
    <h3>Order toevoegen</h3>

    <b-form @submit="submitOrder">
      <b-form-group id="input-group-1" label="Aandeel" label-for="stock-name">
        <b-form-input id="stock-name" v-model="form.name" type="text" required></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Prijs per stuk" label-for="stock-price">
        <b-form-input id="stock-price" v-model="form.price" type="number" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Aantal" label-for="stock-quantity">
        <b-form-input id="stock-quantity" v-model="form.quantity" type="number" required></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="Verkooplimiet (%)" label-for="stock-limit">
        <b-form-input id="stock-limit" v-model="form.limit" type="number" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Voeg toe</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>

    <h3>Aankoop</h3>
    <b-table class="mb-4" striped hover :items="items" :fields="fields_buy"></b-table>

    <h3>Verkoop</h3>
    <b-table striped hover :items="items" :fields="fields_sell">
      <template v-slot:cell(stock_sell_limit)="data">
        <integer-plusminus v-model="data.item.stock_sell_limit" @input="changeSellLimit()">
        </integer-plusminus>
      </template>
    </b-table>
  </div>
</template>

<script>
import { IntegerPlusminus } from "vue-integer-plusminus";
import { Stock } from './stock.class';

export default {
  components: { IntegerPlusminus },
  data() {
    return {
      form: {
        name: "",
        price: null,
        quantity: null,
        limit: null
      },
      // Note 'isActive' is left out and will not appear in the rendered table
      fields_buy: [
        {
          key: "stock_name",
          label: "Aandeel",
          sortable: true
        },
        {
          key: "stock_quantity",
          label: "Aantal",
          sortable: false
        },
        {
          key: "stock_buy_piece",
          label: "Prijs per stuk",
          formatter: "currencyFormatter",
          sortable: true
        },
        {
          key: "stock_buy_costs",
          label: "Aankoopkosten",
          formatter: "currencyFormatter",
          sortable: true
        },
        {
          key: "stock_buy_price_total",
          label: "Totaal",
          formatter: "currencyFormatter",
          sortable: true
        }
      ],
      fields_sell: [
        {
          key: "stock_name",
          label: "Aandeel",
          sortable: true
        },
        {
          key: "stock_buy_price_total",
          label: "Totaal aankoop",
          formatter: "currencyFormatter",
          sortable: true
        },
        {
          key: "stock_sell_limit",
          label: "Verkooplimiet (%)",
          sortable: true
        },
        {
          key: "stock_profit",
          label: "Winst",
          formatter: "currencyFormatter",
          sortable: true
        },
        {
          key: "stock_sell_subtotal",
          label: "Subtotaal verkoopprijs",
          formatter: "currencyFormatter",
          sortable: true
        },
        {
          key: "stock_sell_costs",
          label: "Verkoopkosten",
          formatter: "currencyFormatter",
          sortable: true
        },
        {
          key: "stock_sell_total",
          label: "Totaal verkoopprijs",
          formatter: "currencyFormatter",
          sortable: true
        },
        {
          key: "stock_sell_piece_minimum",
          label: "Minimale verkoopprijs p/s",
          formatter: "currencyFormatter",
          sortable: true
        },
        {
          key: "stock_sell_difference",
          label: "Verkoopverschil p/s",
          formatter: "currencyFormatter",
          sortable: true
        }
      ],
      items: [
        // {
        //   stock_name: "Test",
        //   stock_quantity: 20,
        //   stock_buy_piece: 92.08,
        //   stock_sell_limit: 3
        // }
      ]
    };
  },
  methods: {
    submitOrder(evt) {
      evt.preventDefault();
      let data = this.form;
      let id = this.items.length + 1;

      const stock = new Stock(id, data)
      this.items.push(stock);
      this.calc();
    },
    changeSellLimit() {
      this.calc();
    },
    totalBuyPrice(item) {
      return item.stock_quantity * item.stock_buy_piece + item.stock_buy_costs;
    },
    stockBuyTransactionCosts(quantity, piecePrice) {
      if (quantity && piecePrice) {
        let transactionTotal = quantity * piecePrice;
        let transactionTotalSum = transactionTotal * 0.001 + 1;
        let transactionMinimum = 7;
        let transactionMaximum = 150;

        if (transactionTotalSum < transactionMinimum) {
          return transactionMinimum;
        } else if (transactionTotalSum > transactionMaximum) {
          return transactionMaximum;
        } else {
          return transactionTotalSum;
        }
      }
    },
    stockSellTransactionCosts(transactionTotal) {
      let transactionTotalSum = transactionTotal * 0.001 + 1;
      let transactionMinimum = 7;
      let transactionMaximum = 150;

      if (transactionTotalSum < transactionMinimum) {
        return transactionMinimum;
      } else if (transactionTotalSum > transactionMaximum) {
        return transactionMaximum;
      } else {
        return transactionTotalSum;
      }
    },
    calcStockProfit(item) {
      return (item.stock_sell_limit / 100) * item.stock_buy_price_total;
    },
    currencyFormatter(value) {
      let num = parseInt(value);
      return (
        "€ " +
        num
          .toFixed(2) // always two decimal digits
          .replace(".", ",") // replace decimal point character with ,
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
      );
    },
    calc() {
      this.items.forEach(item => {
        item.stock_buy_costs = this.stockBuyTransactionCosts(
          item.stock_quantity,
          item.stock_buy_piece
        );
        item.stock_buy_price_total = this.totalBuyPrice(item);
        item.stock_profit = this.calcStockProfit(item);
        item.stock_sell_subtotal =
          item.stock_buy_price_total + item.stock_profit;
        item.stock_sell_costs = this.stockSellTransactionCosts(
          item.stock_sell_subtotal
        );
        item.stock_sell_total =
          item.stock_sell_subtotal + item.stock_sell_costs;
        item.stock_sell_piece_minimum =
          item.stock_sell_total / item.stock_quantity;
        item.stock_sell_difference =
          item.stock_sell_piece_minimum - item.stock_buy_piece;
      });
    }
  },
  beforeMount() {
    this.calc();
  },
  watch: {
    items: {
      deep: true,
      handler() {
        console.log(this)
      }
    }
  }
};
</script>

<style>
</style>
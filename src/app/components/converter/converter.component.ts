import { Component, OnInit } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
    issue = new FormControl('');
    formatedIssue = '';
    copyComplete = false;

    constructor() {
        this.convert();
    }

    ngOnInit(): void {
        this.convert();
    }

    convert(): void {
        this.issue.valueChanges.subscribe((val: string) => {

            let newVal = val.replace(/\s+/g, '-');
            newVal = newVal.replace(/["'“”();:]/g, "")
            this.formatedIssue = newVal;
        });
    }

    copy(): void {
        console.log(this.formatedIssue);
        this.copyComplete = true;
    }
}

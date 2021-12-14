import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
    issue = new FormControl();
    convertedIssue = '';
    copyComplete = false;

    constructor(private clipboard: Clipboard) {
        this.convert();
    }

    ngOnInit(): void {
        this.convert();
    }

    convert(): void {
        this.issue.valueChanges.subscribe((val: string) => {

            let newVal = val.replace(/\s+/g, '-');
            newVal = newVal.replace(/["'“”();:!?]/g, "")
            this.convertedIssue = newVal;
        });
    }

    copy(): void {
        console.log(this.convertedIssue);
        this.clipboard.copy(this.convertedIssue);
        this.copyComplete = true;
    }
}

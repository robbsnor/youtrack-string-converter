import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { FormControl, FormGroup } from '@angular/forms';


interface Issue {
    prefix: string;
    title: string
}
@Component({
  selector: 'converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
    issue = new FormGroup({
        prefix: new FormControl('feature'),
        title: new FormControl('')
    });

    branchName = '';
    copyComplete = false;

    capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(private clipboard: Clipboard) {

        this.issue.valueChanges.subscribe((issue: Issue) => {
            // remove unwanted characters
            let title = issue.title.replace(/\s+/g, '-').replace(/["'“”();:!?.,\[\]]/g, "");

            // casing
            let projectName = title.substring(0, 3).toUpperCase();
            let restOfTitle = title.substring(3, 99).toLowerCase();

            let prefix = (issue.prefix === 'none') ? '': `${issue.prefix}/`;

            let branchName = prefix + projectName + restOfTitle;
            this.branchName = branchName;

            console.log(this.branchName);
        });
    }

    ngOnInit(): void {
    }

    copy(): void {
        this.clipboard.copy(this.branchName);
        this.copyComplete = true;
    }
}

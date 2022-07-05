import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { FormControl, FormGroup } from '@angular/forms';

export interface Suggestions {
    description: string;
    command: string;
}


interface Issue {
    prefix: string;
    title: string
}
@Component({
  selector: 'converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent {
    public issue = new FormGroup({
        prefix: new FormControl('feature'),
        title: new FormControl('')
    });
    public suggestions: Suggestions[] = [];
    public branchName = '';

    constructor(
        private clipboard: Clipboard
    ) {
        this.issue.valueChanges.subscribe((issue: Issue) => {
            this.branchName = this.getBranchGame(issue);
            this.suggestions = this.getSuggestions();
        });
    }

    getSuggestions() {
        return this.suggestions = [
            {
                description: 'Copy new branch name',
                command: this.branchName
            },
            {
                description: 'Create new branch',
                command: `git checkout -b ${this.branchName}`
            },
            {
                description: 'Create new branch from master',
                command: `git checkout master && git pull && git checkout -b ${this.branchName}`
            },
        ]
    }

    getBranchGame(issue: Issue) {
        // remove unwanted characters
        const title = issue.title.replace(/\s+/g, '-').replace(/["'“”();:!?.,\[\]]/g, "");

        // casing
        const projectName = title.substring(0, 3).toUpperCase();
        const restOfTitle = title.substring(3).toLowerCase();

        const prefix = (issue.prefix === 'none') ? '': `${issue.prefix}/`;

        const branchName = prefix + projectName + restOfTitle;

        return branchName
    }

    capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    copy(text: string): void {
        this.clipboard.copy(text);
    }
}

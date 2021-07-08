import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from './app.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

//import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  constructor(private appService: AppService) { this.articles = []; }

  title = 'news-search-app';

  userForm = new FormGroup({
    searchValidation: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(40), Validators.pattern('^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$')]))
    /*lastName: new FormControl('', Validators.nullValidator && Validators.required),
    email: new FormControl('', Validators.nullValidator && Validators.required)*/
  });

  articles: any[] = [];
  userCount = 0;
  searchTerm: string = "";
  searchTermIsValid: boolean = true;
  reqURL: string = "";
  noResults: boolean = false;
  reqBodyForLog = {};

  destroy$: Subject<boolean> = new Subject<boolean>();

  onSubmit() {

    console.log("userForm.valid is " + this.userForm.valid);
    console.log(this.userForm.controls);
    this.searchTermIsValid = true;
    this.noResults = false;
    this.articles = [];

    
    if (this.userForm.controls.searchValidation.valid == false) {
      console.log("searchValidation.valid is false");
      this.searchTermIsValid = false;
    }
    else {
      var self = this;
      this.searchTerm = (document.getElementById("searchInput") as HTMLInputElement).value;
      console.log(this.searchTerm.length);
      this.reqURL = "https://gnews.io/api/v4/search?q=" + this.searchTerm + "&token=" + environment.api_key;
      console.log("reqURL is " + this.reqURL);

      fetch(this.reqURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);

          console.log("*");
          console.log("articles.length is " + self.articles.length);
          console.log("*");

          if (data.totalArticles == 0) {
            self.noResults = true;
          }
          else if (data.totalArticles > 0 && data.totalArticles <= 9) {
            self.articles = data.articles;
          }
          else {
            self.articles = data.articles.slice(0, 9);
          }
          console.log(self.articles);
        });

      this.reqBodyForLog = { userId: 0, searchTerm: this.searchTerm };

      this.appService.addSearchQuery(this.reqBodyForLog).pipe(takeUntil(this.destroy$)).subscribe(data => {
        console.log('message from server::::', data);
        //this.userCount = this.userCount + 1;
        //console.log(this.userCount);
        //this.userForm.reset();
      });

    }  
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

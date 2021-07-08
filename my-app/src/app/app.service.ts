import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  rootURL = 'http://localhost:3080/api';

  getSearchQueries() {
    return this.http.get(this.rootURL + '/searchQueries');
  }

  addSearchQuery(searchQuery: any) {
    return this.http.post(this.rootURL + '/searchQuery', {searchQuery});
  }

  getArticlesClicked() {
    return this.http.get(this.rootURL + '/articlesClicked');
  }

  addArticleClicked(articleClicked: any) {
    return this.http.post(this.rootURL + '/articleClicked', { articleClicked });
  }

}

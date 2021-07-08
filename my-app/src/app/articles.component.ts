import { Component, OnInit, Input } from '@angular/core';
import { AppService } from './app.service';
//import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(private appService: AppService) { }//constructor() { }

  reqBodyForLog = {};

  @Input() articles: any[];

  ngOnInit(): void {
  }

  openInNewTab(e) {
    
    e.preventDefault();
    console.log(e);

    window.open(this.articles[e.srcElement.id].url, "_blank");

    this.reqBodyForLog = { userId: 0, articleClicked: this.articles[e.srcElement.id] };

    this.appService.addArticleClicked(this.reqBodyForLog).pipe().subscribe(data => {
      console.log('message from server::::', data);
    });
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor() { }

  @Input() articles: any[];

  ngOnInit(): void {
  }

  openInNewTab(e) {
    
    e.preventDefault();
    console.log(e);
    window.open(e.srcElement.id, "_blank");
  }

}

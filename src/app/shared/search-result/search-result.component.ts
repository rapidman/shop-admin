import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {DetailService} from "../service/detail/detail.service";
import {PageEvent} from "@angular/material";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  sub: Subscription;
  tiles: any[];
  query: string;
  length = 0;
  pageSize = 8;
  pageIndex = 0;
  pageEvent: PageEvent;

  constructor(private route: ActivatedRoute, private detailService: DetailService) {
    this.detailService = this.detailService;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.query = params['query'];
      if (this.query) {
        this.loadData(this.pageIndex, this.pageSize);
      }
    });
  }

  getServerData($event: PageEvent) {
    this.loadData($event.pageIndex, $event.pageSize);
    return event;
  }

  loadData(page: number, size: number) {
    this.detailService.getAutoComplete(this.query, page, size).subscribe(data => {
      this.tiles = data['content'];
      console.log(this.tiles);
      for (let group of this.tiles) {
        if (group.type === 'CATEGORY') {
          group.name = 'Категории';
        } else {
          group.name = 'Товары';
        }
      }
      this.pageIndex = data['number'];
      this.pageSize = data['size'];
      this.length = data['totalElements'];
    });
  }

}

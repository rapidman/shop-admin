import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {DetailService} from "../../shared/service/detail/detail.service";
import {PageEvent} from "@angular/material";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  sub: Subscription;
  tiles: any[];
  length = 0;
  pageSize = 8;
  pageIndex = 0;
  pageEvent: PageEvent;
  categoryId: string;


  constructor(public route: ActivatedRoute, private readonly detailService: DetailService) {
    this.detailService = this.detailService;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.categoryId = params['id'];
      if (this.categoryId) {
        this.loadData(this.pageIndex, this.pageSize);
      }
    });
  }


  getServerData($event: PageEvent) {
    this.loadData($event.pageIndex, $event.pageSize);
    return event;
  }

  loadData(page: number, size: number) {
    this.detailService.findGoodsByCategoryId(this.categoryId, page, size).subscribe(data => {
      this.tiles = data['content'];
      this.pageIndex = data['number'];
      this.pageSize = data['size'];
      this.length = data['totalElements'];
    });
  }
}

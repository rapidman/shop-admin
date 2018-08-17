import {Component, OnInit} from '@angular/core';
import {CatalogService} from "../service/catalog/catalog.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  items: Array<any>;

  constructor(private catalogService: CatalogService) {
    this.catalogService = this.catalogService;
  }

  ngOnInit() {
    this.catalogService.getAll().subscribe(data => {
      this.items = data.content;
    });
  }
}

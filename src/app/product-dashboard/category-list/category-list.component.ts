import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {CatalogService, Category} from "../../shared/service/catalog/catalog.service";


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'goodsSize', 'actions'];
  dataSource: MatTableDataSource<Category>;
  items: Array<Category>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private catalogService: CatalogService) {
    this.catalogService = this.catalogService;
  }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.catalogService.getAll().subscribe(data => {
      this.items = data.content;
      this.dataSource = new MatTableDataSource(this.items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id: number) {
    alert(id);
    this.catalogService.delete(id).subscribe(() => {
      this.loadData();
    })
  }
}

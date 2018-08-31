import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {CatalogService, Category} from "../../shared/service/catalog/catalog.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'goodsSize', 'actions'];
  dataSource: MatTableDataSource<Category>;
  items: Array<Category>;
  public static returned: Subject<any> = new Subject();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private router: Router;

  constructor(private readonly catalogService: CatalogService,
              router: Router) {
    this.catalogService = this.catalogService;
    this.router = router;
    CategoryListComponent.returned.subscribe(res => {
      this.loadData();
    });
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

  delete(id: number, name: string) {
    if (confirm("Вы действительно хотите удалить категорию '" + name + "' вместе со всеми ее товарами?")) {
      this.catalogService.delete(id).subscribe(() => {
        this.loadData();
      })
    }
  }

  edit(id: number) {
    this.router.navigate(['/category/edit']);
  }

  addCategory() {
    this.router.navigate(['/category/add']);
  }
}

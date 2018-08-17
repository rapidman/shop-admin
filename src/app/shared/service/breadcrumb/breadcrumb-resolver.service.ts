import {Injectable} from '@angular/core';
import {CatalogService} from "../catalog/catalog.service";
import {DetailService} from "../detail/detail.service";

@Injectable()
export class BreadcrumbResolverService {

  constructor(private catalogService: CatalogService,
              private productService: DetailService) {
  }

  resolve(param: any, label: string, breadcrumb: any) {
    if (label === 'CatId') {
      this.catalogService.getById(param).subscribe(data => {
        breadcrumb.label = data.name;
      });
    }
    if (label === 'ProdId') {
      this.productService.getById(param).subscribe(data => {
        breadcrumb.label = data.name;
      });
    }
    if (label === 'Search') {
      breadcrumb.label = 'Поиск';
      breadcrumb.url = 'search-result';
    }
  }
}

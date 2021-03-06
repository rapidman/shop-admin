import {Component, OnInit} from '@angular/core';
import {CategoryListComponent} from "../category-list/category-list.component";
import {BaseCategoryEditComponent} from "../base-category-edit.component";
import {Router} from "@angular/router";
import {CatalogService} from "../../shared/service/catalog/catalog.service";

export interface CreateCategoryRequest {
  name: string
}

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent extends BaseCategoryEditComponent implements OnInit {

  constructor(protected router: Router,
              protected catalogService: CatalogService) {
    super(router, catalogService);
  }


  ngOnInit() {
  }

  sendCategory() {
    this.nameFormControl.markAsTouched({onlySelf: true});
    let ok = true;
    if (!this.checkName()) {
      ok = false;
    }
    if (ok) {
      let category: CreateCategoryRequest = {
        name: this.name
      };
      this.catalogService.createCategory(category)
        .subscribe(result => {
            CategoryListComponent.returned.next(false);
            this.router.navigate(['/category']);
          },
          error => {
            this.errors = error.error.message;
          }
        );
    }
  }
}

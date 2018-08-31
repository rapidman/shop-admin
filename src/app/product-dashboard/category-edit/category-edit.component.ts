import { Component, OnInit } from '@angular/core';
import {BaseCategoryEditComponent} from "../base-category-edit.component";
import {CategoryListComponent} from "../category-list/category-list.component";
import {CreateCategoryRequest} from "../category-add/category-add.component";
import {Router} from "@angular/router";
import {CatalogService} from "../../shared/service/catalog/catalog.service";

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent extends BaseCategoryEditComponent  implements OnInit {

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

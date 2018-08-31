import { Component, OnInit } from '@angular/core';
import {BaseCategoryEditComponent} from "../base-category-edit.component";
import {CategoryListComponent} from "../category-list/category-list.component";
import {CreateCategoryRequest} from "../category-add/category-add.component";
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogService, Category} from "../../shared/service/catalog/catalog.service";
import {Subscription} from "rxjs";

export interface EditCategoryRequest {
  id: number
  name: string
}


@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent extends BaseCategoryEditComponent  implements OnInit {
  sub: Subscription;
  category: Category;

  constructor(protected router: Router,
              protected catalogService: CatalogService,
              private route: ActivatedRoute) {
    super(router, catalogService);
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.catalogService.getById(id).subscribe(data => {
          this.category = data;
          this.name = this.category.name;
        });
      }
    });
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
      let category: EditCategoryRequest = {
        id: this.category.id,
        name: this.name
      };
      this.catalogService.updateCategory(category)
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

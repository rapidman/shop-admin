import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {CatalogService} from "../../shared/service/catalog/catalog.service";
import {Router} from "@angular/router";
import {CategoryListComponent} from "../category-list/category-list.component";

export interface CreateCategoryRequest {
  name: string
}

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  name: string;
  errors: string;

  constructor(private router: Router,
              private catalogService: CatalogService) {
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

  public checkName() {
    return !this.nameFormControl.hasError('required');
  }

  onNameKey($event: any) {
    this.name = $event.target.value;
  }
}

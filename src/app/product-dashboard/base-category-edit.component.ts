import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CatalogService} from "../shared/service/catalog/catalog.service";

export abstract class BaseCategoryEditComponent {
  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  name: string;
  errors: string;

  constructor(protected router: Router,
              protected catalogService: CatalogService) {
  }

  public checkName() {
    return !this.nameFormControl.hasError('required');
  }

  onNameKey($event: any) {
    this.name = $event.target.value;
  }
}

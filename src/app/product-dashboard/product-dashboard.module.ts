import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryComponent} from "./category/category.component";
import {DetailComponent} from "./detail/detail.component";
import {RouterModule, Routes} from "@angular/router";
import {CategoryListComponent} from "./category-list/category-list.component";
import {
  MatAutocompleteModule, MatBadgeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../shared/shared.module";
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';


const routes: Routes = [
  {
    path: 'category',
    data: {
      breadcrumb: 'Товарные категории'
    },
    children: [
      {
        path: '',
        component: CategoryListComponent,
        data: {
          breadcrumb: ''
        },
        children:[
          {
            path: 'add',
            component: CategoryAddComponent,
            data: {
              breadcrumb: 'Добавление категории'
            }
          },
          {
            path: 'edit',
            component: CategoryEditComponent,
            data: {
              breadcrumb: 'Редактирование категории'
            }
          },
        ]
      },
      {
        path: ':id',
        component: CategoryComponent,
        data: {
          breadcrumb: 'CatId'
        },
        children:[
          {
            path: 'detail/:id',
            component: DetailComponent,
            data: {
              breadcrumb: 'ProdId'
            }
          },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [
    FlexLayoutModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    // MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  exports: [ RouterModule],
  declarations: [CategoryListComponent, CategoryComponent, CategoryAddComponent, CategoryEditComponent, DetailComponent]
})
export class ProductDashboardModule { }

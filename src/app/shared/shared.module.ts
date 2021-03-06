import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailService} from "./service/detail/detail.service";
import {CatalogService} from "./service/catalog/catalog.service";
import {RouterModule, Routes} from "@angular/router";
import {
  MatAutocompleteModule, MatBadgeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule, MatDatepickerModule, MatDialogModule,
  MatDividerModule,
  MatExpansionModule, MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule,
  MatRippleModule, MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule, MatToolbarModule,
  MatTooltipModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FlexLayoutModule} from "@angular/flex-layout";
import {HttpClientModule} from "@angular/common/http";
import {UICarouselModule} from "ui-carousel";
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";
import {BreadcrumbResolverService} from "./service/breadcrumb/breadcrumb-resolver.service";
import { ProductCardComponent } from './product-card/product-card.component';

const routes: Routes = [
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
    // MatBadgeModule,
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
    UICarouselModule,
    MatBadgeModule,
    // MatTreeModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [ RouterModule,
    BreadcrumbComponent, ProductCardComponent ],
  declarations: [BreadcrumbComponent, ProductCardComponent],
  providers: [DetailService, CatalogService, BreadcrumbResolverService]
})
export class SharedModule {
}

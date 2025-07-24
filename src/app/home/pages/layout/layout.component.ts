import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BannerComponent } from '../../components/banner/banner.component';
import { SectionCategoryComponent } from '../../components/section-category/section-category.component';

@Component({
  imports: [NavbarComponent, BannerComponent, SectionCategoryComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.sass'
})
export class LayoutComponent {

}

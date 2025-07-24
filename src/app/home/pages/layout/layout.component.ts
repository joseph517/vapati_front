import { Component } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { SectionCategoryComponent } from '../../components/section-category/section-category.component';

@Component({
  imports: [ BannerComponent, SectionCategoryComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.sass'
})
export class LayoutComponent {

}

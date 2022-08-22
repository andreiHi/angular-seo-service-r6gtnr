import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HomeSeoService } from '../../services/home.seo.service';

@Component({
  template: `
   <div class="container">
   Home
   </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(private seoService: HomeSeoService) {
    //
  }
  ngOnInit(): void {
    this.seoService.setHome();
  }
}

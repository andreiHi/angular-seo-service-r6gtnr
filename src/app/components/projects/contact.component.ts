import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  template: `
  <div class="container">
  <h4 class="f5 spaced">Contact us regarding a project</h4>
 
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectContactComponent implements OnInit {
  constructor() {
  }
  ngOnInit(): void {
   
  }
}

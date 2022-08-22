import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProjectSeoService } from '../../services/project.seo.service';

const mockProject = {
  title: 'Turtle Rock',
  description: 'A place to build a turtle',
  image: 'https://picsum.photos/200/100',
  id: '56',
  category: { value: 'Turtles', key: 'turtles' },
};
@Component({
  template: `<div class="container" *ngIf="project$ | async as project">
  <h3 class="f3 ">{{ project.title }}</h3>
  <img src="{{project.image}}" >
  <p>{{ project.description }}</p>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectViewComponent implements OnInit {
  project$: Observable<any>;

  constructor(private route: ActivatedRoute, private seoService: ProjectSeoService) {
    //
  }
  ngOnInit(): void {
    this.project$ = this.route.paramMap.pipe(
      switchMap((params) => {
        // get project from service by params
        return of(mockProject);
      }),
      // map or tap
      tap((project) => {
        this.seoService.setProject(project);
      })
    );
  }
}

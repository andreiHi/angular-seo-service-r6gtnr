import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { IListParams, IProject } from '../../services/models';
import { ProjectSeoService } from '../../services/project.seo.service';

const projects: IProject[] = [
  {
    id: '1',
    title: 'Turtle Rock',
    description: 'A place to build a turtle',
    image: 'https://picsum.photos/50/50',
    category: { key: 'turtles', value: 'Turtles' },
  },
  {
    id: '2',
    title: 'Turtle Rock 2',
    description: 'A place to build a turtle',
    image: 'https://picsum.photos/50/50',
    category: { key: 'turtles', value: 'Turtles' },
  },
  {
    id: '3',
    title: 'Turtle Rock 3',
    description: 'A place to build a turtle 4',
    image: 'https://picsum.photos/50/50',
    category: { key: 'turtles', value: 'Turtles' },
  },
];

@Component({
  template: `
  <div class="container">
  <h4 class="f5 spaced">Project list</h4>
  <ul class="row row-gap boxed umd-3">
      <li class="box-shadow-normal spaced" *ngFor="let project of projects$ | async">
          <h3 class="f3 a" routerLink="/projects/{{project.id}}">{{ project.title }}</h3>
          <img src="{{project.image}}" >
          <p>{{ project.description }}</p>
      </li>
  </ul>
  <a (click)="next($event)" [href]="seoLink">Next</a>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListComponent implements OnInit {
  projects$: Observable<IProject[]>;
  seoLink: string;

  constructor(private seoService: ProjectSeoService) {
    //
  }
  ngOnInit(): void {
    // get list then update

    // assuming search occurs on url params, or query params.
    // the result set should include exact category
    this.projects$ = of(projects).pipe(
      map((projects) => {
        const results: IListParams = {
          total: 234,
          page: 1,
          category: { key: 'turtles', value: 'Turtles' },
        };
        // the next page url is /projects;category=turtles;page=2
        // TODO: test this on ssr
        this.seoLink =
          this.seoService.url +
          `;category=${results.category.key};page=${results.page + 1}`;
        this.seoService.setSearchResults(results, projects);
        return projects;
      })
    );
  }

  next(clickEvent: MouseEvent) {
    // go to next page then stop
    clickEvent.preventDefault();
  }
}

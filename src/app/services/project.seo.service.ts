import { Injectable } from '@angular/core';
import { RES, toFormat } from '../resources';
import { IListParams, IProject } from './models';
import { SeoService } from './seo.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectSeoService extends SeoService {
  setProject(project: IProject) {
    // set title
    this.setTitle(
      toFormat(
        RES.SEO_CONTENT.PROJECT_TITLE,
        project.title,
        project.category.value
      )
    );

    // set url
    this.setUrl();

    // set description
    this.setDescription(project.description);

    // set image
    this.setImage(project.image);

    // empty first
    this.emptyJsonSnippet();

    this.updateJsonSnippet({
      '@type': 'Article',
      headline: project.title,
      image: project.image,
      datePublished: project.dateCreated,
      author: [
        {
          '@type': 'Organization',
          name: RES.SITE_NAME,
          url: this.defaultUrl,
        },
      ],
    });

    // add a breadcrumb: Turtles > Turtle Rock
    this.updateJsonSnippet({
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: project.category.value,
          item: this.siteUrl + 'projects?categories=' + project.category.key,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: project.title,
        },
      ],
    });
  }

  setSearchResults(params: IListParams, projects: IProject[]) {
    // Title: 34 projects in Turtles.
    // Desc: Found 34 projects categorized under Turtles.

    this.setTitle(
      toFormat(
        RES.SEO_CONTENT.PROJECT_RESULTS_TITLE,
        params.total,
        params.category.value
      )
    );
    this.setDescription(
      toFormat(
        RES.SEO_CONTENT.PROJECT_RESULTS_DESC,
        params.total,
        params.category.value
      )
    );

    // pass params as is
    this.setUrl(params);
    this.setImage();

    // empty snippets
    this.emptyJsonSnippet();
    // for every element, construct url
    // region.domain.com/language/projects/id
    let i = 1;
    const url = this.siteUrl + 'projects/';

    this.updateJsonSnippet({
      '@type': 'ItemList',
      itemListElement: projects.map((n) => {
        return {
          '@type': 'ListItem',
          url: url + n.id,
          position: i++,
        };
      }),
    });
  }
}

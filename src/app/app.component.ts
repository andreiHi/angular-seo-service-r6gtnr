import { Component, VERSION } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SeoService } from './services/seo.service';
// seo service documented here https://garage.sekrab.com/posts/seo-in-angular-with-ssr-part-i

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService
  ) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event) => {
        // get the route, right from the root child
        // this allows a title to be set at any level
        // but for this to work, the routing module should be set with paramsInheritanceStrategy=always
        let route = this.activatedRoute.snapshot;
        while (route.firstChild) {
          route = route.firstChild;
        }
        this.seoService.setPage((<any>route.data)?.title);
      });
  }
}

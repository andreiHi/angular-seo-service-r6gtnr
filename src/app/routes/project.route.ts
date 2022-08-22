import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectContactComponent } from '../components/projects/contact.component';
import { ProjectListComponent } from '../components/projects/list.component';
import { ProjectViewComponent } from '../components/projects/view.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
  },
  {
    path: 'contact',
    component: ProjectContactComponent,
    data: {
      title: 'PROJECT_CONTACT',
    },
  },
  {
    path: ':id',
    component: ProjectViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  declarations: [ProjectListComponent, ProjectViewComponent],
})
export class ProjectRoutingModule {}

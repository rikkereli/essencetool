//npm ci && npm run buildimport 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryBoxComponent } from './category-box/category-box.component';
import { CategoryOverviewComponent } from './category-overview/category-overview.component';

const routes: Routes = [
  { path: 'diagramTool', component: CategoryOverviewComponent, },
  {path: '', component: CategoryOverviewComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

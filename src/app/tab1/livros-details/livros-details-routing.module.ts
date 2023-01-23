import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivrosDetailsPage } from './livros-details.page';

const routes: Routes = [
  {
    path: '',
    component: LivrosDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivrosDetailsPageRoutingModule {}

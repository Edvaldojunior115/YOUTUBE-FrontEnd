import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DescargarVideosPage } from './descargar-videos.page';

const routes: Routes = [
  {
    path: '',
    component: DescargarVideosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DescargarVideosPageRoutingModule {}

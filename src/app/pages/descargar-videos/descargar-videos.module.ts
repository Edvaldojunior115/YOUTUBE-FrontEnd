import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DescargarVideosPageRoutingModule } from './descargar-videos-routing.module';

import { DescargarVideosPage } from './descargar-videos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DescargarVideosPageRoutingModule
  ],
  declarations: [DescargarVideosPage]
})
export class DescargarVideosPageModule {}

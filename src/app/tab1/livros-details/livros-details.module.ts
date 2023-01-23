import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivrosDetailsPageRoutingModule } from './livros-details-routing.module';

import { LivrosDetailsPage } from './livros-details.page';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseService } from 'src/app/services/firebase.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule,
    LivrosDetailsPageRoutingModule
  ],
  declarations: [LivrosDetailsPage],
  providers:[FirebaseService]
})
export class LivrosDetailsPageModule {}

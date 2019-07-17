import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAnimalComponent } from './add-animal/add-animal.component';
import { AnimalsComponent } from './animals/animals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdoptedAnimalsComponent } from './adopted-animals/adopted-animals.component';
import { RouterModule } from '@angular/router';
import { EditAnimalComponent } from './edit-animal/edit-animal.component';

@NgModule({
  declarations: [
    AddAnimalComponent,
    AnimalsComponent,
    AdoptedAnimalsComponent,
    EditAnimalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AnimalModule { }

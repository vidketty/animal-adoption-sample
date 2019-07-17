import { Component, OnInit } from '@angular/core';
import Animal from 'src/app/models/animal';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-adopted-animals',
  templateUrl: './adopted-animals.component.html',
  styleUrls: ['./adopted-animals.component.css']
})
export class AdoptedAnimalsComponent implements OnInit {

  animals: Animal[];

  constructor(private animalService: AnimalService) { }

  ngOnInit() {
    this.getAnimals();
  }

  getAnimals(): void {
    this.animalService
      .getAdoptedAnimals()
      .subscribe((data: any) => {
        this.animals = data;
      });

  }

}

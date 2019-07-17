import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';
import Animal from 'src/app/models/animal';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {

  animals: Animal[];

  constructor(private animalService: AnimalService) { }

  ngOnInit() {
    this.getAnimals();
  }

  getAnimals(): void {
    this.animalService
      .getAnimals()
      .subscribe((data: any) => {
        this.animals = data;
      });

  }

  markAsAdopted(id) {
    this.animalService.markAsAdopted(id).subscribe(res => {
      this.getAnimals();
      console.log('Updated');
    });
  }
}

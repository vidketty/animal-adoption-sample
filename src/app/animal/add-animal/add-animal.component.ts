import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnimalService } from '../animal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.css']
})
export class AddAnimalComponent implements OnInit {
  angForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private animalService: AnimalService
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['male', Validators.required],
      type: ['dog', Validators.required]
    });
  }

  addAnimal(name, gender, type) {
    this.animalService.addAnimal(name, gender, type).subscribe((response) => {
      this.router.navigate(['/animal/shalter'])
    })
  }

  ngOnInit() {
  }

}

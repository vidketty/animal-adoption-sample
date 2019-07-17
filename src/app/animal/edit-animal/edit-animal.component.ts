import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-edit-animal',
  templateUrl: './edit-animal.component.html',
  styleUrls: ['./edit-animal.component.css']
})
export class EditAnimalComponent implements OnInit {

  angForm: FormGroup;
  animal: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animalService: AnimalService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.animalService.editAnimal(params['id']).subscribe(res => {
        this.animal = res;
      });
    });
  }

  updateAnimal(name, gender) {
    this.route.params.subscribe(params => {
      this.animalService.updateEditAnimal(name, gender, params['id']);
      this.router.navigate(['animals']);
    });
  }
}

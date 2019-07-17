import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  uri = '/api/animal';

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) { }

  getHeaders(): HttpHeaders {
    const token = this.storage.get('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if(token) {
      headers.append('Authrization', token)
    }

    return headers;
  }

  addAnimal(name, gender, type): Observable<any> {
    const obj = {
      name,
      gender,
      type
    };

    return this.http.post(`${this.uri}/add`, obj, { headers: this.getHeaders() })
  }

  getAdoptedAnimals(): any {
    return this
      .http
      .get(`${this.uri}/adopted`, { headers: this.getHeaders() });
  }

  getAnimals(pageNo=1, size=15): any {
    return this
      .http
      .get(`${this.uri}?pageNo=${pageNo}&size=${size}`, { headers: this.getHeaders() });
  }


  editAnimal(id): Observable<any> {
    return this
      .http
      .get(`${this.uri}/edit/${id}`, { headers: this.getHeaders() });
  }

  markAsAdopted(id): Observable<any> {
    return this
      .http
      .post(`${this.uri}/adopt/${id}`, {}, { headers: this.getHeaders() })
  }

  updateEditAnimal(name, gender, id): Observable<any> {

    const obj = {
      name,
      gender
    };

    return this
      .http
      .post(`${this.uri}/update/${id}`, obj, { headers: this.getHeaders() })
  }

}

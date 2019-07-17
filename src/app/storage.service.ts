import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  get(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  set(key: string, data: any): any {
    return localStorage.setItem(key, JSON.stringify(data));
  }

  remove(key: string): any {
    return localStorage.removeItem(key);
  }
}

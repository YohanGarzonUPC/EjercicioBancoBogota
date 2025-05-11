import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  registrarPracticante(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, formData);
  }
}

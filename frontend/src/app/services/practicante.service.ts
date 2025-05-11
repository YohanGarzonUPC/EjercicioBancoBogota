import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PracticanteService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getPracticantes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/practicantes`);
  }

  actualizarViabilidad(id: number, esViable: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/practicantes/${id}/viabilidad`, { pasa: esViable });
  }

  eliminarPracticante(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/practicantes/${id}`);
  }

  descargarCV(filename: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${filename}`, {
      responseType: 'blob'
    });
  }
}

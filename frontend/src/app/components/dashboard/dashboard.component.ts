import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { PracticanteService } from '../../services/practicante.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  practicantes: any[] = [];
  error: string = '';

  constructor(
    private authService: AuthService,
    private practicanteService: PracticanteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarPracticantes();
  }

  cargarPracticantes() {
    this.practicanteService.getPracticantes().subscribe({
      next: (response) => {
        this.practicantes = response.data.sort((a: any, b: any) => {
          if (a.pasa === null) return -1; // Sin clasificar primero
          if (b.pasa === null) return 1;
          if (a.pasa === true && b.pasa === false) return -1; // Viables antes que no viables
          if (a.pasa === false && b.pasa === true) return 1;
          return 0;
        });
      },
      error: (error) => {
        this.error = 'Error al cargar los practicantes';
        console.error(error);
      }
    });
  }

  marcarViable(id: number, esViable: boolean) {
    this.practicanteService.actualizarViabilidad(id, esViable).subscribe({
      next: (response) => {
        this.cargarPracticantes(); // Recargar la lista
      },
      error: (error) => {
        this.error = 'Error al actualizar la viabilidad';
        console.error(error);
      }
    });
  }

  eliminarPracticante(id: number) {
    this.practicanteService.eliminarPracticante(id).subscribe({
      next: () => {
        this.cargarPracticantes(); // Recargar la lista después de marcar como no viable
      },
      error: (error) => {
        this.error = 'Error al marcar como no viable';
        console.error(error);
      }
    });
  }

  descargarCV(filename: string) {
    this.practicanteService.descargarCV(filename).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        this.error = 'Error al descargar el CV';
        console.error(error);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
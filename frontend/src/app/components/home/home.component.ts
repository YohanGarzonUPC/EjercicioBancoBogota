import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RegistroService } from '../../services/registro.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  formData = {
    fullName: '',
    email: '',
    career: '',
    semester: '',
    resume: null as File | null
  };
  error: string = '';
  success: string = '';
  showModal: boolean = false;
  selectedFileName: string = ''; // Agregar esta propiedad

  semestres = Array.from({length: 12}, (_, i) => i + 1);

  private fileInput: HTMLInputElement | null = null; // Agregar una referencia al input de archivo

  constructor(private RegistroService: RegistroService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.formData.resume = file;
      this.selectedFileName = file.name;
      this.fileInput = event.target; // Guardar referencia al input
    } else {
      alert('Por favor, sube un archivo PDF');
      event.target.value = '';
      this.selectedFileName = '';
    }
  }

  onSubmit() {
    if (this.isFormValid()) {
      const formData = new FormData();
      formData.append('fullName', this.formData.fullName);
      formData.append('email', this.formData.email);
      formData.append('career', this.formData.career);
      formData.append('semester', this.formData.semester);
      if (this.formData.resume) {
        formData.append('cv', this.formData.resume);
      }

      this.RegistroService.registrarPracticante(formData)
        .subscribe({
          next: (response) => {
            this.success = 'Registro exitoso';
            this.showModal = true;
            this.resetForm();
          },
          error: (error) => {
            this.error = error.error.error || 'Error en el registro';
          }
        });
    } else {
      this.error = 'Por favor, completa todos los campos obligatorios';
    }
  }

  closeModal() {
    this.showModal = false;
  }

  private resetForm() {
    this.formData = {
      fullName: '',
      email: '',
      career: '',
      semester: '',
      resume: null
    };
    this.selectedFileName = ''; // Limpiar también el nombre del archivo
    this.error = '';
    if (this.fileInput) { // Limpiar el input de archivo
      this.fileInput.value = '';
    }
  }

  private isFormValid(): boolean {
    return !!(this.formData.fullName && 
              this.formData.email && 
              this.formData.career && 
              this.formData.semester &&
              this.formData.resume);
  }
}

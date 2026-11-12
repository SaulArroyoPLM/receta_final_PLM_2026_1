import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { RegistroDialog } from '../../components/auth/registro-modal/registro-modal';
import { AuthMockService, UsuarioAutenticado } from '../../services/auth-mock.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;
  errorMessage = '';
  usuarioActual: UsuarioAutenticado | null = null;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthMockService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      remember: [false]
    });
  }

  ngOnInit(): void {

    this.authService.currentUser$.subscribe(usuario => {
      this.usuarioActual = usuario;
    });
    this.llenarDatosPrueba();
  }

  llenarDatosPrueba(): void {
    this.loginForm.patchValue({
      email: '',
      password: ''
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const credentials = {
      correo: this.loginForm.value.email,
      contrasena: this.loginForm.value.password
    };


    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading = false;

        if (response.success && response.usuario) {



          this.snackBar.open(
            `¡Bienvenido Dr. ${response.usuario.nombreCompleto}!`,
            'Cerrar',
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['success-snackbar']
            }
          );


          if (this.loginForm.value.remember) {
            localStorage.setItem('rememberMe', 'true');
          }


          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1500);
        } else {
          this.errorMessage = response.mensaje || 'Error al iniciar sesión';
          this.showErrorSnackbar(this.errorMessage);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Error al conectar con el servidor';
        console.error('Error en login:', error);
        this.showErrorSnackbar(this.errorMessage);
      }
    });
  }

  abrirRegistro(): void {
    const dialogRef = this.dialog.open(RegistroDialog, {
      width: '90vw',
      height: '90vh',
      maxWidth: '1100px',
      maxHeight: '850px',
      panelClass: 'registro-dialog-container',
      disableClose: false,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.snackBar.open(
          `¡Bienvenido Dr. ${result.usuario.nombreCompleto}! Tu cuenta ha sido creada exitosamente.`,
          'Cerrar',
          {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          }
        );


        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      } else if (result && !result.success) {
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.usuarioActual = null;
    this.loginForm.reset();
    localStorage.removeItem('rememberMe');

    this.snackBar.open(
      'Sesión cerrada exitosamente',
      'Cerrar',
      {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      }
    );
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }


  abrirModalRecordar(): void {
    this.recuperarContrasena();
  }

  recuperarContrasena(): void {
    this.snackBar.open(
      'Función de recuperación de contraseña en desarrollo',
      'Cerrar',
      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      }
    );
  }


  private showErrorSnackbar(message: string): void {
    this.snackBar.open(
      message,
      'Cerrar',
      {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      }
    );
  }

  getEmailErrorMessage(): string {
    const control = this.loginForm.get('email');
    if (control?.hasError('required')) {
      return 'El email es requerido';
    }
    if (control?.hasError('email')) {
      return 'Email no válido';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    const control = this.loginForm.get('password');
    if (control?.hasError('required')) {
      return 'La contraseña es requerida';
    }
    if (control?.hasError('minlength')) {
      return 'Mínimo 8 caracteres';
    }
    return '';
  }
  get isAuthenticated(): boolean {
    return this.usuarioActual !== null;
  }
}
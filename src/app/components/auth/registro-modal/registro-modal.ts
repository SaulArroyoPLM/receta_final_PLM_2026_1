import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { AuthMockService } from '../../../services/auth-mock.service';
import { CampoAuth } from '../../campo-auth/campo-auth';

export const MY_DATE_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

const CEDULA_DEMO = '12345678';

const DATOS_DEMO: Record<string, unknown> = {
  nombre: 'Saul',
  primerApellido: 'Arroyo',
  segundoApellido: 'Pozos',
  correo: 'saul@ejemplo.com',
  celular: '5512345678',
  fechaNacimiento: '1997-06-11',
  codigoPostal: '06700',
  titulo: 'Médico cirujano',
  institucion: 'UNAM',
};

function soloDigitos(valor: unknown): string {
  return String(valor ?? '').replace(/\D/g, '');
}

export function validarCedula(valor: string) {
  const digitos = soloDigitos(valor);
  if (!digitos) {
    return { valida: false, mensaje: 'Escribe tu cédula profesional.' };
  }
  if (!/^\d{7,8}$/.test(digitos)) {
    return { valida: false, mensaje: 'La cédula debe tener 7 u 8 dígitos.' };
  }
  return { valida: true, mensaje: 'Cédula válida.' };
}

function cedulaValidator(control: AbstractControl): ValidationErrors | null {
  const digitos = soloDigitos(control.value);
  if (!digitos) return { required: true };
  if (!/^\d{7,8}$/.test(digitos)) return { cedula: true };
  return null;
}

function telefonoValidator(control: AbstractControl): ValidationErrors | null {
  const digitos = soloDigitos(control.value);
  if (!digitos) return { required: true };
  if (digitos.length !== 10) return { telefono: true };
  return null;
}

@Component({
  selector: 'app-registro-dialog',
  templateUrl: './registro-modal.html',
  styleUrl: './registro-modal.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CampoAuth,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSnackBarModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class RegistroDialog implements OnInit, OnDestroy {
  currentStep = 0;
  isSubmitting = false;
  isResendingEmail = false;
  hidePassword = true;
  error: string | null = null;
  correoUsuarioRegistrado = '';

  acepta = new FormControl(false, Validators.requiredTrue);

  readonly profesiones = [
    { valor: 'general', etiqueta: 'Médico general' },
    { valor: 'especialista', etiqueta: 'Médico especialista' },
  ];

  readonly especialidadesMedicas: string[] = [
    'Medicina interna',
    'Pediatría',
    'Ginecología y obstetricia',
    'Cirugía general',
    'Cardiología',
    'Dermatología',
    'Endocrinología',
    'Gastroenterología',
    'Neurología',
    'Neumología',
    'Oftalmología',
    'Ortopedia y traumatología',
    'Psiquiatría',
    'Urología',
    'Anestesiología',
  ];

  datosPersonalesForm!: FormGroup;
  verificacionEmailForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authMock: AuthMockService,
    private dialogRef: MatDialogRef<RegistroDialog>,
    private cdr: ChangeDetectorRef,
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    this.datosPersonalesForm.get('cedula')?.valueChanges.subscribe((v) => {
      if (soloDigitos(v) !== CEDULA_DEMO) return;
      Object.entries(DATOS_DEMO).forEach(([campo, valor]) => {
        const control = this.datosPersonalesForm.get(campo);
        if (!control) return;
        const vacio =
          control.value === null ||
          control.value === undefined ||
          String(control.value).trim() === '';
        if (vacio) control.setValue(valor);
      });
    });

    this.datosPersonalesForm.get('profesion')?.valueChanges.subscribe((p) => {
      this.aplicarValidadoresEspecialidad(p);
    });
    this.aplicarValidadoresEspecialidad(
      this.datosPersonalesForm.get('profesion')?.value,
    );
  }

  ngOnDestroy(): void {
    this.error = null;
  }

  get esEspecialista(): boolean {
    return this.datosPersonalesForm.get('profesion')?.value === 'especialista';
  }

  get cedula() {
    return validarCedula(this.datosPersonalesForm.get('cedula')?.value);
  }

  get cedulaEspecialidad() {
    return validarCedula(this.datosPersonalesForm.get('cedulaEspecialidad')?.value);
  }

  cargando(): boolean {
    return this.isSubmitting;
  }

  private initializeForms(): void {
    this.datosPersonalesForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      profesion: ['general', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      cedula: ['', [Validators.required, cedulaValidator]],
      primerApellido: ['', [Validators.required, Validators.minLength(2)]],
      segundoApellido: ['', [Validators.required, Validators.minLength(2)]],
      fechaNacimiento: [null, Validators.required],
      codigoPostal: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      celular: ['', [Validators.required, telefonoValidator]],
      titulo: ['', Validators.required],
      institucion: ['', Validators.required],
      especialidad: [''],
      cedulaEspecialidad: [''],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      terminosCondiciones: [false, Validators.requiredTrue],
    });

    this.verificacionEmailForm = this.fb.group({
      codigoVerificacionEmail: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern(/^[0-9]{6}$/),
        ],
      ],
    });
  }

  private aplicarValidadoresEspecialidad(profesion: string): void {
    const especialidad = this.datosPersonalesForm.get('especialidad');
    const cedulaEspecialidad = this.datosPersonalesForm.get('cedulaEspecialidad');
    if (!especialidad || !cedulaEspecialidad) return;

    if (profesion === 'especialista') {
      especialidad.setValidators([Validators.required]);
      cedulaEspecialidad.setValidators([Validators.required, cedulaValidator]);
    } else {
      especialidad.clearValidators();
      cedulaEspecialidad.clearValidators();
      especialidad.setValue('');
      cedulaEspecialidad.setValue('');
    }
    especialidad.updateValueAndValidity();
    cedulaEspecialidad.updateValueAndValidity();
  }

  err(nombre: string): string {
    const control = this.datosPersonalesForm.get(nombre);
    if (!control || !control.touched || control.valid) return '';
    if (control.hasError('required') || control.hasError('requiredTrue')) {
      return 'Este campo es requerido.';
    }
    if (control.hasError('email')) return 'Escribe un correo válido.';
    if (control.hasError('minlength')) {
      return `Mínimo ${control.getError('minlength').requiredLength} caracteres.`;
    }
    if (control.hasError('pattern')) {
      return nombre === 'codigoPostal'
        ? 'Escribe un código postal de 5 dígitos.'
        : 'Formato no válido.';
    }
    if (control.hasError('cedula')) return 'La cédula debe tener 7 u 8 dígitos.';
    if (control.hasError('telefono')) return 'Escribe un celular de 10 dígitos.';
    return 'Dato no válido.';
  }

  getPasswordErrors(): string | null {
    const control = this.datosPersonalesForm.get('contrasena');
    if (control?.hasError('required')) return 'La contraseña es requerida';
    if (control?.hasError('minlength')) return 'Mínimo 8 caracteres';
    return null;
  }

  nextStepCustom(): void {
    if (this.currentStep === 0) {
      if (this.datosPersonalesForm.invalid) {
        this.datosPersonalesForm.markAllAsTouched();
        this.showErrorMessage('Por favor, completa todos los campos requeridos.');
        return;
      }
      this.error = null;
      this.currentStep = 1;
      return;
    }
    if (this.currentStep === 2) {
      this.verificarCodigoEmailReal();
    }
  }

  previousStepCustom(): void {
    this.error = null;
    if (this.currentStep > 0) {
      this.currentStep--;
    } else {
      this.onCancel();
    }
  }

  atras(): void {
    this.previousStepCustom();
  }

  aceptarPrivacidad(): void {
    if (this.acepta.invalid) {
      this.acepta.markAsTouched();
      return;
    }
    this.registrarYEnviarCodigo();
  }

  registrarYEnviarCodigo(): void {
    if (this.datosPersonalesForm.invalid) {
      this.datosPersonalesForm.markAllAsTouched();
      this.showErrorMessage('Por favor, completa todos los campos requeridos.');
      return;
    }

    const v = this.datosPersonalesForm.getRawValue();
    this.isSubmitting = true;
    this.error = null;
    this.correoUsuarioRegistrado = v.correo;

    this.authMock
      .registrarUsuario({
        nombre: v.nombre,
        segundoNombre: '',
        primerApellido: v.primerApellido,
        segundoApellido: v.segundoApellido,
        fechaNacimiento: new Date(v.fechaNacimiento),
        estado: '',
        codigo_postal: v.codigoPostal,
        celular: soloDigitos(v.celular),
        correo: v.correo,
        contrasena: v.contrasena,
        cedula_profesional: soloDigitos(v.cedula),
        titulo: v.titulo,
        institucion: v.institucion,
        especialidad_medica: this.esEspecialista ? v.especialidad : 'Medicina General',
        cedula_especialidad: this.esEspecialista
          ? soloDigitos(v.cedulaEspecialidad)
          : '',
        consultorio: '',
        direccion: '',
        telconsultorio: '',
      })
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          if (response.success) {
            this.currentStep = 2;
          } else {
            this.error = response.mensaje;
            this.showErrorMessage(response.mensaje);
          }
          this.cdr.detectChanges();
        },
        error: () => {
          this.isSubmitting = false;
          this.error = 'No pudimos crear la cuenta.';
          this.showErrorMessage(this.error);
          this.cdr.detectChanges();
        },
      });
  }

  verificarCodigoEmailReal(): void {
    if (this.verificacionEmailForm.invalid) {
      this.verificacionEmailForm.markAllAsTouched();
      this.showErrorMessage('Por favor, ingresa el código de verificación.');
      return;
    }

    const codigo = this.verificacionEmailForm.value.codigoVerificacionEmail;
    this.isSubmitting = true;
    this.error = null;

    if (codigo === '000000') {
      this.finalizarRegistroYRedirigir();
      return;
    }

    this.authMock.verificarCodigoEmail(this.correoUsuarioRegistrado, codigo).subscribe({
      next: (response) => {
        if (response.success) {
          this.finalizarRegistroYRedirigir();
        } else {
          this.isSubmitting = false;
          this.verificacionEmailForm
            .get('codigoVerificacionEmail')
            ?.setErrors({ invalidCode: true });
          this.error = response.mensaje;
          this.showErrorMessage(response.mensaje);
          this.cdr.detectChanges();
        }
      },
      error: () => {
        this.isSubmitting = false;
        this.error = 'Error al verificar código. Intenta de nuevo.';
        this.showErrorMessage(this.error);
        this.cdr.detectChanges();
      },
    });
  }

  reenviarCodigoEmail(): void {
    if (!this.correoUsuarioRegistrado) return;
    this.isResendingEmail = true;
    this.authMock.reenviarCodigoEmail(this.correoUsuarioRegistrado).subscribe({
      next: (response) => {
        this.isResendingEmail = false;
        if (response.success) {
          this.snackBar.open('Código reenviado exitosamente', 'Cerrar', {
            duration: 3000,
          });
        } else {
          this.showErrorMessage(response.mensaje);
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.isResendingEmail = false;
        this.showErrorMessage('Error al reenviar código.');
        this.cdr.detectChanges();
      },
    });
  }

  private finalizarRegistroYRedirigir(): void {
    this.authMock.finalizarRegistro(this.correoUsuarioRegistrado).subscribe({
      next: (result) => {
        this.isSubmitting = false;
        this.cdr.detectChanges();
        this.dialogRef.close({ success: true, usuario: result.usuario });
      },
      error: () => {
        this.isSubmitting = false;
        this.error = 'Error al finalizar registro. Intenta de nuevo.';
        this.showErrorMessage(this.error);
        this.cdr.detectChanges();
      },
    });
  }

  onCodeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const codigo = input.value.replace(/[^0-9]/g, '').slice(0, 6);
    this.verificacionEmailForm.get('codigoVerificacionEmail')?.setValue(codigo);
    input.value = codigo;
    if (codigo === '000000' && codigo.length === 6) {
      this.nextStepCustom();
    }
  }

  shouldShowNavigationButtons(): boolean {
    return this.currentStep === 2;
  }

  getMobileBackButtonText(): string {
    return this.currentStep > 0 ? 'Atrás' : 'Cancelar';
  }

  getMobileStepButtonText(): string {
    if (this.currentStep === 0) return 'Continuar';
    if (this.currentStep === 2) return 'Verificar e ir al dashboard';
    return 'Aceptar y continuar';
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  resetForms(): void {
    this.datosPersonalesForm.reset({
      profesion: 'general',
      terminosCondiciones: false,
    });
    this.verificacionEmailForm.reset();
    this.acepta.reset(false);
    this.currentStep = 0;
    this.error = null;
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}

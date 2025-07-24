import { Component, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [LucideAngularModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  showPassword = signal(false);

  setShowPassword() {
    this.showPassword.update(value => !value);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.loginForm.reset();
      },
      error: () => {
        this.errorMessage = 'Correo o contraseña incorrectos';
      }
    });
  }

}

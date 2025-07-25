import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CategoryResponse } from '../../interfaces/category-response.interface';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LucideAngularModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.sass',
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  errorMessage = '';
  public categories: CategoryResponse[] = [];

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  showPassword = signal(false);
  ngOnInit(): void {
    this.loadCategories();
    this.initializeForm();
  }

  setShowPassword() {
    this.showPassword.update((value) => !value);
  }

  loadCategories() {
    this.authService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
    });
  }

  private initializeForm(): void {
    this.registerForm = this.fb.group({
      user: this.fb.group({
        categoryIds: this.fb.array([], Validators.required),
        active: this.fb.control(true),
      }),
      userInfo: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        userName: ['', Validators.required],
        password: ['', Validators.required],
        phone: ['', Validators.required],
        description: [''],
        profilePicture: this.fb.control('default-profile.png'),
      }),
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.registerForm.reset();
      },
    });
  }

  get categoryIds(): FormArray {
    return this.registerForm.get('user.categoryIds') as FormArray;
  }

  onCategoryChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const id = Number(input.value);
    const checked = input.checked;

    const categoryIds = this.categoryIds;

    if (checked) {
      // Agrega si no existe
      if (!categoryIds.value.includes(id)) {
        categoryIds.push(this.fb.control(id));
      }
    } else {
      // Elimina si existe
      const index = categoryIds.controls.findIndex((x) => x.value === id);
      if (index !== -1) {
        categoryIds.removeAt(index);
      }
    }
  }

  isCategorySelected(id: number): boolean {
    return this.categoryIds.value.includes(id);
  }
}

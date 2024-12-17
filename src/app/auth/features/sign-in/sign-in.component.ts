import { Component, inject } from '@angular/core';
import { Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../data-access/auth.service';
import { FormBuilder } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { hasEmailError, isRequired } from '../utils/validators';

export interface FormSignIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styles: ``,
})
export default class SignInComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  
  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  async onSubmit() {
    if (this.form.invalid) return;

    try {
      const { email, password } = this.form.value as {
        email: string;
        password: string;
      };

      if (!email || !password) return;

      await this._authService.signUp({ email, password });

      toast.success('Usuario creado correctamente');
      this._router.navigate(['/tasks']);
    } catch (error) {
      toast.error('Error al crear el usuario');
    }
  }
}

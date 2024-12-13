import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { hasEmailError, isRequired } from '../utils/validators';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';

interface FormSignUp {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
})
export default class SignUpComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
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
      const { email, password } = this.form.value as { email: string; password: string };

      if (!email || !password) return;

      await this._authService.signUp({ email, password });

      toast.success('Usuario creado correctamente');
    } catch (error) {
      toast.error('Error al crear el usuario');
    }
  }
}

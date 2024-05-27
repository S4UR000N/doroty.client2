import { Component } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { AngularMaterialFormModule } from '../../module/angular-material-form.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import ILoginReqModel from '../../model/login/login-request.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  imports: [AngularMaterialFormModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor (private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    let body = document.getElementsByTagName('body')[0];
    body.style.margin = '0';
    body.style.fontFamily = 'Roboto, Helvetica Neue, sans-serif';
    body.style.backgroundColor = '#191c1c';
  }
  public loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [''],
  });

  public isDisabled: boolean = false;
  handleLogin() {
    this.isDisabled = !this.isDisabled;
    let model: ILoginReqModel = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    
    this.authService.login(model).subscribe(success => {
      if (success) {
        window.location.href = '/';
      }
    });
  }
}

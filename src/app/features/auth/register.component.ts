import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators,AbstractControl,ValidationErrors,AsyncValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-register',
  standalone: true,
   imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // registerForm : FormGroup
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
    console.log("register Component loaded");
    
  }

  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required,Validators.email],[this.emailExistsValidator()]],
    password: ['',Validators.required, Validators.minLength(6)]
  })
  emailExistsValidator(): AsyncValidatorFn{
    return(control: AbstractControl): Observable<ValidationErrors | null> =>{
      return this.authService.checkEmailExists(control.value).pipe(
        map(exists=>(exists?{emailTaken: true}:null
        ))
      )
    }
  }
  onSubmit(){
    if(this.registerForm.valid){
      this.authService.registerUser(this.registerForm.value).subscribe({
        next:(res) => {
          console.log('Registered successfully!',res);
          this.router.navigate(['/login']);
        },
        error: err => alert(err.error.detail || 'Registration failed')
      })
    }
  }

}

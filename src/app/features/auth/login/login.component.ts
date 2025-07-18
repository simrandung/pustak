import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string ='';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
    this.loginForm = this.fb.group({
    username:['',[Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.minLength(6)]]
  });
  }

  onLogin(){
    const formData = new URLSearchParams();
    formData.set('username',this.loginForm.value.username);
    formData.set('password',this.loginForm.value.password);
    console.log(this.loginForm.value);
    

    this.authService.login(formData).subscribe({
      next: (res) => {
        console.log(res);
        console.log(res.role);
        
        
        localStorage.setItem('token',res.access_token);
        localStorage.setItem('role',res.role);
        alert("Login successfully!");
        if(res.role === 'admin'){
          this.router.navigate(['/admin/home'])
        }
        else{
        this.router.navigate(['/user']);
      }
    },
      error: (err) => {
        this.error = 'Invalid credentials';
        console.log(err);
        
      }
    })
  }
  

  


}

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
 
  submitted = false;

  constructor(private auth: AngularFireAuth) { }
  email = new FormControl ('', [
    Validators.required,
    Validators.email,
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
])
password = new FormControl('',[
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
])

confirm_password= new FormControl('',[
    Validators.required
])


registerForm = new FormGroup({
  email: this.email,
  password : this.password,
  confirm_password :this.confirm_password
})

  get f() { return this.registerForm.controls; }

  async onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    const email = this.f.email.value;
    const password = this.f.password.value;

    try {
      if (password !== this.f.confirm_password.value) {
        alert('Konfirmasi kata sandi tidak cocok.');
        return;
      }

      const userCred = await this.auth.createUserWithEmailAndPassword(email, password);
      console.log('User created:', userCred.user);
      alert('SUCCESS!!' + JSON.stringify(this.registerForm.value));
    } catch (error) {
      console.error('Error creating user:', error);
      
    }
  }
}

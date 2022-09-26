import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  formCreate: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.minLength(9)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })

  constructor( private fb: FormBuilder,
               private router: Router,
               private usersService: UsersService ) {
  }

  validField( field: string) {
    return this.formCreate.controls[field].errors
        && this.formCreate.controls[field].touched
  }

  save() {
    if( this.formCreate.invalid ) {
      this.formCreate.markAllAsTouched();
      return;
    } else {
      this.usersService.create(this.formCreate.value)
      .subscribe({
        next: () =>{
          this.router.navigate(['/usuarios']);
          console.log('funciona!')
        },
      })
      error: ({ error }: HttpErrorResponse) => {
        Swal.fire('Error', error.msg || 'Error al iniciar sesión', 'error');
      }
    }
    this.formCreate.reset();
  }
}

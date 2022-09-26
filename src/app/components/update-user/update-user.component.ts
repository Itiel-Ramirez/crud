import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/interfaces';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  users: User = { 'id':'', 'email':'', 'name':'nombre anterior', 'status': false, 'createdAt': new Date(), 'updatedAt': new Date() };
  useriD: string = '';

  formUpdate: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
  })

  constructor( private fb: FormBuilder,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private usersService: UsersService ) {
  }

  ngOnInit(): void {
    let users = this.usersService.users('');

    this.activatedRoute.params
    .subscribe( ({id}) => this.useriD = id)
    let userTemp = [this.users]
    users.subscribe((users) => userTemp = users.filter (user => user.id == this.useriD))
    this.users = userTemp[0];
  }

  validField( field: string) {
    return this.formUpdate.controls[field].errors
        && this.formUpdate.controls[field].touched
  }

  update() {
    if( this.formUpdate.invalid ) {
      this.formUpdate.markAllAsTouched();
      return;
    } else {

      let di = this.formUpdate.value
      di['id'] = this.useriD
      this.usersService.update(di)
      .subscribe({
        next: () =>{
          console.log();
          this.router.navigate(['/usuarios']);
          console.log('funciona!')
        },
      })
      error: ({ error }: HttpErrorResponse) => {
        Swal.fire('Error', error.msg || 'Error al iniciar sesión', 'error');
      }
    }
    this.formUpdate.reset();
  }
}

import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  createUser: FormGroup;
  submited = false;

  constructor( private fb: FormBuilder,
               private _UsersSrevice: UsersService) {
    this.createUser = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  agregarUsuario() {
    this.submited = true;

    if(this.createUser.invalid) {
      return;
    }
    const usuario: any = {
      name: this.createUser.value.name,
      email: this.createUser.value.email,
      password: this.createUser.value.password,
      dateCreation: new Date(),
      dateUpdate: new Date(),
    }
  }

}

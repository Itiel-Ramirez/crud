import { User } from './../../interfaces/interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: Observable<User[]> = new Observable();

  constructor( private usersService: UsersService,
    private router: Router, ) { }

  ngOnInit(): void {
    this.users = this.usersService.users('');
  }

  delete(user: User) {
    console.log('as')
    this.usersService.delete(user)
      .subscribe({
        next: () =>{
          this.users = this.usersService.users('');
          console.log('funciba')
        },
      })
      error: ({ error }: HttpErrorResponse) => {
        Swal.fire('Error', error.msg || 'Error al iniciar sesión', 'error');
      }
    }
  }

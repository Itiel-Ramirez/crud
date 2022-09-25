import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/interfaces';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: Observable<User[]> = new Observable();

  constructor( private usersService: UsersService ) { }

  ngOnInit(): void {
    this.users = this.usersService.users('');
  }

}

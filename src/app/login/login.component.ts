import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import {} from '../../img/Me.png'

declare let jQuery: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _LoginService: LoginService) { }

  ngOnInit() {
    jQuery('select').material_select(); 
  }

} 

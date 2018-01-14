import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from '../services/login.service';

declare let jQuery: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _LoginService: LoginService) { }

  ngOnInit() {
    jQuery('select').material_select(); 
  }

} 

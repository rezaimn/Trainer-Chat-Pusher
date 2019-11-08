import {Component} from "@angular/core";

import {Router} from "@angular/router";
import {HttpService} from '../../shared/services/http.service';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  loginObj={
    _username:'',
    _password:''
  }
  constructor(private service:HttpService,private router:Router){

  }
  login(){
     if(this.loginObj._username==environment.admin_u && this.loginObj._password==environment.admin_p){
        this.router.navigate(['/layout'])
     }
  }
}

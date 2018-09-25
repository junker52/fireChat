import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(public _cs: ChatService) { }

  ngOnInit() {
  }

  ingresar(source) {
    this._cs.login(source);
  }

}

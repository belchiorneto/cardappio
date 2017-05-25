import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public email : String;
  constructor(public navCtrl: NavController) {
  }
  public setemail(){
    this.email = "belchior@alu.ufc.br";
    console.log(this.email);
  }

}

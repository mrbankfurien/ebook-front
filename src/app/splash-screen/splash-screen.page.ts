import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage-angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  constructor(private route: Router,
    private storage: Storage,
    private serviceUser: UserService) {this.storage.create(); }

  ngOnInit() {

    this.storage.get('mylife_init').then(
      (val)=>{

        if(val.status.register && !val.status.login){
          this.route.navigate(['/home']);
        }

        if(val.status.register && val.status.login)
        {
          this.serviceUser.userLogin(val.email,val.passwords).then(
            (response: any)=>{
              if(response.status){
                this.route.navigate(['/dashboard']);
              }else{
                this.route.navigate(['/login']);
              }
            }
          );
        }

      }
    ).catch(
      ()=>{
        this.route.navigate(['/home']);
      }
    );
  }

}

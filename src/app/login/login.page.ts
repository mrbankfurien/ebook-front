import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { OtherFunction } from '../other/toast';
import { Router } from '@angular/router';

import {Storage} from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;

  public emailError= {status: true, msg: 'Ce champs est requis ...'} ;
  public passwordsError= {status: true, msg: 'Ce champs est requis ...'};
  public formIsValid: boolean;
  public register =  {status: false, msg: '...'};

  constructor(private router: Router , private formBuilder: FormBuilder, private userService: UserService,private other: OtherFunction,
    private storage: Storage) {

    this.formIsValid = false ;

    this.loginForm = this.formBuilder.group({
      email : ['' , Validators.compose([
        Validators.maxLength(250) ,
        Validators.pattern('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$'),
        Validators.required
      ])] ,

      passwords : ['' , Validators.compose([
        Validators.maxLength(250) ,
        Validators.minLength(10),
        Validators.required
      ])] ,
    }) ;

   }

   public login()
   {
      if(!this.loginForm.valid)
      {
        this.other.toastCtrl('Veuillez renseigner toutes les informations demandées 💔 .') ;
      }
      else
      {
        this.formIsValid = true ;

        this.emailError.status = true;
        this.passwordsError.status = true ;

        const userMail = this.loginForm.get('email').value;
        const userMdp = this.loginForm.get('passwords').value;

        this.userService.userLogin(userMail,userMdp).then(

          (response: any)=>{

            this.formIsValid = false ;

            if(response.status){
              this.loginForm.reset();

              this.emailError = {status : true , msg :'Ce champs est requis ...'};
              this.passwordsError = {status : true , msg :'Ce champs est requis ...'};

              this.router.navigate(['/dashboard']);
            }
            else{
              switch(response.msg.error){
              case 'REQUEST_ERROR' :
              this.other.toastCtrl(response.msg.message) ;
              break;
              case 'MAIL_ERROR' :
              this.emailError = {status : false , msg : response.msg.message};
              break;
              case 'PASSWORD_ERROR' :
              this.passwordsError = {status : false , msg : response.msg.message};
              break;
              }

            }
          }
        ).catch(
          ()=>{
            this.formIsValid = false ;
            this.other.toastCtrl('Erreur d\'origine inconnu , merci de réessayer plutard .') ;
          }
        ) ;
      }
   }

  ngOnInit() {

  }

}

import { UserService } from './../services/user.service';
import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OtherFunction } from '../other/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  public forms: FormGroup;
  public emailError= {status: true, msg: 'Ce champs doit être valide ...'} ;
  public pseudoError= {status: true, msg: 'Ce champs doit être valide ...'} ;
  public contactError= {status: true, msg: 'Ce champs doit être valide ...'};
  public visibility: boolean;

  constructor(private builderForm: FormBuilder,private other: OtherFunction,
    private serviceUser: UserService,
    private route: Router) {

      this.visibility = false ;

    this.forms = this.builderForm.group({
      username : [this.serviceUser.userData.username,Validators.compose([
        Validators.maxLength(200) ,
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required
      ])],
      email :  [this.serviceUser.userData.email ,Validators.compose([
        Validators.maxLength(250) ,
        Validators.pattern('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$'),
        Validators.required
      ])],
      pseudonyme :  [this.serviceUser.userData.pseudonyme,Validators.compose([
        Validators.maxLength(200) ,
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required
      ])],
      numbers :  [this.serviceUser.userData.number ?
        this.serviceUser.userData.number :
        this.serviceUser.userData.numbers,Validators.compose([
        Validators.maxLength(30),
        Validators.required,
      ])],
    });

   }

   openModal()
   {
     this.visibility =!this.visibility;
   }

   goBack()
   {
    this.route.navigate(['/dashboard']);
   }

   save()
   {
     if(!this.forms.valid){
      this.other.toastCtrl('Veuillé renseigner toutes vos informations .');
     }
     else{

        this.emailError.status = true ;
        this.contactError.status = true ;
        this.pseudoError.status = true ;

        const userModel = new User() ;

        userModel.email = this.forms.get('email').value;
        userModel.pseudonyme = this.forms.get('pseudonyme').value;
        userModel.numbers = this.forms.get('numbers').value;
        userModel.username = this.forms.get('username').value ;
        userModel.token = String(this.serviceUser.userId) ;

        this.serviceUser.updateData(userModel).then(
          (response: any)=>{
            if(response.status)
            {
              this.emailError = {status: true, msg: 'Ce champs doit être valide ...'} ;
              this.contactError = {status: true, msg: 'Ce champs doit être valide ...'} ;
              this.pseudoError = {status: true, msg: 'Ce champs doit être valide ...'} ;
            }
            else
            {
              switch (response.error) {
                case 'NUMBER_ERROR' :
                this.contactError = {status : false , msg : response.message};
                break;
                case 'PSEUDO_ERROR' :
                this.pseudoError = {status : false , msg : response.message};
                break;
                case 'EMAIL_ERROR' :
                this.emailError = {status : false , msg : response.message};
                break;
              }
            }
          }
        ).catch(
          (error)=>{
            this.other.toastCtrl('Erreur d\'origine inconnu , merci de réessayer plutard.') ;
            this.route.navigate(['/dashboard']);
          }
        );
     }
   }

  ngOnInit() {
  }

}

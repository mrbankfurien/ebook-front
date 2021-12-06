import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { OtherFunction } from '../other/toast';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  public slideOneForm: FormGroup;

  public emailError= {status: true, msg: 'Ce champs doit être valide ...'} ;
  public pseudoError= {status: true, msg: 'Ce champs doit être valide ...'} ;
  public formIsValid: boolean;
  public register =  {status: false, msg: '...'};

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,private other: OtherFunction) {

    this.formIsValid = false ;

    this.slideOneForm = this.formBuilder.group({
      pseudonyme : ['' , Validators.compose([
        Validators.maxLength(200) ,
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required
      ])] ,

      email : ['' , Validators.compose([
        Validators.maxLength(250) ,
        Validators.pattern('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$'),
        Validators.required
      ])] ,

      passwords : ['' , Validators.compose([
        Validators.maxLength(250) ,
        Validators.minLength(10),
        Validators.required
      ])]
    }) ;

  }

  public saveUser()
  {
    if(!this.slideOneForm.valid)
    {
      this.other.toastCtrl('Veuillez renseigner toutes les informations demandées 💔 .') ;
    }

  else{

      this.formIsValid = true ;
      this.register.status = false ;

      const singleUser = new User() ;

      this.emailError.status = true ;
      this.pseudoError.status = true ;

      singleUser.username = 'Membres Mylife .';
      singleUser.email = this.slideOneForm.get('email').value;
      singleUser.numbers = '002250101010101';
      singleUser.pseudonyme = this.slideOneForm.get('pseudonyme').value;
      singleUser.gender = 'Non defini';
      singleUser.passwords = this.slideOneForm.get('passwords').value;
      singleUser.token = new Date().getTime().toString() ;

      this.userService.createNewUser(singleUser).then(
        (response: any) => {
          this.formIsValid = false ;
          if(response.status)
          {
            this.slideOneForm.reset() ;

            this.register = {status : true , msg : response.message} ;

            this.emailError = {status: true, msg: 'Ce champs est requis ...'} ;
            this.pseudoError = {status: true, msg: 'Ce champs est requis ...'} ;
          }
          else
          {
            switch (response.error) {
              case 'PSEUDO_IS_USED' :
              this.pseudoError = {status : false , msg : response.message};
              break;
              case 'HASH_ERROR' :
              this.other.toastCtrl(response.message) ;
              break;
              case 'INSERT_ERROR' :
              this.other.toastCtrl(response.message) ;
              break;
              case 'EMAIL_IS_USED' :
              this.emailError = {status : false , msg : response.message};
              break;
            }
          }

        }
      ).catch(
        () => {
          this.formIsValid = false ;
          this.other.toastCtrl('Erreur d\'origine inconnu , merci de réessayer plutard.') ;
        }
      ) ;
    }
  }

  ngOnInit() {
  }

}

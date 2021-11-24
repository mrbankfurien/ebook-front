import { Component, OnInit , ViewChild } from '@angular/core';
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

  @ViewChild('signupSlider') signupSlider;

  public slideOneForm: FormGroup;
	public slideTwoForm: FormGroup;

  public emailError= {status: true, msg: 'Ce champs est requis ...'} ;
  public pseudoError= {status: true, msg: 'Ce champs est requis ...'} ;
  public contactError= {status: true, msg: 'Ce champs est requis ...'};
  public formIsValid: boolean;
  public register =  {status: false, msg: '...'};

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,private other: OtherFunction) {

    this.formIsValid = false ;

    this.slideOneForm = this.formBuilder.group({
      username : ['' , Validators.compose([
        Validators.maxLength(200) ,
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required
      ])] ,

      email : ['' , Validators.compose([
        Validators.maxLength(250) ,
        Validators.pattern('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$'),
        Validators.required
      ])] ,

      phone : ['' ,Validators.compose([
        Validators.maxLength(30),
        Validators.required,
      ])]
    }) ;



    this.slideTwoForm = this.formBuilder.group({
      pseudonyme : ['' , Validators.compose([
        Validators.maxLength(200) ,
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required
      ])] ,

      passwords : ['' , Validators.compose([
        Validators.maxLength(250) ,
        Validators.minLength(10),
        Validators.required
      ])] ,

      gender : ['Masculin' ,Validators.compose([
        Validators.maxLength(30),
        Validators.required,
      ])]
    }) ;


  }

  public next(){
    this.signupSlider.slideNext();
  }

  public prev(){
    this.signupSlider.slidePrev();
  }

  public saveUser()
  {
    if(!this.slideOneForm.valid)
    {
      this.signupSlider.slideTo(0) ;
      this.other.toastCtrl('Veuillez renseigner toutes les informations demandées 💔 .') ;
    }

    else if(!this.slideTwoForm.valid)
    {
      this.signupSlider.slideTo(1) ;
      this.other.toastCtrl('Veuillez renseigner toutes les informations demandées 💔 .') ;
    }

    else{

      this.formIsValid = true ;

      const singleUser = new User() ;

      this.emailError.status = true ;
      this.contactError.status = true ;
      this.pseudoError.status = true ;

      singleUser.username = this.slideOneForm.get('username').value;
      singleUser.email = this.slideOneForm.get('email').value;
      singleUser.numbers = this.slideOneForm.get('phone').value;
      singleUser.pseudonyme = this.slideTwoForm.get('pseudonyme').value;
      singleUser.gender = this.slideTwoForm.get('gender').value;
      singleUser.passwords = this.slideTwoForm.get('passwords').value;
      singleUser.token = new Date().getTime().toString() ;

      this.userService.createNewUser(singleUser).then(
        (response: any) => {
          this.formIsValid = false ;
          if(response.status)
          {
            this.slideOneForm.reset() ;
            this.slideTwoForm.reset() ;

            this.register = {status : true , msg : response.message} ;

            this.emailError = {status: true, msg: 'Ce champs est requis ...'} ;
            this.contactError = {status: true, msg: 'Ce champs est requis ...'} ;
            this.pseudoError = {status: true, msg: 'Ce champs est requis ...'} ;
          }
          else
          {
            switch (response.error) {
              case 'NUMBER_IS_USED' :
              this.signupSlider.slideTo(0) ;
              this.contactError = {status : false , msg : response.message};
              break;
              case 'PSEUDO_IS_USED' :
              this.signupSlider.slideTo(1) ;
              this.pseudoError = {status : false , msg : response.message};
              break;
              case 'HASH_ERROR' :
              this.other.toastCtrl(response.message) ;
              break;
              case 'INSERT_ERROR' :
              this.other.toastCtrl(response.message) ;
              break;
              case 'EMAIL_IS_USED' :
              this.signupSlider.slideTo(0) ;
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

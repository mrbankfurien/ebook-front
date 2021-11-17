import { Component, OnInit } from '@angular/core';
import { OtherFunction } from '../other/toast';
import { UserService } from '../services/user.service';
import { FormBuilder , Validators ,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-restort',
  templateUrl: './restort.page.html',
  styleUrls: ['./restort.page.scss'],
})
export class RestortPage implements OnInit {

  resetFrom: FormGroup ;

  public emailError= {status: true, msg: 'Ce champs est requis ...'} ;
  public formIsValid: boolean;
  public register =  {status: false, msg: '...'};

  constructor(private formBuilder: FormBuilder, private userService: UserService,private other: OtherFunction) {

    this.formIsValid = false ;

    this.resetFrom = this.formBuilder.group({
      email : ['' , Validators.compose([
        Validators.maxLength(250) ,
        Validators.pattern('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$'),
        Validators.required
      ])]
    }) ;

   }

   public lauchReset()
   {
     if(!this.resetFrom.valid)
     {
      this.other.toastCtrl('Veuillez renseigner toutes les informations demandées 💔 .') ;
     }

     else
     {
        this.formIsValid = true ;
        this.emailError.status = true ;

        const mail = this.resetFrom.get('email').value ;

        this.userService.resetPassword(mail).then(
          (response: any) =>{

            this.formIsValid = false ;

            if(response.status)
            {
              this.resetFrom.reset();
              this.emailError= {status: true, msg: 'Ce champs est requis ...'} ;
            }
            else
            {
                switch(response.error){
                  case 'MAIL_ERROR':
                    this.emailError = {status: false , msg : response.message};
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

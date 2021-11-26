import { Component, OnInit , Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OtherFunction } from 'src/app/other/toast';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class SecurityComponent implements OnInit {

  @Input() visibility: boolean ;
  public data = {lastPassword:'',newPassword:'', confirmPassword:''};
  public lastPassword = {status:false,msg:''};
  public newPassword = {status:false,msg:''};
  public confirPassword = {status:false,msg:''};
  public isValidate: boolean;

  constructor(private other: OtherFunction,
    private serviceUser: UserService) {
    this.visibility = false ;
    this.isValidate = false ;
   }

   closeModal()
   {
     this.visibility = false ;
   }

   save(form: NgForm)
   {
     this.isValidate = true ;

     this.lastPassword.status = false ;
     this.newPassword.status = false ;
     this.confirPassword.status = false ;

     this.serviceUser.updatePassword(this.serviceUser.userId,form.value).then(
       (response: any)=>{
         this.isValidate = false ;

         if(response.status)
         {
           this.visibility = false ;
          this.other.toastCtrl(response.message);
         }
         else
         {
           switch (response.error) {
             case 'REQUEST_ERROR':
              this.isValidate = false ;
              this.other.toastCtrl(response.message);
               break;
               case 'LAST_PASSWORD_ERROR':
                this.isValidate = false ;
                this.lastPassword = {status:true , msg:response.message};
                 break;
                 case 'UPDATE_ERROR':
                 this.isValidate = false ;
                 form.reset();
                 this.other.toastCtrl(response.message);
                 break;
                 case 'PASSWORD_ERROR':
                  this.isValidate = false ;
                  form.reset();
                  this.other.toastCtrl('Veuillé vérifier votre connexion internet .');
                  break;
                  case 'HASH_ERROR':
                  this.isValidate = false ;
                  this.newPassword = {status:true , msg:response.message};
                  this.confirPassword = {status:true , msg:response.message};
                 break;
             default:
               break;
           }
         }
       }
     ).catch(
       ()=> {
        this.isValidate = false ;
         form.reset();
         this.visibility = false ;
         this.other.toastCtrl('Veuillé vérifier votre connexion internet .');
       }
     );
   }

  ngOnInit() {}

}

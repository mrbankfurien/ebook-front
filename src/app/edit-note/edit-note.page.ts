import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import { OtherFunction } from '../other/toast';
import { Poster } from '../models/poster.model';
import { PosterService } from '../services/poster.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.page.html',
  styleUrls: ['./edit-note.page.scss'],
})
export class EditNotePage implements OnInit {

  public status: boolean;
  public visibility: boolean;

  formCreate: FormGroup;

  constructor(private builderFrom: FormBuilder,
    private other: OtherFunction, private posterService: PosterService,
    private route: Router, private userService: UserService) {

    this.status = false ;
    this.visibility = true ;

    this.formCreate = this.builderFrom.group({
      title : ['' , Validators.compose([
        Validators.required
      ])] ,
      content : ['' , Validators.compose([
        Validators.required
      ])] ,
      visibility : ['Privé' , Validators.compose([
        Validators.required
      ])] ,
      status : ['Non' , Validators.compose([
        Validators.required
      ])]
    });
  }

  public changeVisibility()
  {
    this.visibility = !this.visibility;

    if(this.visibility)
    {
      this.formCreate.addControl('status' , new FormControl('Non',[Validators.required]));
    }
    else
    {
      this.formCreate.removeControl('status');

      if(this.status)
      {
        this.formCreate.removeControl('delais');
        this.formCreate.removeControl('unite');
      }

    }
  }

  public changeStatus()
  {
    this.status = !this.status;


    if(this.status)
    {
      this.formCreate.addControl('delais' , new FormControl('',[Validators.required,Validators.pattern('^[0-9]')]));
      this.formCreate.addControl('unite' , new FormControl('Jour',[Validators.required]));
    }
    else
    {
      this.formCreate.removeControl('delais');
      this.formCreate.removeControl('unite');
    }
  }

  public savePoster()
  {
    if(!this.formCreate.valid){
      this.other.toastCtrl('Veuillez renseigner toutes les informations...');
    }

    else{

       this.other.loadCtrl('Un instant ...');

      const posterClass = new Poster() ;
      posterClass.title = this.formCreate.get('title').value;
      posterClass.msg = this.formCreate.get('content').value;
      posterClass.visibility = this.formCreate.get('visibility').value;
      posterClass.userId = this.userService.userId ? this.userService.userId : 0 ;

      if(this.visibility)
      {
        posterClass.status = this.formCreate.get('status').value;
      }

      if(this.status && this.visibility)
      {
        posterClass.unite = this.formCreate.get('unite').value;
        posterClass.delais = this.formCreate.get('delais').value;
      }


      this.posterService.createPoste(posterClass).then(
        (response: any) =>{
          if(response.status)
          {

            switch (posterClass.visibility) {
              case 'Public':
                this.route.navigate(['/actuality-home']);
                break;
                case 'Privé':
                  this.posterService.getAllPoste(this.userService.userId);
                  this.route.navigate(['/dashboard']);
                  break;

              default:
              this.route.navigate(['/dashboard']);
                break;
            }

          }
          else
          {
            this.other.toastCtrl(response.message);
          }
        }
      ).catch(
        () =>{
         this.route.navigate(['/login']);
         this.other.toastCtrl('Erreur, veuillez vous reconnecter .');
        }
      );
    }
  }

  ngOnInit() {
  }

}

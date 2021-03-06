import { Poster } from './../models/poster.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import { OtherFunction } from '../other/toast';
import { PosterService } from '../services/poster.service';
import { PublicPosterService } from '../services/public-post.service';
import { Router ,  ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../services/user.service';
import { LoadingController  } from '@ionic/angular';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.page.html',
  styleUrls: ['./update-note.page.scss'],
})
export class UpdateNotePage implements OnInit {

  public status: boolean;
  public visibility: boolean;
  public pste: Poster;

  formCreate: FormGroup;

  constructor(private builderFrom: FormBuilder,
    private other: OtherFunction, private posterService: PosterService,
    private route: Router, private userService: UserService,
    private router: ActivatedRoute,
  private posterPublicService: PublicPosterService,
  private ctrlLoad: LoadingController) {}


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
      this.formCreate.addControl('delais' , new FormControl(1,[Validators.required,Validators.pattern('^[0-9]')]));
      this.formCreate.addControl('unite' , new FormControl('Jour',[Validators.required]));
    }
    else
    {
      this.formCreate.removeControl('delais');
      this.formCreate.removeControl('unite');
    }
  }

  public async savePoster()
  {
    if(!this.formCreate.valid){
      this.other.toastCtrl('Veuillez renseigner toutes les informations...');
    }

    else{

      const load = await this.ctrlLoad.create({
        spinner: 'bubbles',
        backdropDismiss: false,
        message: 'Enregistrement ...' ,
    }) ;

    await load.present();

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

      if(posterClass.visibility==='Priv??')
      {
        this.posterService.updatePost(this.pste.id,posterClass).then(
          (response: any) =>{
            load.dismiss();
            if(response.status)
            {
              this.posterService.getAllPoste(this.userService.userId);
              this.route.navigate(['/dashboard']);
            }
            else
            {
              this.other.toastCtrl(response.message);
            }
          }
        ).catch(
          () =>{
            load.dismiss();
            this.other.toastCtrl('Une erreur s\'est produite, r??essayer plutard .');
          }
        );
      }

      if(posterClass.visibility==='Public')
      {
        this.posterPublicService.updatePost(this.pste.id,posterClass).then(
          (response: any) =>{
            load.dismiss();
            if(response.status)
            {
              this.posterPublicService.allPrivatePoster(this.userService.userId);
              this.route.navigate(['/actuality-home']);
            }
            else
            {
              this.other.toastCtrl(response.message);
            }
          }
        ).catch(
          () =>{
            load.dismiss();
            this.other.toastCtrl('Une erreur s\'est produite, r??essayer plutard .');
          }
        );
      }
    }
  }

  public async initUpdate()
  {
      const load = await this.ctrlLoad.create({
        spinner: 'bubbles',
        backdropDismiss: false,
        message: 'Chargement...' ,
    }) ;

    await load.present();

    this.router.params.subscribe(
      (params: Params) =>{
        this.posterService.getOnPoste(params.id).then(
          (poste: Poster)=>{
            load.dismiss();
            this.pste = poste;
            this.formCreate.get('title').setValue(this.pste.title);
            this.formCreate.get('content').setValue(this.pste.msg);
            this.formCreate.get('visibility').setValue(this.pste.visibility);

            if(this.pste.visibility==='Priv??')
            {
              this.visibility = true ;
              this.formCreate.addControl('status' , new FormControl(this.pste.status,[Validators.required]));

              if(this.pste.status==='Oui')
              {
                this.status = true ;
                this.formCreate.addControl('delais' , new FormControl(1,[Validators.required,Validators.pattern('^[0-9]')]));
                this.formCreate.addControl('unite' , new FormControl('Jour',[Validators.required]));
              }
              else
              {
                this.status = false ;
              }
            }
            else
            {
              this.visibility = false;
            }
          }
        );
      }
    ) ;
  }

  ngOnInit() {

    this.formCreate = this.builderFrom.group({
      title : ['' , Validators.compose([
        Validators.required
      ])] ,
      content : ['' , Validators.compose([
        Validators.required
      ])] ,
      visibility : ['Priv??' , Validators.compose([
        Validators.required
      ])] ,
    });
    this.initUpdate();
  }

}

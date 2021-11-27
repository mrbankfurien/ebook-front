import { UserService } from './../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { PosterService } from 'src/app/services/poster.service';
import { Router } from '@angular/router';
import { OtherFunction } from 'src/app/other/toast';
import { LoadingController  } from '@ionic/angular';


@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit {

  @Input() pseudo: string ;
  @Input() date: any ;
  @Input() content: string ;
  @Input() condition: boolean;
  @Input() unite: string;
  @Input() otherDate: any ;
  @Input() title: string;
  @Input() idPoste: number;

  constructor(private postService: PosterService,
    private router: Router,
    private other: OtherFunction,
    private userService: UserService,
    private ctrlLoad: LoadingController) { }

  ngOnInit() {}

  public async deleted()
  {
    const load = await this.ctrlLoad.create({
      spinner: 'bubbles',
      backdropDismiss: false,
      message: 'Suppression ...' ,
  }) ;

  await load.present();

    this.postService.deletedPost(this.idPoste).then(
      (response: any) =>{
        load.dismiss();
        if(response.status)
        {
          setTimeout(()=>{
            this.postService.getAllPoste(this.userService.userId);
          },5000) ;
        }
        else
        {
          this.other.toastCtrl(response.message);
        }
      }
    ).catch(
      ()=>{
        load.dismiss();
          this.userService.isAuth$.next(false);
          this.userService.userId = 0;
          this.userService.token = 'DEFAULT_USER_EBOOK';
          this.other.toastCtrl('Erreur, si cela persiste veuillez nous contacter .');
          this.router.navigate(['/login']);
      }
    );
  }

}

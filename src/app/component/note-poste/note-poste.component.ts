import { UserService } from './../../services/user.service';
import { Component, OnInit, Input  } from '@angular/core';
import { PublicPosterService } from 'src/app/services/public-post.service';
import { Router } from '@angular/router';
import { OtherFunction } from 'src/app/other/toast';


@Component({
  selector: 'app-note-poste',
  templateUrl: './note-poste.component.html',
  styleUrls: ['./note-poste.component.scss'],
})
export class NotePosteComponent implements OnInit {

  @Input() pseudo: string;
  @Input() addDate: string;
  @Input() msg: string;
  @Input() title: string;
  @Input() visibility: string;
  @Input() idPoste: number ;
  @Input() color: string;
  @Input() disliked: string;
  @Input() likedNumber: number;
  @Input() dislikedNumber: number;
  @Input() commentNumber: number;
  userId: number;
  public over: boolean;


  constructor(private postService: PublicPosterService,
    private router: Router,
    private other: OtherFunction,
    private userService: UserService)
    {
      this.over = false;
      this.userId = this.userService.userId ? this.userService.userId : 0 ;
    }

  public liked(int: number)
  {
    this.postService.lovedPoster(this.idPoste,{userId:this.userId ,liked:int}).then(
      (response: any)=>{
        if(response.status)
        {
          this.postService.allPrivatePoster(this.userId);
        }
        else
        {
          this.other.toastCtrl(response.message);
          this.router.navigate(['/dashboard']);
        }
      }
    ).catch(
      ()=>{
        this.userService.isAuth$.next(false);
        this.userService.userId = 0;
        this.userService.token = 'DEFAULT_USER_EBOOK';
        this.other.toastCtrl('Erreur, si cela persiste veuillez nous contacter .');
        this.router.navigate(['/login']);
      }
    ) ;
  }

  public deleted()
  {
    this.postService.deletedPost(this.idPoste).then(
      (response: any) =>{
        if(response.status)
        {
          this.router.navigate(['/actuality-home']);
        }
        else
        {
          this.other.toastCtrl(response.message);
          this.router.navigate(['/dashboard']);
        }
      }
    ).catch(
      ()=>{
          this.userService.isAuth$.next(false);
          this.userService.userId = 0;
          this.userService.token = 'DEFAULT_USER_EBOOK';
          this.other.toastCtrl('Erreur, si cela persiste veuillez nous contacter .');
          this.router.navigate(['/login']);
      }
    );
  }

  openOption()
  {
    this.over = true;
  }

  closedOption()
  {
    this.over = false ;
  }

  ngOnInit() {

  }

}

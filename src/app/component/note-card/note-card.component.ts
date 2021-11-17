import { UserService } from './../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { PosterService } from 'src/app/services/poster.service';
import { Router } from '@angular/router';
import { OtherFunction } from 'src/app/other/toast';

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
    private userService: UserService) { }

  ngOnInit() {}

  public deleted()
  {
    this.postService.deletedPost(this.idPoste).then(
      (response: any) =>{
        if(response.status)
        {
          this.router.navigate(['/dashboard']);
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

}

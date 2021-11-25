import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { PublicPosterService } from '../services/public-post.service';
import { Validators , FormBuilder , FormGroup } from '@angular/forms';
import { CommentPoster } from '../models/comment.model';
import { ActivatedRoute, Params , Router} from '@angular/router';
import { StateService } from '../services/state.service';
import { Subscription } from 'rxjs';
import { OtherFunction } from '../other/toast';

@Component({
  selector: 'app-comment-poster',
  templateUrl: './comment-poster.page.html',
  styleUrls: ['./comment-poster.page.scss'],
})
export class CommentPosterPage implements OnInit {

  userId: number ;
  formComment: FormGroup ;
  idPoster: number ;
  commentSub: Subscription;
  commentAll: any = [];
  counters: number ;

  constructor(private posteService: PublicPosterService,
    private userService: UserService, private builderForm: FormBuilder,
    private router: ActivatedRoute,
    private serviceState: StateService,
    private path: Router,
    private other: OtherFunction)
    {}


    goBack()
    {
      this.serviceState.mode$.subscribe(
        (part: string)=>{
          switch(part) {
            case 'allPosterPart':
              this.posteService.allUserPublicPoster(this.userId);
              this.path.navigate(['/actuality-home/all-user-poste']);
              break;

              case 'currentUserPoster' :
              this.posteService.allPrivatePoster(this.userId);
              this.path.navigate(['/actuality-home/personal-actuality']);
              break ;

            default:
              this.path.navigate(['/dashboard']);
              break ;
          }
        }
      ) ;
    }

  ngOnInit() {

    this.userId = this.userService.userId ? this.userService.userId : 0 ;

      this.formComment = this.builderForm.group({
        message : ['' , Validators.compose([Validators.required])]
      }) ;

    this.router.params.subscribe(
      (params: Params)=>{
        this.idPoster = params.id ;
      }
    ) ;

    this.posteService.allComment(this.idPoster);

    this.commentSub = this.posteService.allComment$.subscribe(
      (response: any)=>{
        this.commentAll = response.message ;
        this.counters = response.counters;
      }
    ) ;

  }

  sendComment()
    {
      const commentData = new CommentPoster() ;

      commentData.msg = this.formComment.get('message').value ;
      commentData.userId = this.userId ;
      commentData.id = this.idPoster ;

      this.posteService.posteComment(commentData).then(
        (response: any)=>{
          if(response.status)
          {
            this.formComment.reset() ;
            this.posteService.allComment(this.idPoster);
          }
          else
          {
            this.other.toastCtrl('Une erreur s\'est produite , veuillez réessayer plutard .');
            this.path.navigate(['/dashboard']) ;
          }
        }
      ).catch(
        ()=>{
          this.other.toastCtrl('Une erreur s\'est produite , veuillez réessayer plutard .');
          this.path.navigate(['/dashboard']) ;
        }
      ) ;
    }


}

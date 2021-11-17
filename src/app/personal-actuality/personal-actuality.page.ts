import { Component, OnInit , OnDestroy } from '@angular/core';
import { PublicPosterService } from '../services/public-post.service';
import { Subscription , interval} from 'rxjs';
import { Poster } from '../models/poster.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-personal-actuality',
  templateUrl: './personal-actuality.page.html',
  styleUrls: ['./personal-actuality.page.scss'],
})
export class PersonalActualityPage implements OnInit  ,  OnDestroy {

  public poste: any = [];
  public counter: number;
  userId: number ;
  userInfo = {pseudo:''};
  intervalCounter: any;
  private countersSub: Subscription ;
  private posteSub: Subscription;

  constructor(private posteService: PublicPosterService,
    private userService: UserService,
    private router: Router,
    private serviceState: StateService) { }

  ngOnInit() {
    this.serviceState.mode$.next('currentUserPoster') ;
    this.userId = this.userService.userId ? this.userService.userId : 0 ;

    this.posteService.allPrivatePoster(this.userId);

    this.posteSub = this.posteService.allPrivatePoster$.subscribe(
      (response: any)=>{
        this.poste = response.message ;
        this.counter = response.counters;
      }
    ) ;

    this.intervalCounter = interval(5000) ;

    this.countersSub = this.intervalCounter.subscribe(
      ()=>{
        this.posteService.allPrivatePoster(this.userId);
      }
    );

    this.userInfo.pseudo = this.userService.userData.pseudonyme ;

  }

  ngOnDestroy() {
    this.countersSub.unsubscribe();
    clearInterval(this.intervalCounter);
    this.posteSub.unsubscribe();
  }

}

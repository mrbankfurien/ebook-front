import { Component, OnInit , OnDestroy } from '@angular/core';
import { PublicPosterService } from '../services/public-post.service';
import { Subscription , interval } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-all-user-poste',
  templateUrl: './all-user-poste.page.html',
  styleUrls: ['./all-user-poste.page.scss'],
})
export class AllUserPostePage implements OnInit  ,  OnDestroy{

  public poste: any = [];
  public counter: number;
  userId: number ;
  intervalCounter: any;
  private countersSub: Subscription ;
  private posteSub: Subscription;

  constructor(private posteService: PublicPosterService,
    private userService: UserService,
    private router: Router,
    private serviceState: StateService) { }


    ngOnInit() {
      this.serviceState.mode$.next('allPosterPart') ;
      this.userId = this.userService.userId ? this.userService.userId : 0 ;
      this.posteService.allUserPublicPoster(this.userId);
      this.posteSub = this.posteService.allUserPoster$.subscribe(
        (response: any)=>{
          this.poste = response.message ;
          this.counter = response.counters;
        }
      ) ;
      this.intervalCounter = interval(5000) ;
      this.countersSub = this.intervalCounter.subscribe(
        ()=>{
          this.posteService.allUserPublicPoster(this.userId);
        }
      );
    }

  ionViewWillEnter(){
    this.serviceState.mode$.next('allPosterPart') ;
  }

  ionViewWillLeave(){
    this.serviceState.mode$.next('currentUserPoster') ;
  }

  ngOnDestroy() {
    this.posteSub.unsubscribe();
    this.countersSub.unsubscribe();
    clearInterval(this.intervalCounter);
  }

}

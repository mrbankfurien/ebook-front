import { Component, OnInit , OnDestroy } from '@angular/core';
import { PublicPosterService } from '../services/public-post.service';
import { Subscription  } from 'rxjs';
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
  public ready: boolean;
  private posteSub: Subscription;

  constructor(private posteService: PublicPosterService,
    private userService: UserService,
    private router: Router,
    private serviceState: StateService) { }


    ngOnInit() {
      this.ready = true ;
      this.serviceState.mode$.next('allPosterPart') ;
      this.userId = this.userService.userId ? this.userService.userId : 0 ;
      setTimeout(()=>{
        this.posteService.allUserPublicPoster(this.userId);
      },3000);

      this.posteSub = this.posteService.allUserPoster$.subscribe(
        (response: any)=>{
          this.ready = false ;
          this.poste = response.message ;
          this.counter = response.counters;
        }
      ) ;
    }

  ionViewWillEnter(){
    this.serviceState.mode$.next('allPosterPart') ;
  }

  ionViewWillLeave(){
    this.serviceState.mode$.next('currentUserPoster') ;
  }

  ngOnDestroy() {
    this.posteSub.unsubscribe();
  }

}

import { Component, OnInit , OnDestroy } from '@angular/core';
import { PublicPosterService } from '../services/public-post.service';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { StateService } from '../services/state.service';
import { User } from '../models/user.model';

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
  private posteSub: Subscription;

  constructor(private posteService: PublicPosterService,
    private userService: UserService,
    private serviceState: StateService) { }

    ngOnInit() {
      this.userId = this.userService.userId ? this.userService.userId : 0 ;
      this.posteService.allPrivatePoster(this.userId);
      this.posteSub = this.posteService.allPrivatePoster$.subscribe(
        (response: any)=>{
          this.poste = response.message ;
          this.counter = response.counters;
        }
      ) ;

      this.userInfo.pseudo = this.userService.userData.pseudonyme ;
    }


  ionViewWillEnter(){
    this.serviceState.mode$.next('currentUserPoster') ;
  }

  ionViewWillLeave(){
    this.serviceState.mode$.next('allPosterPart') ;
  }


  ngOnDestroy() {
    this.posteSub.unsubscribe();
  }

}

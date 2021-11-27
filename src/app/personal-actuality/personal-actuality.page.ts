import { Component, OnInit , OnDestroy } from '@angular/core';
import { PublicPosterService } from '../services/public-post.service';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { StateService } from '../services/state.service';
import {Storage} from '@ionic/storage-angular';

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
  public ready: boolean;
  private posteSub: Subscription;

  constructor(private posteService: PublicPosterService,
    private userService: UserService,
    private serviceState: StateService,
    private storage: Storage) {
      this.storage.create();
     }

    ngOnInit() {
      this.ready = true ;
      this.userId = this.userService.userId ? this.userService.userId : 0 ;
      setTimeout(()=>{
        this.posteService.allPrivatePoster(this.userId);
      },3000);

      this.posteSub = this.posteService.allPrivatePoster$.subscribe(
        (response: any)=>{
          this.ready= false ;
          this.poste = response.message ;
          this.counter = response.counters;
        }
      ) ;
    }


  ionViewWillEnter(){
    this.storage.get('mylife_init').then(
      (val)=>{
        this.userInfo = {pseudo:val.pseudo};
      }
    );
    this.serviceState.mode$.next('currentUserPoster') ;
  }

  ionViewWillLeave(){
    this.serviceState.mode$.next('allPosterPart') ;
  }


  ngOnDestroy() {
    this.posteSub.unsubscribe();
  }

}

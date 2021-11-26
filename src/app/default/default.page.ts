import { Component, OnInit , OnDestroy , ViewChild } from '@angular/core';
import { PublicPosterService } from '../services/public-post.service';
import { Subscription } from 'rxjs';
import { IonSlides } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.page.html',
  styleUrls: ['./default.page.scss'],
})
export class DefaultPage implements OnInit , OnDestroy {

  @ViewChild(IonSlides) slides: IonSlides;

  slideOpts = {
    initialSlide : 0 ,
    speed : 400 ,
    autoplay : true
  };

  public over: boolean;
  public arrayPoster: any =[];
  public counter: number;
  public userStatus: boolean;
  public ready: boolean;
  private publicPosterSub: Subscription ;
  private statusSub: Subscription ;

  constructor(private publicPoster: PublicPosterService,
    private userService: UserService) {
    this.over = false;
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
    this.ready = true ;
    this.publicPoster.allPoster();

    this.publicPosterSub = this.publicPoster.allPublicPoster$.subscribe(
      (response: any) => {
        this.ready = false ;
        this.arrayPoster = response.message ;
        this.counter = response.counters;
      }
    ) ;
    this.statusSub = this.userService.isAuth$.subscribe(
      (value) =>{
        this.userStatus = value;
      }
    ) ;

  }

  ionViewWillEnter(){
  }

  ionViewWillLeave(){
  }

  ngOnDestroy()
  {
    this.statusSub.unsubscribe();
    this.publicPosterSub.unsubscribe();
  }


}

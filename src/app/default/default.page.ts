import { Component, OnInit , OnDestroy } from '@angular/core';
import { PublicPosterService } from '../services/public-post.service';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';//cet import suffit
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.page.html',
  styleUrls: ['./default.page.scss'],
})
export class DefaultPage implements OnInit , OnDestroy {

  public over: boolean;
  public arrayPoster: any =[];
  public counter: number;
  public userStatus: boolean;
  private countersSub: Subscription ;
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
    this.publicPoster.allPoster();

    this.publicPosterSub = this.publicPoster.allPublicPoster$.subscribe(
      (response: any) => {
        this.arrayPoster = response.message ;
        this.counter = response.counters;
      }
    ) ;

    const counters = interval(5000) ;

    this.countersSub = counters.subscribe(
      ()=>{
        this.publicPoster.allPoster();
      }
    );

    this.statusSub = this.userService.isAuth$.subscribe(
      (value) =>{
        this.userStatus = value;
      }
    ) ;

  }

  ngOnDestroy()
  {
    this.countersSub.unsubscribe();
    this.statusSub.unsubscribe();
    this.publicPosterSub.unsubscribe();
  }


}

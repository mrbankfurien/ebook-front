import { Component, OnInit , OnDestroy } from '@angular/core';
import { PosterService } from '../services/poster.service';
import { Subscription } from 'rxjs';
import { Poster } from '../models/poster.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit , OnDestroy {

  public poste: Poster[] = [];
  public counter: number;
  userId: number ;
  userInfo = {pseudo:''};
  private posteSub: Subscription;

  constructor(private posteService: PosterService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {

    this.userId = this.userService.userId ? this.userService.userId : 0 ;

    this.posteService.getAllPoste(this.userId);

    this.posteSub = this.posteService.postes$.subscribe(
      (pstes: any)=>{
        this.poste = pstes.message;
        this.counter = pstes.counters;
      }
    );

    this.userInfo.pseudo = this.userService.userData.pseudonyme ;
  }

  public navToActu(){
    this.router.navigate(['/actuality-home']);
  }

  public logOut(){
    this.userService.logOut();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.posteSub.unsubscribe();
  }

}
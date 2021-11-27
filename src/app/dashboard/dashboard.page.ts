import { Component, OnInit , OnDestroy } from '@angular/core';
import { PosterService } from '../services/poster.service';
import { Subscription } from 'rxjs';
import { Poster } from '../models/poster.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit , OnDestroy {

  public poste: Poster[] = [];
  public counter: number;
  userId: number ;
  userInfo = {pseudo:'',date:''};
  ready: boolean;
  private posteSub: Subscription;

  constructor(private posteService: PosterService,
    private userService: UserService,
    private router: Router,
    private storage: Storage) {
      this.storage.create();
    }

  ngOnInit() {

    this.ready = true ;
    this.userId = this.userService.userId ? this.userService.userId : 0 ;

    setTimeout(()=>{
      this.posteService.getAllPoste(this.userId);
    },5000);

    this.posteSub = this.posteService.postes$.subscribe(
      (pstes: any)=>{
        this.ready = false ;
        this.poste = pstes.message;
        this.counter = pstes.counters;
      }
    );

  }

  ionViewWillEnter(){
    this.storage.get('mylife_init').then(
      (val)=>{
        this.userInfo = {pseudo:val.pseudo , date : val.date};
      }
    );
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

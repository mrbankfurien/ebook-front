import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;
import { Poster } from '../models/poster.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { OtherFunction } from '../other/toast';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class PosterService {

  userId: number ;
  token: string  ;
  public postes$ = new Subject<Poster[]>();
  private poste: Poster[] = [] ;


  constructor(private http: HttpClient,
    private router: Router, private other: OtherFunction,
    private userService: UserService)
    {
      this.userId = this.userService.userId ? this.userService.userId : 0 ;
    }

  emitPoster() {
    this.postes$.next(this.poste);
  }

  public getAllPoste(userId: number)
  {

      this.http.get('http://localhost:3080/api/poster/all-post/' + userId).subscribe(
        (response: any)=>{

          if(response.status)
          {
            this.poste = response ;
            this.emitPoster() ;
          }
          else
          {
            this.other.toastCtrl(response.message);
            this.router.navigate(['/login']);;
          }
        } ,
        ()=>{
          this.other.toastCtrl('Utilisateur introuvable, veuillez vous reconnecter');
          this.router.navigate(['/login']);;
        }
      );
  }

  public createPoste(poste: Poster)
  {
    return new Promise((resolve,reject)=>{
      this.http.post('http://localhost:3080/api/poster/save-post',poste).subscribe(
        (response)=>{
          this.getAllPoste(this.userId);
          resolve(response);
        } ,
        (error)=>{
          reject(error);
        }
      );
    });
  }

  public getOnPoste(id: number)
  {
    return new Promise((resolve,reject)=>{
      this.http.get('http://localhost:3080/api/poster/getOnPost/'+id).subscribe(
        (response: any)=>{
          resolve(response.message[0]);
        } ,
        (error)=>{
          reject(error);
        }
      );
    }) ;
  }

  public updatePost(id: number , poste: Poster)
  {
    return new Promise((resolve,reject)=>{

      this.http.put('http://localhost:3080/api/poster/update-post/'+id,poste).subscribe(
        (response)=> {
          this.getAllPoste(this.userId);
          resolve(response);
        } ,
        (error) =>{
          reject(error);
        }
      );
    }) ;
  }

  public deletedPost(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3080/api/poster/deleted/' + id).subscribe(
        (response) => {
          this.getAllPoste(this.userId);
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


}

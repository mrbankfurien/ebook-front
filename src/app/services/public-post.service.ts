import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { Poster } from '../models/poster.model';
import { CommentPoster } from '../models/comment.model';
import { links } from '../link/links';

@Injectable({
  providedIn: 'root'
})

export class PublicPosterService {

  userId: number ;
  public allPublicPoster$= new Subject<[]>();
  public allPrivatePoster$= new Subject<[]>();
  public allUserPoster$= new Subject<[]>();
  public allComment$= new Subject<[]>();
  public publicPoster: any = [] ;
  public privatePoster: any = [] ;
  public publicUserPoster: any = [] ;
  public commentForPoster: any = [] ;
 // private poste: Poster[] = [] ;
 //private commentPoster: CommentPoster[] = [] ;



  constructor(private http: HttpClient,
    private route: Router,private userService: UserService)
    {
      this.userId = this.userService.userId ? this.userService.userId : 0 ;
    }

  public posteComment(comment: CommentPoster) {
    return new Promise((resolve,reject)=>{
        this.http.post(links.publicPost.commented,comment).subscribe(
          (response)=>{
            resolve(response);
          } ,
          (error)=>{
            reject(error);
          }
        );
    }) ;
  }

  public allComment(id: number){
    this.http.get(links.publicPost.allComment+id).subscribe(
      (response)=>{
        this.commentForPoster = response ;
        this.emitComment();
      }
    ) ;
  }


  emitComment()
  {
    this.allComment$.next(this.commentForPoster) ;
  }

  emitPublicPoster()
  {
    this.allPublicPoster$.next(this.publicPoster) ;
  }

  emitPublicUserPoster()
  {
    this.allUserPoster$.next(this.publicUserPoster) ;
  }

  emitPrivatePoster()
  {
    this.allPrivatePoster$.next(this.privatePoster) ;
  }

  public lovedPoster(id: number , data: any){
    return new Promise((resolve,reject)=>{

      this.http.put(links.publicPost.lovePost+id,data).subscribe(
        (response) =>{
            resolve(response);
        },
        (error) =>{
          reject(error);
        }
      );
    }) ;
  }

  public updatePost(id: number , poste: Poster)
  {
    return new Promise((resolve,reject)=>{

      this.http.put(links.publicPost.updatePost+id,poste).subscribe(
        (response)=> {
          this.allPrivatePoster(this.userId);
          resolve(response);
        } ,
        (error) =>{
          reject(error);
        }
      );
    }) ;
  }

  public allPoster()
  {
      this.http.get(links.publicPost.allPost).subscribe(
        (response)=>{
          this.publicPoster = response ;
          this.emitPublicPoster();
        } ,
        ()=>{
          this.route.navigate(['/home']);
        }
      );
  }

  public allUserPublicPoster(userId: number)
  {
      this.http.get(links.publicPost.publicPost+userId).subscribe(
        (response)=>{
          this.publicUserPoster = response ;
          this.emitPublicUserPoster();
        } ,
        ()=>{
          this.route.navigate(['/home']);
        }
      );
  }

  public allPrivatePoster(userId: number)
  {
      this.http.get(links.publicPost.privatePost + userId).subscribe(
        (response)=>{
          this.privatePoster = response ;
          this.emitPrivatePoster();
        } ,
        ()=>{
          this.route.navigate(['/home']);
        }
      );
  }

  public deletedPost(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete(links.publicPost.deletePost + id).subscribe(
        (response) => {
          this.allPrivatePoster(this.userId);
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}

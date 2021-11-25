import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;
import { BehaviorSubject , Subject } from 'rxjs';
import { links } from '../link/links';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  userId: number ;
  token: string  ;
  public dataUser$ = new Subject<User[]>();
  private userData: User[] = [] ;




  constructor(private http: HttpClient) {}

  emifDataUser()
  {
    this.dataUser$.next(this.userData);
    console.log(this.userData);
  }

  public createNewUser(user: User){
    return new Promise((resolve , reject) =>{
      this.http.post(links.usersLink.register,user).
      subscribe(
        (response) =>{
          resolve(response) ;
        } ,
        (error) =>{
          reject(error) ;
        }
      ) ;
    }) ;
  }

  public userLogin(mail: string , password: string)
  {
    return new Promise((resolve , reject)=>{
      this.http.post(links.usersLink.login,{email: mail , passwords: password}).
      subscribe(
        (response: any) =>{
            if(response.status)
            {
              this.userId = response.userId;
              this.token = response.token;
              this.isAuth$.next(true);
              this.userData = response.data;
              this.emifDataUser();
              resolve({status : true , msg:'IS_CONNECT'});
            }
            else
            {
              resolve({status : false , msg:response});
            }
        } ,
        (error)=>{
          reject(error);
        }
      ) ;
    }) ;
  }

  public resetPassword(mail: string){
    return new Promise((resolve , reject)=>{

      this.http.post(links.usersLink.reset,{email: mail}).subscribe(
        (response)=>{
            resolve(response) ;
        } ,
        (error) =>{
          reject(error);
        }
      ) ;
    }) ;
  }

  public updateData(user: User){
    return new Promise((resolve , reject)=>{

      this.http.post(links.usersLink.updateData,user).subscribe(
        (response)=>{
            resolve(response) ;
        } ,
        (error) =>{
          reject(error);
        }
      ) ;
    }) ;
  }

  public logOut()
  {
    this.isAuth$.next(false);
    this.userId = 0;
    this.token = 'DEFAULT_USER_EBOOK';
  }

}

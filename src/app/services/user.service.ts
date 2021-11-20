import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { links } from '../link/links';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  userData: any ;
  userId: number ;
  token: string  ;




  constructor(private http: HttpClient) {}

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

  public logOut()
  {
    this.isAuth$.next(false);
    this.userId = 0;
    this.token = 'DEFAULT_USER_EBOOK';
  }

}

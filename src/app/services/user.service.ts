import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;
import { BehaviorSubject  } from 'rxjs';
import { links } from '../link/links';
import {Storage} from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  userId: number ;
  token: string  ;
  public userPassword: any ;
  public userData: any  ;
  public registerDate: any ;

  constructor(private http: HttpClient,private storage: Storage) {
    this.storage.create();
  }


  public createNewUser(user: User){
    return new Promise((resolve , reject) =>{
      this.http.post(links.usersLink.register,user).
      subscribe(
        (response) =>{
          this.userPassword = user.passwords ;
          resolve(response) ;
          this.storage.set(
            'mylife_init',{status:{register:true,login:false},
            email:user.email,
            userName:user.username,
            passwords:this.userPassword,
            pseudo:user.pseudonyme,
            numbers:user.numbers}
            );
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
              this.userPassword = password ;
              this.isAuth$.next(true);
              this.userData = response.data;
              this.registerDate = this.userData.add_date ;
              this.storage.set(
                'mylife_init',{status:{register:true,login:true},
                email:mail,
                userName:this.userData.username,
                passwords:this.userPassword,
                pseudo:this.userData.pseudonyme,
                date:this.registerDate,
                numbers:this.userData.number}
                );
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
            this.userData = user ;
            resolve(response) ;
        } ,
        (error) =>{
          reject(error);
        }
      ) ;
    }) ;
  }

  public updatePassword(token,data){
    return new Promise((resolve , reject)=>{
      this.http.put(links.usersLink.updatePassword+token,data).subscribe(
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
    this.storage.set(
      'mylife_init',{status:{register:true,login:false},
      email:this.userData.email,
      userName:this.userData.username,
      passwords:'',
      numbers:this.userData.number,
      pseudo:this.userData.pseudonyme,
      date:this.registerDate}
      );
  }

}

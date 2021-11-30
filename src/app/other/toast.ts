import { ToastController , LoadingController  } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class OtherFunction {

  constructor(private ctrlToast: ToastController,
  private ctrlLoad: LoadingController){}

  public async toastCtrl(title: string)
  {
    const toast = await this.ctrlToast.create({
      message: title,
      position: 'bottom',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            toast.dismiss();
          }
        }
      ]
    }) ;


    await toast.present() ;
  }

  public async loadCtrl(title: string)
  {
    const load = await this.ctrlLoad.create({
        spinner: 'bubbles',
        backdropDismiss: true,
        message: title ,
        duration:500
    }) ;

    await load.present();
  }

}

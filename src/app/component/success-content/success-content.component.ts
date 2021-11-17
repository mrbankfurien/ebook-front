import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-success-content',
  templateUrl: './success-content.component.html',
  styleUrls: ['./success-content.component.scss'],
})
export class SuccessContentComponent implements OnInit {

  @Input() title: string ;
  @Input() status: boolean ;
  @Input() content: string ;

  constructor() {
    this.title = '';
    this.content = '' ;
    this.status = false ;
   }

   public closed()
   {
     this.status = !this.status;
   }

  ngOnInit() {}

}

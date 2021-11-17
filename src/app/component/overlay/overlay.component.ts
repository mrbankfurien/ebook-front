import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {

  @Input() content: string ;
  @Input() status: boolean ;

  constructor() {

    this.status = false ;
    this.content ='' ;

   }

   public closed()
   {
     this.status = !this.status;
   }

  ngOnInit() {}

}

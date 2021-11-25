import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class SecurityComponent implements OnInit {

  @Input() visibility: boolean ;

  constructor() {
    this.visibility = false ;
   }

   closeModal()
   {
     this.visibility = false ;
   }

  ngOnInit() {}

}

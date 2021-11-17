import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StateService {
  public mode$ = new BehaviorSubject<string>('');
  public errorHttp$ = new BehaviorSubject<string>('');
}

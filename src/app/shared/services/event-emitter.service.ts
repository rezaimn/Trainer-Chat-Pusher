import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class EventEmitterService {

  constructor() { }
  alertMessage:any=new EventEmitter<any>();
  allUsers=new EventEmitter<any>();
  sentMessage=new EventEmitter<string>();
  userStatusChanged=new EventEmitter<any>();
  selectedUserToChat=new EventEmitter<any>();
}

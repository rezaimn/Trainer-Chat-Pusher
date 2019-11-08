import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class DataService {

  constructor() { }
  currentUser:any;
  currentRoom:any;
  allUsers:any[];
}

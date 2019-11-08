import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {EventEmitterService} from '../../../shared/services/event-emitter.service';
import {DataService} from "../../../shared/services/data.service";

/**
 * @ignore
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  messageText='';
  constructor(private translate: TranslateService,
              public router: Router,
              private emitterService:EventEmitterService,
              public dataService:DataService) {
  }
  ngOnInit(): void {
  }
  sendMessage(event){
    if((event && event.code=='Enter') || !event){
      console.log(event);
      this.emitterService.sentMessage.emit(this.messageText);
      this.messageText='';
    }
  }
}

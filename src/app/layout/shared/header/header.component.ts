import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {SessionStorage} from 'ngx-webstorage';
import {DataService} from '../../../shared/services/data.service';


/**
 * @ignore
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public pushRightClass: string;
  collapsed: boolean;
  toggled: boolean;
  @Output() toggleEvent = new EventEmitter<boolean>();
  constructor(private translate: TranslateService,
              public router: Router,
              public dataService:DataService) {

    this.router.events.subscribe(val => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 992
      ) {
        this.toggled=false;
      }
      else {
        this.toggled=true;
      }
    });
  }

  ngOnInit() {
    this.pushRightClass = 'push-right';
    this.collapsed = true;
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }
  changeLang(language: string) {
    this.translate.use(language);
  }
  toggleSidebar() {
    this.toggled = !this.toggled;
    this.toggleEvent.emit(this.toggled);
  }
}

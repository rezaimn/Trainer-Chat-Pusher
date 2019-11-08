import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {SessionStorage} from 'ngx-webstorage';
import {SidebarElements} from '../../../shared/models/sidebar-elements';
import {EventEmitterService} from '../../../shared/services/event-emitter.service';
import {DataService} from "../../../shared/services/data.service";


/**
 * @ignore
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isActive: boolean;
  collapsed: boolean;
  allUsers = [];
  showMenu: string;
  pushRightClass: string;
  sidebarItems = new SidebarElements().elements;
  @Output() collapsedEvent = new EventEmitter<boolean>();
  @Input() sideBarToggled;

  constructor(private translate: TranslateService,
              public router: Router,
              public dataService:DataService,
              private emitterService: EventEmitterService,
  ) {
    this.router.events.subscribe(val => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 992 &&
        this.isToggled()
      ) {
        this.toggleSidebar();
      }
    });
    this.dataService.allUsers;
  }

  ngOnInit() {
    this.isActive = false;
    this.collapsed = false;
    this.showMenu = '';
    this.pushRightClass = 'push-right';
  }


  eventCalled() {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  userSelect(index, user) {
    this.emitterService.selectedUserToChat.emit(user);
    this.dataService.allUsers.map(user => {
      return user.selected = false;
    })
    this.dataService.allUsers[index].selected = true;
    this.dataService.allUsers[index].unreadCount = 0;
  }

}

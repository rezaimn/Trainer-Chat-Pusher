import {Component, OnInit} from '@angular/core';

/**
 * @ignore
 */
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  collapedSideBar: boolean;
  toggled: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

  toggleSidebar(event) {
    this.toggled = event;
  }


}

import { Component, OnInit } from "@angular/core";
import {HomeComponent} from '../../home/home.component';
import {VisitComponent} from '../../visit/visit.component';
import {CreditSimulationComponent} from '../../credit-simulation/credit-simulation.component';
import {CameraSurveillanceComponent} from '../../camera-surveillance/camera-surveillance.component';

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: "/home",
    title: "Home",
    rtlTitle: "لوحة القيادة",
    icon: "icon-align-center",
    class: ""
  },
  {
    path: "/visit",
    title: "Visit",
    rtlTitle: "الرموز",
    icon: "icon-chat-33",
    class: ""
  },
  {
    path: "/surveillance",
    title: "Camera surveillance",
    rtlTitle: "خرائط",
    icon: "icon-camera-18",
    class: "" },
  {
    path: "/credit",
    title: "Credit simulation",
    rtlTitle: "خرائط",
    icon: "icon-bank",
    class: "" },
  {
    path: "/contrat",
    title: "Contrat",
    rtlTitle: "إخطارات",
    icon: "icon-single-copy-04",
    class: ""
  },

  {
    path: "/insurance",
    title: "insurance",
    rtlTitle: "ملف تعريفي للمستخدم",
    icon: "icon-notes",
    class: ""
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}

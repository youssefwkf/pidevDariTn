import { Routes } from "@angular/router";

/*import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";*/
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import {HomeComponent} from '../../home/home.component';
import {VisitComponent} from '../../visit/visit.component';
import {CreditSimulationComponent} from '../../credit-simulation/credit-simulation.component';
import {CameraSurveillanceComponent} from '../../camera-surveillance/camera-surveillance.component';
import {ContratComponent} from '../../contrat/contrat.component';
import {InssuranceComponent} from '../../inssurance/inssurance.component';
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "visit", component: VisitComponent },
  { path: "credit", component: CreditSimulationComponent },
  { path: "surveillance", component: CameraSurveillanceComponent },
  { path: "contrat", component: ContratComponent },
  { path: "insurance", component: InssuranceComponent },
  // { path: "rtl", component: RtlComponent }
];

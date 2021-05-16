import { Routes } from "@angular/router";

/*import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";*/
import {HomeComponent} from '../../home/home.component';
import {VisitComponent} from '../../visit/visit.component';
import {CreditSimulationComponent} from '../../credit-simulation/credit-simulation.component';
import {CameraSurveillanceComponent} from '../../camera-surveillance/camera-surveillance.component';
import {ContratComponent} from '../../contrat/contrat.component';
import {InssuranceComponent} from '../../inssurance/inssurance.component';
import {ProfileComponent} from '../../profile/profile.component';
import {SettingComponent} from '../../setting/setting.component';
import {ProductComponent} from '../../camera-surveillance/product/product.component';
import {RequestDevisComponent} from '../../camera-surveillance/request-devis/request-devis.component';
import {MyActivitiesComponent} from '../../camera-surveillance/my-activities/my-activities.component';
import {GestionSurveillanceComponent} from '../../camera-surveillance/gestion-surveillance/gestion-surveillance.component';
import {ChatComponent} from '../../camera-surveillance/chat/chat.component';
import {ActiviesAgentComponent} from '../../camera-surveillance/activies-agent/activies-agent.component';
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "visit", component: VisitComponent },
  { path: "credit", component: CreditSimulationComponent },
  { path: "surveillance", component: CameraSurveillanceComponent },
  { path: "contrat", component: ContratComponent },
  { path: "insurance", component: InssuranceComponent },
  { path: "profile", component: ProfileComponent },
  { path: "setting", component: SettingComponent },
  { path: "product", component: ProductComponent },
  { path: "devis", component: RequestDevisComponent },
  { path: "activities", component: MyActivitiesComponent },
  { path: "gestionsurveillance", component: GestionSurveillanceComponent },
  { path: "chat", component:ChatComponent },
  { path: "activitiesAgent", component: ActiviesAgentComponent },
  // { path: "rtl", component: RtlComponent }
];

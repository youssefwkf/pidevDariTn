import {Injectable, NgModule} from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";
import { VisitComponent } from "../../visit/visit.component";
import { CreditSimulationComponent } from "../../credit-simulation/credit-simulation.component";
import { CameraSurveillanceComponent } from "../../camera-surveillance/camera-surveillance.component";
import { ContratComponent } from "../../contrat/contrat.component";
import { HomeComponent } from "../../home/home.component";
import { SettingComponent } from "../../setting/setting.component";
import { ProfileComponent } from "../../profile/profile.component";
import { InssuranceComponent } from "../../inssurance/inssurance.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {ServiceSurveillance} from '../../service/surveillance/service-surveillance';
import {ProductComponent} from '../../camera-surveillance/product/product.component';
import {RequestDevisComponent} from '../../camera-surveillance/request-devis/request-devis.component';
import {MyActivitiesComponent} from '../../camera-surveillance/my-activities/my-activities.component';
import { GestionSurveillanceComponent } from '../../camera-surveillance/gestion-surveillance/gestion-surveillance.component';
import { ChatComponent } from '../../camera-surveillance/chat/chat.component';
import { ActiviesAgentComponent } from '../../camera-surveillance/activies-agent/activies-agent.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        HttpClientModule,
        NgbModule,
    ],
    declarations: [
        DashboardComponent,
        UserComponent,
        TablesComponent,
        IconsComponent,
        TypographyComponent,
        NotificationsComponent,
        MapComponent,
        VisitComponent,
        CreditSimulationComponent,
        CameraSurveillanceComponent,
        ContratComponent,
        HomeComponent,
        SettingComponent,
        ProfileComponent,
        InssuranceComponent,
        ServiceSurveillance,
        ProductComponent,
        RequestDevisComponent,
        GestionSurveillanceComponent,
        MyActivitiesComponent,
        ChatComponent,
        ActiviesAgentComponent// RtlComponent
    ],

    exports: [
        TablesComponent
    ]
})

export class AdminLayoutModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { PagesComponent } from './pages/pages.component';
import { MediaComponent } from './media/media.component';
import { SettingsComponent } from './settings/settings.component';
import { SublevelMenuComponent } from './sidenav/sublevel-menu.component';
import { TestComponent } from './test/test.component';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgApexchartsModule } from "ng-apexcharts";
import { TimeService } from "./time.service"
import {MatButtonModule} from '@angular/material/button';
import { SituationGlobalComponent } from './situation-global/situation-global.component';
import { CardComponentComponent } from './card-component/card-component.component';
import { HelperCardconponentComponent } from './helper-cardconponent/helper-cardconponent.component';
import { SuivieProjectComponent } from './suivie-project/suivie-project.component';
@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    StatisticsComponent,
    PagesComponent,
    MediaComponent,
    SettingsComponent,
    SublevelMenuComponent,
    TestComponent,
    SituationGlobalComponent,
    CardComponentComponent,
    HelperCardconponentComponent,
    SuivieProjectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatTableModule,
    HttpClientModule,
    MatExpansionModule,
    NgApexchartsModule,
    MatButtonModule
  ],
  providers: [TimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

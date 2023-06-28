import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MediaComponent } from './media/media.component';
import { PagesComponent } from './pages/pages.component';
import { ProductsComponent } from './products/products.component';
import { SettingsComponent } from './settings/settings.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SituationGlobalComponent } from './situation-global/situation-global.component';
import { CardComponentComponent } from './card-component/card-component.component';
import { SuivieProjectComponent } from './suivie-project/suivie-project.component';


const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent
  , children:[
    {path:'' , component:ProductsComponent },
    {path:':id' , component:SettingsComponent },
    {path:':id/:id2' , component: StatisticsComponent},
  ]},
  {path: 'statistics', component: StatisticsComponent }
  ,
  {path: 'pages', component: PagesComponent },
  {path: 'situationGlobal', component: SituationGlobalComponent },
  {path: 'Card', component: CardComponentComponent },
  {path: 'media', component: MediaComponent },
  {path: 'suivieProject', component: SuivieProjectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

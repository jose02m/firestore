import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestsEventsPage } from './guests-events.page';

const routes: Routes = [
  {
    path: '',
    component: GuestsEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestsEventsPageRoutingModule {}

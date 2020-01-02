import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent, NavbarComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [NavbarComponent, SharedModule],
  providers: []
})
export class CoreModule {}

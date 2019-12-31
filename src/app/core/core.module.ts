import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavComponent } from "./components/nav/nav.component";
import { RouterModule } from "@angular/router";
import { ScreenSizeService } from "./services/screen-size.service";
import { SharedModule } from "../shared/shared.module";
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [NavComponent, NavbarComponent, NavbarComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [NavComponent, NavbarComponent, SharedModule],
  providers: [ScreenSizeService]
})
export class CoreModule {}

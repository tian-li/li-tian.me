import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavComponent } from "./components/nav/nav.component";
import { RouterModule } from "@angular/router";
import { ScreenSizeService } from "./services/screen-size.service";

@NgModule({
  declarations: [NavComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavComponent],
  providers: [ScreenSizeService]
})
export class CoreModule {}

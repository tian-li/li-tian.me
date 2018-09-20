import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

const modules = [
  MatButtonModule,
  MatCardModule,
]

@NgModule({
  imports: [modules],
  exports: [modules],
})
export class BlogMaterialModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { MarkdownPipe } from './pipes/markdown.pipe';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatIconModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatToolbarModule
];

@NgModule({
  declarations: [ErrorMessageComponent, MarkdownPipe],
  imports: [CommonModule, materialModules],
  exports: [ErrorMessageComponent, MarkdownPipe, materialModules],
  providers: []
})
export class SharedModule {}

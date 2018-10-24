import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '../shared/material.module';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';
import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { MarkdownPipe } from '../shared/markdown.pipe';
import { BlogService } from './service/blog.service';
import { reducers } from './reducer';
import { BlogEffects } from './effects/blog.effects';
import { BlogListItemComponent } from './components/blog-list/blog-list-item/blog-list-item.component';
import { FirebaseService } from '../shared/firebase.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    BlogRoutingModule,
    StoreModule.forFeature('blogs', reducers),
    EffectsModule.forFeature([BlogEffects]),
  ],
  declarations: [
    BlogComponent,
    BlogListComponent,
    BlogDetailComponent,
    BlogListItemComponent,
    ErrorMessageComponent,
    MarkdownPipe,
  ],
  providers: [BlogService, FirebaseService],
})
export class BlogModule {}

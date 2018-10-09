import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BlogMaterialModule } from './blog-material.module';

import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { MarkdownPipe } from './components/blog-detail/markdown.pipe';
import { FormsModule } from '@angular/forms';

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
    BlogMaterialModule,
    BlogRoutingModule,
    StoreModule.forFeature('blogs', reducers),
    EffectsModule.forFeature([BlogEffects]),
  ],
  declarations: [
    BlogComponent,
    BlogListComponent,
    BlogDetailComponent,
    BlogListItemComponent,
    MarkdownPipe,
  ],
  providers: [BlogService, FirebaseService],
})
export class BlogModule { }

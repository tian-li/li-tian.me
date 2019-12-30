import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { MarkdownPipe } from '../shared/pipes/markdown.pipe';
import { reducers } from './reducer';
import { BlogEffects } from './effects/blog.effects';
import { BlogListItemComponent } from './components/blog-list/blog-list-item/blog-list-item.component';
import { BlogService } from './service/blog.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BlogRoutingModule,
    SharedModule,
    StoreModule.forFeature('blogs', reducers),
    EffectsModule.forFeature([BlogEffects]),
  ],
  declarations: [
    BlogComponent,
    BlogListComponent,
    BlogDetailComponent,
    BlogListItemComponent,
  ],
  providers: [BlogService, BlogService],
})
export class BlogModule {}

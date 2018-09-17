import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogListItemComponent } from './blog-list-item.component';

describe('BlogListItemComponent', () => {
  let component: BlogListItemComponent;
  let fixture: ComponentFixture<BlogListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

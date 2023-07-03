import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBlogsComponent } from './create-blogs.component';

describe('CreateBlogsComponent', () => {
  let component: CreateBlogsComponent;
  let fixture: ComponentFixture<CreateBlogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBlogsComponent]
    });
    fixture = TestBed.createComponent(CreateBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

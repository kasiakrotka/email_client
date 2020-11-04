import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfEmailsComponent } from './list-of-emails.component';

describe('ListOfEmailsComponent', () => {
  let component: ListOfEmailsComponent;
  let fixture: ComponentFixture<ListOfEmailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfEmailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

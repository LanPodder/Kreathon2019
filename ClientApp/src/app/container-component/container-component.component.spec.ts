import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerComponentComponent } from './container-component.component';

describe('ContainerComponentComponent', () => {
  let component: ContainerComponentComponent;
  let fixture: ComponentFixture<ContainerComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

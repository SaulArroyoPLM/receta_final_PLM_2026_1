import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderMenu } from './slider-menu';

describe('SliderMenu', () => {
  let component: SliderMenu;
  let fixture: ComponentFixture<SliderMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

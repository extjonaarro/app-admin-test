import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MenuOutline } from '@ant-design/icons-angular/icons';
import { App } from './app';
import { routes } from './app.routes';
import { provideNzIcons } from 'ng-zorro-antd/icon';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes), provideNzIcons([MenuOutline])],
    }).compileComponents();
  });

  it('debe crear la aplicación', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

import { Component } from '@angular/core';
import { LandingPageComponent } from './landing-page/landing-page.component';

/**
 * Component: AppComponent
 * תפקיד: רכיב שורש (Root Component) המארח את רכיבי האפליקציה השונים.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingPageComponent], // טעינת דף הנחיתה לתוך הרכיב הראשי
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'frontend';
}
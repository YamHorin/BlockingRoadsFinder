import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Component: LandingPageComponent
 * -----------------------------------------------------------------------------
 * תפקיד: ניהול דף נחיתה ארוך במבנה סקציות, כולל אנימציית מדדים וניהול סליקה.
 */
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  
  isLoading: boolean = false;

  // ערכי תצוגה למונים
  eventsDisplay: string = '0';
  sourcesDisplay: number = 0;
  accuracyDisplay: string = '0.0';

  pricingPlan = {
    name: 'מנוי חודשי מלא',
    price: 29,
    currency: '₪',
    period: 'חודש',
    features: [
      'התראות בזמן אמת 24/7 לטלגרם',
      'הצלבת נתונים מ-6 מקורות חדשות מובילים',
      'סינון AI מתקדם (הבחנה בין עבודות יזומות להפגנות)',
      'חופש מלא - ביטול המנוי בקליק בכל עת'
    ]
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.animateCounters();
  }

  /**
   * מנגנון הרצת המדדים
   */
  animateCounters(): void {
    const duration = 1000;
    const steps = 30;
    const stepTime = duration / steps;

    const targetEvents = 28400;
    const targetSources = 6;
    const targetAccuracy = 98.6;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      this.eventsDisplay = Math.floor(targetEvents * progress).toLocaleString();
      this.sourcesDisplay = Math.floor(targetSources * progress);
      this.accuracyDisplay = (targetAccuracy * progress).toFixed(1);

      this.cdr.detectChanges();

      if (currentStep >= steps) {
        this.eventsDisplay = targetEvents.toLocaleString();
        this.sourcesDisplay = targetSources;
        this.accuracyDisplay = targetAccuracy.toFixed(1);
        this.cdr.detectChanges();
        clearInterval(timer);
      }
    }, stepTime);
  }

  onStartPayment(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      alert('בשלב הבא נחבר את ה-API של משולם שיפתח את חלון הסליקה!');
    }, 1200);
  }
}
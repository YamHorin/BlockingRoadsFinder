import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// TODO: replace with the real backend endpoint once it exists
const LEAD_SUBMIT_URL = '/api/leads';

/**
 * Component: LandingPageComponent
 * -----------------------------------------------------------------------------
 * תפקיד: ניהול דף נחיתה ארוך במבנה סקציות, כולל אנימציית מדדים וניהול סליקה.
 */
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  isLoading: boolean = false;

  // מודל איסוף פרטי הלקוח לפני מעבר לסליקה
  isLeadModalOpen: boolean = false;
  leadForm: FormGroup;
  leadSubmitError: string | null = null;

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

  constructor(
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.leadForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^0\d{8,9}$/)]]
    });
  }

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

  /**
   * פתיחת הפופאפ לאיסוף פרטי הלקוח לפני מעבר לסליקה
   */
  onStartPayment(): void {
    this.leadSubmitError = null;
    this.leadForm.reset();
    this.isLeadModalOpen = true;
  }

  closeLeadModal(): void {
    this.isLeadModalOpen = false;
  }

  submitLead(): void {
    if (this.leadForm.invalid) {
      this.leadForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.leadSubmitError = null;
    const { firstName, lastName, email, phone } = this.leadForm.value;


    //TODO create the SQL function that insert the info into supa base in http post request 


    this.http.post(LEAD_SUBMIT_URL, this.leadForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.isLeadModalOpen = false;
       // alert('בשלב הבא נחבר את ה-API של משולם שיפתח את חלון הסליקה!');
      },
      error: () => {
        this.isLoading = false;
        this.leadSubmitError = 'אירעה שגיאה בשליחת הפרטים. נסו שוב.';
      }
    });
  }
}
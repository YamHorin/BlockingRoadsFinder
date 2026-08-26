import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';

/**
 * Bootstrap Process
 * תפקיד: הזנקת אפליקציית ה-Standalone מול ה-DOM בדפדפן.
 */
bootstrapApplication(AppComponent)
  .catch((err) => console.error('שגיאה בהזנקת אפליקציית Angular:', err));
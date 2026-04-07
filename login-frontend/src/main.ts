import { bootstrapApplication } from '@angular/platform-browser';
import { provideSweetAlert2 } from "@sweetalert2/ngx-sweetalert2"
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

provideSweetAlert2({
  provideSwal: () => import('sweetalert2'),
});

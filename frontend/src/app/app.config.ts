import { ApplicationConfig, importProvidersFrom  } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MarkdownModule } from 'ngx-markdown';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

// for font-awesome
export function initializeFaIcons(library: FaIconLibrary) {
  return () => {
    library.addIconPacks(fas, far);
  };
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(DragDropModule),
    importProvidersFrom(MarkdownModule.forRoot()),
    FontAwesomeModule,
    {
      provide: 'INIT_FA_ICONS',
      useFactory: initializeFaIcons,
      deps: [FaIconLibrary],
      multi: true
    }
  ]
};

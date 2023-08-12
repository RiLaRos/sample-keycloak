import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

function initializeKeycloak(keycloak: KeycloakService){
return () =>
  keycloak.init({
    config: {
      url:'http://localhost:8080/',
      realm: 'rilaros-dev',
      clientId: 'conecta-front-dev'
    },
    initOptions:{
      onLoad:'check-sso',
      flow: 'standard',
      silentCheckSsoRedirectUri: window.location.origin + '/assets/verify-sso.html'
    }
  });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps:[KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

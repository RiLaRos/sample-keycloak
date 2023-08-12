import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sample-keycloak';
  public isLogged = false;
  public userProfile: KeycloakProfile | null = null;

  constructor(private readonly keycloak : KeycloakService){

  }

  public async ngOnInit() {
    this.isLogged = await this.keycloak.isLoggedIn();
    type userRoles = Array<{id:number, text:string}>;

    if(this.isLogged){
      this.userProfile = await this.keycloak.loadUserProfile();
    }
  }

  public login(){
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }
}

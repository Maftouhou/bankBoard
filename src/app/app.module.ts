import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './guard/auth.guard';

// Componants
import { AppComponent } from './app.component';
import { HeaderComponent } from './Componants/header/header.component';
import { NavComponent } from './Componants/nav/nav.component';
import { FooterComponent } from './Componants/footer/footer.component';
import { InscriptionComponent } from './Componants/inscription/inscription.component';
import { ConnexionComponent } from './Componants/connexion/connexion.component';
import { MouvementComponent } from './Componants/mouvement/mouvement.component';
import { ParametreComponent } from './Componants/parametre/parametre.component';
import { ContactComponent } from './Componants/contact/contact.component';
import { HomeComponent } from './Componants/home/home.component';
import { BashboardComponent } from './Componants/bashboard/bashboard.component';
import { ProfileComponent } from './Componants/profile/profile.component';
import { DashboardComponent } from './Componants/dashboard/dashboard.component';

// Services
import {ValidateService} from './Services/validate.service';
import {AuthentificationService} from './Services/authentification.service';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'inscription', component: InscriptionComponent},
    {path: 'connexion', component: ConnexionComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]/**/}
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        NavComponent,
        FooterComponent,
        InscriptionComponent,
        ConnexionComponent,
        MouvementComponent,
        ParametreComponent,
        ContactComponent,
        HomeComponent,
        BashboardComponent,
        ProfileComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        FormsModule, 
        FlashMessagesModule,
        HttpModule
    ],
    providers: [ValidateService, AuthentificationService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }

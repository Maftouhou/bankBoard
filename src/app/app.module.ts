import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'inscription', component: InscriptionComponent},
    {path: 'connexion', component: ConnexionComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'profle', component: ProfileComponent}
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
        RouterModule.forRoot(appRoutes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

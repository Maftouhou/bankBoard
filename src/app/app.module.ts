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
import { ContactComponent } from './Componants/contact/contact.component';
import { HomeComponent } from './Componants/home/home.component';
import { ProfileComponent } from './Componants/profile/profile.component';
import { DashboardComponent } from './Componants/dashboard/dashboard.component';
import { HistoriqueMouvementComponent } from './Componants/historique-mouvement/historique-mouvement.component';
import { MessagingComponent } from './Componants/messaging/messaging.component';
import { QuiSommmeNousComponent } from './Componants/FooterInfo/qui-sommme-nous/qui-sommme-nous.component';
import { MentionLegalComponent } from './Componants/FooterInfo/mention-legal/mention-legal.component';

// Services
import {AuthentificationService} from './Services/authentification.service';
import {ValidateService} from './Services/validate.service';

const appRoutes: Routes = [
    /*Nav Links*/
    {path: '', component: HomeComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'mouvement', component: MouvementComponent, canActivate: [AuthGuard]},
    {path: 'historique_mouvement', component: HistoriqueMouvementComponent, canActivate: [AuthGuard]},
    {path: 'messaging', component: MessagingComponent, canActivate: [AuthGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    /*Home Links*/
    {path: 'inscription', component: InscriptionComponent},
    {path: 'connexion', component: ConnexionComponent},
    /*Footer Links*/
    {path: 'qui_sommes_nous', component: QuiSommmeNousComponent},
    {path: 'mention_legal', component: MentionLegalComponent},
    {path: 'contact_nous', component: ContactComponent}
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
        ContactComponent,
        HomeComponent,
        ProfileComponent,
        DashboardComponent,
        HistoriqueMouvementComponent,
        MessagingComponent,
        QuiSommmeNousComponent,
        MentionLegalComponent
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

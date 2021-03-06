import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from  '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import 'hammerjs';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { DishService } from './service/dish.service';
import { LeaderService} from './service/leader.service';
import { PromotionService} from './service/promotion.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { SigninComponent } from './signin/signin.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule, MatSlideToggleModule, MatProgressSpinnerModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { baseURL } from './shared/baseurl';
import { HighlightsDirective } from './directives/highlights.directive';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    SigninComponent,
    HighlightsDirective
  ],
  imports: [
    BrowserModule,
    MatSelectModule,
    HttpModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatSliderModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatListModule,
    AppRoutingModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [SigninComponent],
  providers: [ DishService,LeaderService,PromotionService, 
    {provide: 'BaseURL', useValue: baseURL}  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

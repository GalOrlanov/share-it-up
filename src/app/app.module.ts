import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import {UsersService} from './users.service';
import {AuthService } from './auth.service';
import {SocketService} from './socket.service';
import { FilterPipe }from './filter.pipe';
import { AppComponents, AppRoutes } from "./app.routing";
import { RegisterService } from './register.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { AddGroupComponent } from './components/add-group/add-group.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Ng2CloudinaryModule} from 'ng2-cloudinary';
import { AddMembersComponent } from './components/add-members/add-members.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { MembersComponent } from './members/members.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupComponent } from './group/group.component';
import { AddItemComponent } from './add-item/add-item.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatNativeDateModule, MatSliderModule, DateAdapter} from '@angular/material';
import { FriendsComponent } from './components/friends/friends.component';
import {MatTabsModule} from '@angular/material/tabs';
import { AddFriendsComponent } from './add-friends/add-friends.component';
import { FileUploadModule } from 'ng2-file-upload';
import { AuthGuard } from './auth.guard';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ItemCardComponent } from './item-card/item-card.component';
import { GraphsComponent } from './graphs/graphs.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { SplitComponent } from './split/split.component';
import { Ng5SliderModule } from 'ng5-slider';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { ForgetpasswortComponent } from './forgetpasswort/forgetpasswort.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ToolTipComponent } from './tool-tip/tool-tip.component';
import { DebugComponent } from './debug/debug.component';
import { AppBarComponent } from './app-bar/app-bar.component';
import { FriendCardComponent } from './friend-card/friend-card.component';
import { SettleUpCardComponent } from './settle-up-card/settle-up-card.component';
import { MobileDrawerComponent } from './mobile-drawer/mobile-drawer.component';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppComponents,
    RegisterComponent,
    ProfileComponent,
    FilterPipe,
    ProfileDetailsComponent,
    AddGroupComponent,
    TextFieldComponent,
    AddMembersComponent,
    NotificationComponent,
    ProductCardComponent,
    GroupDetailsComponent,
    MembersComponent,
    GroupsComponent,
    GroupComponent,
    AddItemComponent,
    SpinnerComponent,
    FriendsComponent,
    AddFriendsComponent,
    ItemCardComponent,
    GraphsComponent,
    SplitComponent,
    ForgetpasswortComponent,
    ToolTipComponent,
    DebugComponent,
    AppBarComponent,
    FriendCardComponent,
    SettleUpCardComponent,
    MobileDrawerComponent
    
  ],
  imports: [
    FileUploadModule,
    NgbModule,
    MatDialogModule,
    BrowserModule,
    MatSelectModule,
    Ng5SliderModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(AppRoutes),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    Ng2CloudinaryModule,
    GoogleChartsModule.forRoot(),
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
     
  
  ],
  providers: [UsersService,RegisterService,SocketService,NotificationComponent,  MatDatepickerModule,AuthGuard ,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

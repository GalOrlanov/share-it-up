import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GroupComponent } from './group/group.component';
import { FriendsComponent } from './components/friends/friends.component';
import {DebugComponent} from './debug/debug.component';
import {AuthGuard} from './auth.guard'
import { GraphsComponent } from './graphs/graphs.component';
import { DataServiceService } from './data-service.service';
import { StartPageComponent } from './start-page/start-page.component';
 
class appRouting {
    constructor(public dataService:DataServiceService){
      
    }

    
}




export const AppRoutes: any = [
    { path: "",component:StartPageComponent},
    { path: "register", component: RegisterComponent},
    { path: "friends", component: FriendsComponent,canActivate: [AuthGuard]},
    { path: "login", component:LoginComponent },
    { path: "profile", component: ProfileComponent},
    { path: "group", component: GroupComponent,canActivate: [AuthGuard] },
    { path: "graphs", component: GraphsComponent,canActivate: [AuthGuard] },
    {path: "debug",component: DebugComponent}
    
   
];

export const AppComponents: any = [
    RegisterComponent,
    LoginComponent,
];
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GroupComponent } from './group/group.component';
import { FriendsComponent } from './components/friends/friends.component';
import { DebugComponent } from './debug/debug.component';
import { AuthGuard } from './auth.guard';
import { GraphsComponent } from './graphs/graphs.component';
class appRouting {
    constructor(dataService) {
        this.dataService = dataService;
    }
}
export const AppRoutes = [
    { path: "", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "friends", component: FriendsComponent },
    { path: "login", component: LoginComponent },
    { path: "profile", component: ProfileComponent },
    { path: "group", component: GroupComponent },
    { path: "graphs", component: GraphsComponent, canActivate: [AuthGuard] },
    { path: "debug", component: DebugComponent }
];
export const AppComponents = [
    RegisterComponent,
    LoginComponent,
    ProfileComponent
];
//# sourceMappingURL=app.routing.js.map
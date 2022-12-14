import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { NamingComponent } from "./pages/naming/naming-component";

const routes: Route[] = [
  { path: '', component: NamingComponent},
  {
    path: 'naming',
    loadChildren: () => import('./pages/naming/naming.module').then(m => m.NamingModule),
  },
  { path: '*', redirectTo: '' },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {

}

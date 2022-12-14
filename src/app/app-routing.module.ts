import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { NamingComponent } from "./pages/naming/naming-component";

const routes: Route[] = [
  {
    path: 'naming',
    loadChildren: () => import('./pages/naming/naming.module').then(m => m.NamingModule),
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule),
  },
  { path: '', redirectTo: 'naming', pathMatch: 'full' },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found-page/not-found-page.module').then(m => m.NotFoundPageModule),
  },
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

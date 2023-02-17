import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";

const routes: Route[] = [
  {
    path: 'naming',
    loadChildren: () => import('./pages/naming/naming.module').then(m => m.NamingModule),
  },
  {
    path: 'custom',
    loadChildren: () => import('./pages/custom/custom.module').then(m => m.CustomModule),
  },
  {
    path: 'numbers',
    loadChildren: () => import('./pages/numbers/numbers.module').then(m => m.NumbersModule),
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule),
  },
  { path: 'saved/:title',
    loadChildren: () => import('./pages/saved-list/saved-list.module').then(m => m.SavedListModule),
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

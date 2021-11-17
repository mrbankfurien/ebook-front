import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { RouteGuard } from './services/route-guard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[RouteGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate:[RouteGuard]
  },
  {
    path: 'restort',
    loadChildren: () => import('./restort/restort.module').then( m => m.RestortPageModule),
    canActivate:[RouteGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'edit-note',
    loadChildren: () => import('./edit-note/edit-note.module').then( m => m.EditNotePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'update-note/:id',
    loadChildren: () => import('./update-note/update-note.module').then( m => m.UpdateNotePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    canActivate:[RouteGuard]
  },
  {
    path: 'default',
    loadChildren: () => import('./default/default.module').then( m => m.DefaultPageModule)
  },
  {
    path: 'actuality-home',
    loadChildren: () => import('./actuality-home/actuality-home.module').then( m => m.ActualityHomePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'comment-poster/:id',
    loadChildren: () => import('./comment-poster/comment-poster.module').then( m => m.CommentPosterPageModule),
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule] ,
  providers : [AuthGuard,RouteGuard]
})
export class AppRoutingModule { }

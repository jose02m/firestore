import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'song/create',
    loadChildren: () => import('./pages/song/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'song/detail/:id',
    loadChildren: () => import('./pages/song/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'update/:id',
    loadChildren: () => import('./pages/song/update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'song/list',
    loadChildren: () => import('./pages/song/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'artist/list',
    loadChildren: () => import('./pages/singers/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'recording/create',
    loadChildren: () => import('./pages/recording/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'recording/list',
    loadChildren: () => import('./pages/recording/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'recording/detail/:id',
    loadChildren: () => import('./pages/recording/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'recording/update/:id',
    loadChildren: () => import('./pages/recording/update/update.module').then( m => m.UpdatePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

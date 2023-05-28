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
    path: 'list',
    loadChildren: () => import('./pages/singers/list/list.module').then( m => m.ListPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

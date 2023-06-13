import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'input', data: { breadcrumb: 'Input' }, loadChildren: () => import('./input/inputdemo.module').then(m => m.InputDemoModule) },
        { path: 'newHireScheduler', data: { breadcrumb: 'NewHireScheduler' }, loadChildren: () => import('./newHireScheduler/newHireScheduler.module').then(m => m.NewHireSchedulerModule) },
        { path: 'invalidstate', data: { breadcrumb: 'Invalid State' }, loadChildren: () => import('./invalid/invalidstatedemo.module').then(m => m.InvalidStateDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UIkitRoutingModule { }

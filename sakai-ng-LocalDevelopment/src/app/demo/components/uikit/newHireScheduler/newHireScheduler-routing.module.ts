import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewHireSchedulerComponent } from './newHireScheduler.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: NewHireSchedulerComponent }
	])],
	exports: [RouterModule]
})
export class NewHireSchedulerRoutingModule { }

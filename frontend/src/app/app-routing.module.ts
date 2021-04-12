import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { VideodetailsComponent } from './components/videodetails/videodetails.component'
const routes: Routes = [
{path:'',component:ListComponent},
{path:'videodetail/:videoURL', component:VideodetailsComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

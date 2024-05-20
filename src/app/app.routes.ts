import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FrameworkComponent } from './framework/framework.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CoursesComponent } from './courses/courses.component';

export const routes: Routes = [
    {path: "home", component: HomeComponent },
    {path: "courses", component: CoursesComponent},
    {path: "framework", component: FrameworkComponent},
    {path: "", redirectTo: "/home", pathMatch: "full"},
    {path: "404", component: NotFoundComponent},
    {path:"**", component: NotFoundComponent} //plockar upp allt annat och re-route till 404-sidan
];

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FrameworkComponent } from './framework/framework.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CoursesComponent } from './courses/courses.component';

export const routes: Routes = [
    {path: "home", component: HomeComponent, title: "Skanderna Universitet"},
    {path: "courses", component: CoursesComponent, title: "Kurser"},
    {path: "framework", component: FrameworkComponent, title: "Mitt Ramschema"},
    {path: "", redirectTo: "/home", pathMatch: "full"},
    {path: "404", component: NotFoundComponent, title: "404 - error"},
    {path:"**", component: NotFoundComponent} //plockar upp allt annat och re-route till 404-sidan
];

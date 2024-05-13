import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class AllCoursesService {

  url: string = "https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json"

  constructor(private http: HttpClient) { }

  //metod för att hämta kurserna
  getCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(this.url);
  }
}

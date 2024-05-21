import { Injectable } from '@angular/core';
import { CourseItem } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class FrameworkService {

  private storageKey = 'savedCourses'; //nyckel för att spara kurser

  constructor() { }

  // Lägg till en kurs till localStorage
  addCourse(course: CourseItem): void {
    const courses = this.getCourses();  //hämta de befintliga kurserna från localstorage
    courses.push(course);  //Lägger till ny kurs
    localStorage.setItem(this.storageKey, JSON.stringify(courses));  //sparar den uppdaterade listan till localstorage
  }

  // Hämta alla sparade kurser från localStorage
  getCourses(): CourseItem[] {
    const savedCourses = localStorage.getItem(this.storageKey);   //hämta från localstorage
    return savedCourses ? JSON.parse(savedCourses) : [];  //om det finns sparade kurser, returnera som en array, annars en tom array
  }


  //ta bort en kurs från localstorage
  removeCourse(course: CourseItem): void {
    let courses = this.getCourses(); 
    // Filtrera bort kursen som ska tas bort
    courses = courses.filter(c => c.courseCode !== course.courseCode);
    // Spara den uppdaterade listan tillbaka till localStorage
    localStorage.setItem(this.storageKey, JSON.stringify(courses));
  }

}

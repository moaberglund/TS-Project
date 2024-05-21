import { Component, OnInit } from '@angular/core';
import { CourseItem } from '../models/course';
import { FrameworkService } from '../services/framework.service';

@Component({
  selector: 'app-framework',
  standalone: true,
  imports: [],
  templateUrl: './framework.component.html',
  styleUrl: './framework.component.scss'
})
export class FrameworkComponent implements OnInit {

  savedCourses: CourseItem[] = [];

  constructor(private frameworkService: FrameworkService) { }

  ngOnInit(): void {
    this.loadSavedCourses();
  }

  loadSavedCourses(): void {
    this.savedCourses = this.frameworkService.getCourses();
  }

  onRemove(course: CourseItem): void {
    this.frameworkService.removeCourse(course);
    this.loadSavedCourses(); // Uppdatera listan efter borttagning
  }

}

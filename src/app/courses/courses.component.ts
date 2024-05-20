import { Component } from '@angular/core';
import { CourseTableComponent } from '../course-table/course-table.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CourseTableComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

}

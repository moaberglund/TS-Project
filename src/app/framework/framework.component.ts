import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CourseItem } from '../models/course';
import { FrameworkService } from '../services/framework.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-framework',
  standalone: true,
  imports: [MatTableModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatIconModule, 
    MatPaginatorModule, 
    MatSortModule],
  templateUrl: './framework.component.html',
  styleUrl: './framework.component.scss'
})
export class FrameworkComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ["courseCode", "courseName", "points", "subject", "syllabus", "remove"];

  savedCourses = new MatTableDataSource<CourseItem>(); // Lägg till ? för att markera att den kan vara undefined

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private frameworkService: FrameworkService) { }

  ngOnInit(): void {
    this.loadSavedCourses();
  }

  ngAfterViewInit() {
    this.savedCourses.paginator = this.paginator;
    this.savedCourses.sort = this.sort;
  }

  loadSavedCourses(): void {
    const courses = this.frameworkService.getCourses();
    this.savedCourses.data = courses;
  }

  onRemove(course: CourseItem): void {
    this.frameworkService.removeCourse(course);
    this.loadSavedCourses(); // Uppdatera listan efter borttagning
  }

}

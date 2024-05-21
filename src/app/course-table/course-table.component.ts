import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { CourseItem } from '../models/course';
import { AllCoursesService } from '../services/all-courses.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FrameworkService } from '../services/framework.service';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrl: './course-table.component.scss',
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule]
})
export class CourseTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CourseItem>;

  dataSource: MatTableDataSource<CourseItem> = new MatTableDataSource<CourseItem>;  // Declare dataSource without initialization

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["courseCode", "courseName", "points", "subject", "syllabus", "add"];
  subjects: string[] = []; // Lista över ämnen
  selectedSubject: string = ''; // Lägg till selectedSubject
  filterValue: string = ''; // Lägg till filterValue

  constructor(private allCoursesService: AllCoursesService, private frameworkService: FrameworkService) { } // Inject AllCoursesService

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadData(); // Load data after view initialization
  }

  //Hämtar data från API:et
  private loadData(): void {
    this.allCoursesService.getCourses().subscribe(
      (data: CourseItem[]) => {
        this.dataSource.data = data;
        this.subjects = this.getUniqueSubjects(data); // Hämta unika ämnen
        if (this.paginator) {
          this.paginator.length = data.length;
        }
      },
      error => {
        console.error("Error fetching data from API", error);
      });

  }

  //Använder filtreringsvärdet från sökfältet
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.updateFilter();
  }

  //Använder filtreringsvärdet från ämnesväljaren
  applySubjectFilter() {
    this.updateFilter();
  }

  //välja ett ämne
  private getUniqueSubjects(data: CourseItem[]): string[] {
    const subjectsSet = new Set<string>();
    data.forEach(course => subjectsSet.add(course.subject.toString()));
    return Array.from(subjectsSet);
  }

  //Uppdaterar filtreringen baserat på sökord och valt ämne
  updateFilter() {
    this.dataSource.filterPredicate = (data: CourseItem, filter: string) => {
      const searchTerm = this.filterValue.toLowerCase();
      const subjectTerm = this.selectedSubject.toLowerCase();

      const matchesFilter = data.courseName.toLowerCase().includes(searchTerm) ||
        data.courseCode.toLowerCase().includes(searchTerm) ||
        data.subject.toLowerCase().includes(searchTerm) ||
        data.points.toString().includes(searchTerm);

      const matchesSubject = !subjectTerm || data.subject.toLowerCase() === subjectTerm;

      return matchesFilter && matchesSubject;
    };
    this.dataSource.filter = this.filterValue + this.selectedSubject; // Trigga omvärdering av filter
  }

//Lägga till kurs till localstorage
  onAdd(row: CourseItem) {
    this.frameworkService.addCourse(row);
    console.log('Course added to local storage:', row);

  }
//Ta bort kurs från 
  onRemove(row: CourseItem) {
    this.frameworkService.removeCourse(row);
    console.log('Course removed from local storage:', row);
  }


}

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { CourseItem } from '../models/course';
import { AllCoursesService } from '../services/all-courses.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrl: './course-table.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule]
})
export class CourseTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CourseItem>;

  dataSource: MatTableDataSource<CourseItem> = new MatTableDataSource<CourseItem>;  // Declare dataSource without initialization

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["courseCode", "courseName", "points", "subject", "syllabus"];

  constructor(private allCoursesService: AllCoursesService) { } // Inject AllCoursesService

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadData(); // Load data after view initialization
  }

  private loadData(): void {
    this.allCoursesService.getCourses().subscribe(
      (data: CourseItem[]) => {
        this.dataSource.data = data;
        if (this.paginator) {
          this.paginator.length = data.length;
        }
      },
      error => {
        console.error("Error fetching data from API", error);
      });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.paginator.firstPage(); // Återställ pagineringen till första sidan
  }

}

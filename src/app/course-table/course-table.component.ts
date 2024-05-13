import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { CourseTableDataSource } from './course-table-datasource';
import { CourseItem } from '../models/course';
import { AllCoursesService } from '../services/all-courses.service';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrl: './course-table.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule]
})
export class CourseTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CourseItem>;

  dataSource!: CourseTableDataSource;  // Declare dataSource without initialization

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["courseCode", "courseName", "points", "subject", "syllabus"];

  constructor(private allCoursesService: AllCoursesService) {} // Inject AllCoursesService

  ngAfterViewInit(): void {
    this.dataSource = new CourseTableDataSource(this.allCoursesService); // Pass AllCoursesService to the constructor
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.dataSource.loadData(); // Load data after view initialization
  }
}

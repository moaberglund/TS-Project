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
import { MatSnackBar } from '@angular/material/snack-bar';

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
  @ViewChild(MatPaginator) paginator!: MatPaginator;  //hämtar paginator från vyn
  @ViewChild(MatSort) sort!: MatSort;   //hämtar sorteringsfunktionen
  @ViewChild(MatTable) table!: MatTable<CourseItem>;  // hämtar tabellen

  dataSource: MatTableDataSource<CourseItem> = new MatTableDataSource<CourseItem>;  // Deklarerar dataSource utan initiering

  // Kolumner som visas i tabellen
  displayedColumns = ["courseCode", "courseName", "points", "subject", "syllabus", "add"];

  subjects: string[] = []; // Lista över ämnen
  selectedSubject: string = ''; // valt ämne
  filterValue: string = ''; // Värde för sökfilter

  //konstruktorn initierar tjänsterna
  constructor(private allCoursesService: AllCoursesService,
    private frameworkService: FrameworkService,
    private snackBar: MatSnackBar) { }

  //efter att vyn har initierats
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;  //sätter paginator för datasource
    this.dataSource.sort = this.sort;   //sätter sorteringsfunktion för datasource
    this.loadData(); // Laddar data efter initiering av vyn
  }

  //Hämtar data från API:et
  private loadData(): void {
    this.allCoursesService.getCourses().subscribe(
      (data: CourseItem[]) => {
        this.dataSource.data = data;   //sätter data till datasourse
        this.subjects = this.getUniqueSubjects(data); // Hämta unika ämnen
        if (this.paginator) {
          this.paginator.length = data.length;  //sätter total längd för paginering
        }
      },
      error => {
        console.error("Error fetching data from API", error);  //hanterar fel vid hämtning av data
      });

  }

  //Använder filtreringsvärdet från sökfältet
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();  //sätter filtervärde
    this.updateFilter();  //uppdaterar filter
  }

  //Använder filtreringsvärdet från ämnesväljaren
  applySubjectFilter() {
    this.updateFilter();  //uppdaterar filter
  }

  //välja ett ämne
  //Hämtar unika ämnen från datan
  private getUniqueSubjects(data: CourseItem[]): string[] {
    const subjectsSet = new Set<string>();
    data.forEach(course => subjectsSet.add(course.subject.toString()));  // Lägg till ämnen i set
    return Array.from(subjectsSet);  // Konverterar set till array
  }

  //Uppdaterar filtreringen baserat på sökord och valt ämne
  updateFilter() {
    this.dataSource.filterPredicate = (data: CourseItem, filter: string) => {
      const searchTerm = this.filterValue.toLowerCase();
      const subjectTerm = this.selectedSubject.toLowerCase();


      // Kontrollera om data matchar sökordet
      const matchesFilter = data.courseName.toLowerCase().includes(searchTerm) ||
        data.courseCode.toLowerCase().includes(searchTerm) ||
        data.subject.toLowerCase().includes(searchTerm) ||
        data.points.toString().includes(searchTerm);

      // Kontrollera om data matchar valt ämne
      const matchesSubject = !subjectTerm || data.subject.toLowerCase() === subjectTerm;

      return matchesFilter && matchesSubject;
    };
    this.dataSource.filter = this.filterValue + this.selectedSubject; // Trigga omvärdering av filter
  }

  // funktion för snackbar (bar som ploppar upp längst ner)
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Tiden för hur länge snackbar ska visas (ms)
    });
  }


  //Lägga till kurs till localstorage
  onAdd(row: CourseItem) {
    this.frameworkService.addCourse(row); // Lägg till kurs i local storage
    this.openSnackBar('Kursen har lagts till', 'Stäng'); // Visa bekräftelse
  }

  //Ta bort kurs från localstorage
  onRemove(row: CourseItem) {
    this.frameworkService.removeCourse(row);
    this.openSnackBar('Kursen har tagits bort', 'Stäng');
  }
}

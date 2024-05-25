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
import { MatSnackBar } from '@angular/material/snack-bar';

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
  displayedColumns: string[] = ["courseCode", "courseName", "points", "subject", "syllabus", "remove"];  // Kolumner som visas i tabellen

  savedCourses = new MatTableDataSource<CourseItem>(); // Skapar en ny MatTableDataSource för att hantera kursdata

  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Referens till MatPaginator i vyn
  @ViewChild(MatSort) sort!: MatSort;  // Referens till MatSort

  constructor(
    private frameworkService: FrameworkService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadSavedCourses();  // Laddar sparade kurser vid initiering
    this.calculateTotalPoints();  // Beräknar totala poäng vid initiering
  }

  ngAfterViewInit() {
    this.savedCourses.paginator = this.paginator;  // Sätter paginator för tabellen
    this.savedCourses.sort = this.sort;   // Sätter sortering för tabellen
  }

  // Laddar sparade kurser från tjänsten
  loadSavedCourses(): void {
    const courses = this.frameworkService.getCourses();
    this.savedCourses.data = courses;   // Sätter data för tabellen
  }

  // funktion för snackbar (bar som ploppar upp längst ner)
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Tiden för hur länge snackbar ska visas (ms)
    });
  }

  // Tar bort en kurs och uppdaterar tabellen
  onRemove(course: CourseItem): void {
    this.frameworkService.removeCourse(course); // Tar bort kursen från tjänsten
    this.loadSavedCourses(); // Uppdatera listan efter borttagning
    this.openSnackBar('Kursen har tagits bort', 'Stäng');  // Visar bekräftelse - snackbar pop-up
    this.calculateTotalPoints(); //uppdatera uträkning av tot poäng
  }

  //Räkna ut antal poäng man har i sitt ramschema

  totalPoints: number = 0;  // Variabel för att hålla totala poäng

  calculateTotalPoints(): void {
    this.totalPoints = this.frameworkService.getTotalPoints();  // Hämtar totala poäng från tjänsten
  }

}

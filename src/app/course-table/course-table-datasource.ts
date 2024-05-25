import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { CourseItem } from '../models/course';
import { AllCoursesService } from '../services/all-courses.service';


/**
 * Datasource för CourseTable-vyn. Denna klass ska 
 * kapsla in all logik för hämtning och hantering av data som visas
 * (inklusive sortering, paginering och filtrering).
 */
export class CourseTableDataSource extends DataSource<CourseItem> {
  // Array för att hålla datan
  data: CourseItem[] = [];
  // Paginator och sort, dessa tilldelas utanför klassen
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  // Flagga för att indikera om data laddas
  isLoading: boolean = false;

   // Konstruktor som injicerar en tjänst för att hämta all kursdata
  constructor(private allCoursesService: AllCoursesService) {
    super();
  }

/**
   * Anslut denna datasource till tabellen. Tabellen uppdateras endast när
   * den returnerade strömmen emitterar nya objekt.
   * @returns En ström av objekt som ska renderas.
   */
  connect(): Observable<CourseItem[]> {
    if (this.paginator && this.sort) {
      // Kombinera allt som påverkar den renderade datan till en uppdateringsström
      // för datatabellen att konsumera.
      return merge(this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          // Paginera och sortera datan när en händelse inträffar
          return this.getPagedData(this.getSortedData([...this.data]));
        }),
        catchError(() => observableOf([])), // Hanterar fel
        finalize(() => this.isLoading = false) // Slutför förfrågan
      );
    } else {
      // Kasta ett fel om paginator eller sort inte är satt
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   * Kallas när tabellen förstörs. Använd denna funktion för att städa upp
   * eventuella öppna anslutningar eller frigöra resurser som användes under connect.
   */
  disconnect(): void { }

  
   // Paginerar datan
  
  private getPagedData(data: CourseItem[]): CourseItem[] {
    if (this.paginator) {
       // Beräkna startindex baserat på aktuell sidindex och sidstorlek
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
       // Returnera en del av arrayen baserat på paginering
      return data.splice(startIndex, startIndex + this.paginator.pageSize);
    } else {
      // Returnera data om paginator inte är satt
      return data;
    }
  }

  
  // Sorterar datan
  
  private getSortedData(data: CourseItem[]): CourseItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      // Returnera data osorterad om sort inte är satt
      return data;
    }

    return data.sort((a, b) => {
      // Kontrollera om sorteringsriktningen är stigande
      const isAsc = this.sort?.direction === 'asc';
      // Sortera baserat på den aktiva sorteringskolumnen
      switch (this.sort?.active) {
        case 'code': return compare(+a.courseCode, +b.courseCode, isAsc);
        case 'name': return compare(+a.courseName, +b.courseName, isAsc);
        case 'points': return compare(+a.points, +b.points, isAsc);
        case 'subject': return compare(+a.subject, +b.subject, isAsc);

        default: return 0;
      }
    });
  }

}


// Enkel sorteringsfunktion för kolumner
// a Första värdet att jämföra
// b Andra värdet att jämföra
// isAsc Om sorteringen är stigande
// returnerar jämförelseresultatet
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

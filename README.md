# Slutprojekt i TypeScript || Moa Berglund

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.5.

## Projektet

Detta är en Angular applikation som hämtar data från ett API som innehåller universitetskurser i JSON format. 
Webbplatsen syboliserar ett fiktivt lärosäte där studenter kan söka bland kurser och skapa ett ramschema.

Applikationen använder sig av TypeScript, SCSS och HTML för uppbyggnad och har till stor del tagit hjälp av Angular Material. 
Den består av tre undersidor:
* Startsida
* Kurser
* Ramschema

## Struktur
Applikationen har komponenter för varje undersida, samt en för navigation, en för footern, en för route not found och en speciel komponent för hanteringen av kursdatan som innehåller en datasource fil.


Det skapades även ett `interface` för hantering av datan i API:et med följande struktur:
```
export interface CourseItem {
    courseCode: String,
    subjectCode: String,
    level: String,
    progression: String,
    courseName:String,
    points: Number,
    institutionCode: String,
    subject: String,
    syllabus: String
  
}
```

Det finns en servicefil med observable HttpClient för hantering av kurser.
En servicefil för hantering av localstorage som används för lagring av användarens personliga ramschema.

## Funktionallitet
Kurserna kan  __sorteras__ i stigande och fallande ordning i alla kolumner. Det går även att __filtrera__ ut kurser efter ett visst ämne med hjälp av en select. Och det går att __söka__ efter kurser som matchar önskade kriterier. Alla dessa egenskaper går även att kombinera med varanndra för bäst sökresultat.

Användaren kan även lägga till önskade kurser till ett persoligt ramschema och på sidan för ramschemat senare ta bort kurser när de ej är av intresse längre. Ramschemat visar även det totala antalet poäng för användarens sparade kurser.

Båda sidor använder sig även av paginering samt räknar antalet resultat av data som läses ut till sidan.

En snackbar ger även användaren en notifikation när en kurs lägges till eller tas bort.

## Media
Bilder på webbplatsen har hämtats från Pixabay som är en sida som tillhandahåller fri stockmedia.
Ikon är hämtad från Canvas gratis bibliotek.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


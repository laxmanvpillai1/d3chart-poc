import { Component } from '@angular/core';
import { CsvReadService } from './shared/services/csv-read.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';


  examples = [
    {
        title: 'Line Chart',
        route: 'chart'
    }
];

  constructor(){}
}

import { Injectable } from '@angular/core';
import { WeatherData } from '../models/weather-data-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvReadService {

  private csvFile:any;

  constructor() { }

  convertFile(csv:any):any{
    this.csvFile = csv.target.files[0];
    let weatherData: Array<WeatherData> = [];
    let reader:FileReader = new FileReader();
    reader.readAsText(this.csvFile);
    reader.onload = (e) => {
      let csv: string = reader.result;  
      let allTextLines = csv.split(/\r|\n|\r/);  
      let headers = allTextLines[0].split(',');  
      let lines = [];  
      
      allTextLines.forEach(line => {
        let lineData = line.split(',');
        let data:WeatherData = new WeatherData(lineData[0],lineData[2]);
        weatherData.push(data);
      });
      weatherData = weatherData.filter(data=>data.date !== 'date');
      console.log("Exited Service");
      return weatherData;
    
    }

    
    }

    convertFileAsync(csv:any):Observable<any>{
      return new Observable((observer)=>{
        observer.next(this.convertFile(csv))
      
      });

  }
}

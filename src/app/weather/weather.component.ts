import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

lat: number;
lng: number;
weather: string;
location: string;
temp: number;
celcius: string ;
searching: boolean = false;
searchComplete: boolean = false;
searchQuery: string;
icons: string;

  constructor(private weatherService: WeatherService) {
      console.log('Weather service connected..');
   }

   weatherIcon(icon) {
     switch (icon) {
       case 'clear-day':
         return 'wi wi-day-sunny'
       case 'fog':
         return 'wi wi-day-fog'
       case 'rain':
         return 'wi wi-day-rain'
       case 'snow':
         return 'wi wi-day-snow'
       default:
         return `wi wi-day-sunny`
     }
   }

   handleData(data) {
     console.log(data.results[0]);
     this.location = data.results[0].formatted_address;
     this.lat = data.results[0].geometry.location.lat ;
     this.lng = data.results[0].geometry.location.lng ;
     this.weatherService.getWeather(this.lat, this.lng).subscribe((weather) => {
       this.weather = weather.daily.summary ;
       this.icons = this.weatherIcon(weather.daily.icon); //add icons
       this.temp = (weather.currently.apparentTemperature - 32) * (5/9) ;
       this.celcius = '°C' ;
       this.searching = false ;
       console.log(weather);
     });
   }

   searchLocation(query: string) {
     this.searching = true
     return this.weatherService.getLocation(query).subscribe(
       data => this.handleData(data),
       () => this.searching = false
     )
   }

  ngOnInit() {
  }

}

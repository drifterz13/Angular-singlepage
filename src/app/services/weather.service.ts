import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {
  private query: string;
  private API_URL: string = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  private API_KEY: string = ',+CA&key=AIzaSyAy93NWOYFZHzDbpzHnhKFBcXSiD1t4QAQ';
  private lat: number ;
  private lng: number ;
  private CORS: string = 'https://cors-anywhere.herokuapp.com/'
  // private CORS: string = 'http://128.199.156.75:8000/'


  private W_URL: string = 'https://api.darksky.net/forecast/2491ca19d9531689f0fe8c36ab73186a/';

  constructor(private http:Http) {
      console.log('Constructor http is running..');
   }

   getLocation(query){
     return this.http.get(this.API_URL + query + this.API_KEY)
     .map(res => res.json());
   }

   getWeather(lat,lng) {
     return this.http.get(this.CORS + this.W_URL + lat + ',' + lng)
     .map(res => res.json());
   }

}

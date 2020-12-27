import { EventEmitterService } from './../../../../shared/service/event-emitter.service';
import { WeatherService } from './../../services/weather.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weather-list-days',
  templateUrl: './weather-list-days.component.html',
  styleUrls: ['./weather-list-days.component.scss']
})
export class WeatherListDaysComponent implements OnInit {
  private _listDays: any = [];
  private _city: any = [];
  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
   }

  ngOnInit() {
    this.init();
  }

  get listDays() {
    return this._listDays;
  }

  get city() {
    return this._city
  }

  public init(){
    this.route.params.subscribe( parametros => {
      if (parametros['id']) {
        console.log(parametros.id)
        console.log()
        if(typeof parametros.id != 'undefined'){
          this.sharedNextDays(parametros.id)
        }else{
          console.log('informado nao foi incontrado')
        }
      }
    });
  }


  public sharedNextDays(i){
    this.weatherService.sharedCityNextDays(i).subscribe((res) =>{
      this._listDays = res.list;
      this._city     = res.city;
    },(error: Error) =>{
      console.log(error);
    })
  }


  public urlContry(i) {
    const lowcase = i.toLowerCase()
    return `http://openweathermap.org/images/flags/${lowcase}.png`
  }

  public urlTemp(i) {
    return `https://openweathermap.org/img/w/${i}.png`
  }

  public formatData(aux) {
    let data = new Date(aux*1000)
    return this.datePipe.transform(data, 'DD-MMM-YYYY HH:mm:ss')
  }

}

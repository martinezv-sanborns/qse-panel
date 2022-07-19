import { Pipe, PipeTransform } from '@angular/core';
import { id } from 'date-fns/locale';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date ) : string {
    let resultado='';
    const today =  new Date(); //La hora actual
    const fechaAlta:Date = new Date(value);
    let delta = (today.getTime() - fechaAlta.getTime())/1000;
    
/*     console.log('FechaAlta', fechaAlta );
    console.log('FechaActual', today ); */

    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    const seconds = delta % 60

    if (days>0 ){
      //Se expresa en dias 
      resultado = 'Hace ' +   days.toString() +  ' días...'  
    }
    else {
      if( hours>0){
      //Se expresa en horas 
      resultado = 'Hace ' +   hours.toString() +  ' horas...'  
      }
      else{
          if(minutes>0)  {
            //Se expresa en minutos
            resultado = 'Hace ' +   hours.toString() +  ' minutos...'  
          }
          else {
            //Se expresa en minutos
            resultado = 'Hace unos instantes...'  
          }
      }

    }
 

    /* if (minutes===0){resultado ='Hace unos instantes...'  }
    if (minutes<60){resultado ='Hace unos instantes...'  }
    else if (minutes>=60 && minutes<= 1440 ){
      //ya hay por lo menos una hora...
      const hours = Math.abs(endDate. - today) / (1000 * 60 * 60) % 24;
      resultado = 'hace ' +   hours.toString() +  'horas...'  
    }
    else if (minutes>=60 && minutes> 1440 ){
      //ya hay por lo menos una dia...
      const days = (endDate - today) / (1000 * 60 * 60 * 24);

      resultado = 'hace ' +   days.toString() +  'días...'  
    } */

    return resultado;
  }

}

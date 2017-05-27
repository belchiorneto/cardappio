import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
 
/*
Optei por usar a versão js do google (Google maps javascript SDK), nesse caso, o objeto mapa é carregado via api na página idenx.html
usei o seguinte tutorial: 
https://www.joshmorony.com/integrating-google-maps-with-an-ionic-application/
esta variável abaixo, é meio mágica, ela é necessária para chamar a classe principal "new google.maps ..."
*/
declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  /* 
  diferente do api nativo, aqui precisamos instanciar assim o objeto onde o mapa vai ser carregado,
  essa div está no home.html
  */
  @ViewChild('map') mapElement: ElementRef;
  
  map: any;         // para receber o mapa
  latUsuario: any;  // para receber a posição do usuário (latitude)
  lngUsuario: any;  // para receber a posição do usuário (longitude)

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public http: Http) {
  }
  /*
    espera pelo ionic para iniciar o carregamento do mapa
  */
  ionViewDidLoad(){
    this.loadMap();
  }
  
  /* =============================================
          funções relacionadas ao mapa
  =============================================*/
  // TODO: colocar opção de carregar o mapa apenas se houver conexão com internet
  loadMap(){
    // TODO: tem que ver o caso em que a posição não foi encontrada
    this.geolocation.getCurrentPosition().then((position) => {
      this.latUsuario = position.coords.latitude;
      this.lngUsuario = position.coords.longitude;
      let latLng = new google.maps.LatLng(this.latUsuario, this.lngUsuario);
      let mapOptions = {
        center: latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.carregaEstabelecimentos();
    }, (err) => {
      console.log(err);
    });
    
 
  }

addMarker(lat, lng, desc, dist){
  
  let latLng = new google.maps.LatLng(lat, lng);
  let marker = new google.maps.Marker({
    map: this.map,
    icon: 'assets/icon/cardappio.png',
    animation: google.maps.Animation.DROP,
    position: latLng
  });
 
 /*
  ver uma forma de usar template para o infowindow depois
  */
  let content = "<div id=\"infowindow\"><h3>" + desc + "<br></h3>À " + dist + " metros<div id=\"ifowindowsbuttons\"><img src=\"assets/icon/cardappio.png\"></div></div>";          
  this.addInfoWindow(marker, content);
}
addInfoWindow(marker, content){
 
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
  if (infoWindow) {
      infoWindow.close();
  }
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
  
 
}

/* =============================================
          funções relacionadas ao websevice
  =============================================*/
//TODO: função para reconhecer cliques dentro do infowindow, para por exemplo carregar a rota
carregaEstabelecimentos(){
    // aqui estou carregando os restaurando a mais ou menos 500 metros de distância do local atual (quando não forem carregados os dados locais)
    let raio = 500; // TODO: fazer com que seja dinâmico, ou seja, quando o zoom do mapa for alterado, o raio também deve ser alterado
      /*
      No momento a url online só funciona no celular, na versão web, usar os dados offline (proximos do pici)
      na versão final, será usado webservice proprio (provavelmente firebase), então estas requisições provavelmente
      serão enviadas para uma classe separada
      */
      //let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + this.latUsuario +","+this.lngUsuario + "&radius="+ raio +"&type=restaurant&key=AIzaSyDLLDf1LsT8QVU1YHTER1fc7RCAarqVmVI";
      // local
      let url = "assets/dadosoffline.json";
      
      this.http.get(url).map(res => res.json()).subscribe(data => {
        
        for (let key in data.results) {
            let newlat = data.results[key].geometry.location.lat;
            let newlng = data.results[key].geometry.location.lng;
            let dist = this.calcdist(this.latUsuario, this.lngUsuario, newlat, newlng);
            this.addMarker(newlat, newlng, data.results[key].name, dist);
        }
        
    });
    
}

  /* ==================================
          funções auxiliares
  =====================================*/

  degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  calcdist(lat1, lng1, lat2, lng2) {
    var earthRadiusKm = 6371;

    var dLat = this.degreesToRadians(lat2-lat1);
    var dLng = this.degreesToRadians(lng2-lng1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    // retorno em metros
    return (earthRadiusKm * c * 1000).toFixed(0);
  }
}

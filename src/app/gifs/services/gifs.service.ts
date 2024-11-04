import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory : string[] = [];
  private apiKey : string= '5LzPcPH6NmoAMIor4FE0u9EnOghc8HNw';
  private serviceUrl : string = 'https://api.giphy.com/v1/gifs'

  //Injectamos el servicio del modulo de HttpClient
  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHIstory( tag : string ){
    tag = tag.toLowerCase();

    if( this._tagsHistory.includes( tag ) ) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag );
    }

    this._tagsHistory.unshift( tag );

    this._tagsHistory = this.tagsHistory.splice(0,10);

    this.saveLocalstorage();

  }

  private saveLocalstorage() : void {
    localStorage.setItem('history', JSON.stringify( this._tagsHistory));
  }

  private loadLocalStorage() : void {
    if( !localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );//Le decimos que siempre va a venir data

    //Verificamos si hay elementos en el historial para pintar el último elemento que fue buscado
    if ( this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag( tag : string ) : void {
    if( tag.length === 0 ) return; //Validamos que no se envien campos vacios
    this.organizeHIstory( tag );

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag );

    //Le decimos que nuestra rspuesta es de tipo SeacrhResponse
    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
      .subscribe( resp => {

        this.gifList = resp.data;

      });
  }


}

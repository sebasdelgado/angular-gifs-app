import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
      class="form-control"
      placeholder="Buscar gifs"
      (keyup.enter)="searchTag()"
      #txtTagInput
    >
    <!-- Creamos una referencia local #txtTagInput -->
  `
})

export class SearchBoxComponent {

  //Creamos la referencia al html con el decorador ViewChild
  @ViewChild('txtTagInput')
  public tagInput! : ElementRef<HTMLInputElement>; //Siempre va a tener un valor, lo especificamos con ! operador de not null

  constructor( private gifsServices : GifsService ) {}

  searchTag() {

    const newtag = this.tagInput.nativeElement.value;

    this.gifsServices.searchTag(newtag);

    this.tagInput.nativeElement.value = '';

  }

}

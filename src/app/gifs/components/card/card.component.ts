import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit { //Usamos OnInit que swe ejecuta cuando el componente se ha inicializado

  @Input()
  public gif! : Gif; //La decimos que siempre va a tener un valor con el operador ! not null

  ngOnInit(): void {
    if ( !this.gif ) throw new Error('Gif property is requried');
  }
}

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  public data: any[] = [];
  private pokemonList: string[] = [
    'pikachu', 'bulbasaur', 'charmander', 'squirtle', 'jigglypuff', 
    'meowth', 'psyduck', 'machop', 'geodude', 'gengar', 
    'onix', 'voltorb', 'hitmonlee', 'hitmonchan', 'lickitung', 
    'koffing', 'rhyhorn', 'tangela', 'kangaskhan', 'horsea'
  ]; // Lista de 20 Pokémon

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const requests = this.pokemonList.map(name => this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${name}`));
    forkJoin(requests).subscribe((details: any[]) => {
      this.data = details;
    });
  }
}

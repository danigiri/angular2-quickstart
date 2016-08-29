import { ActivatedRoute } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { Hero } from './hero';
import { HeroesService } from './heroes-service';

@Component({
	selector: 'my-hero-detail',
	providers:	[
					HeroesService
				],
	template: `
			  <div *ngIf="hero">
			    <h2>{{hero.name}} details!</h2>
			    <div><label>id: </label>{{hero.id}}</div>
			    <div>
			      <label>name: </label>
			      <input [(ngModel)]="hero.name" placeholder="name"/>
			    </div>
			  </div>
			  `
})

export class HeroDetailComponent {
	@Input()
	public hero: Hero;

	constructor(private route: ActivatedRoute, private heroesService: HeroesService) {}
	
	ngOnInit() {
		// TODO: not nest observables, turn it into a single observable
		
		//Observable.from(params).map(function (h:Hero, idx:number, obs:Array<Hero>) {return h.id===id;} )
        this.route.params.subscribe(params => {
            let id = Number.parseInt(params['id']);
            // TODO: error checking here
           	this.heroesService.getObservable()
			  .flatMap( (heroes:Array<Hero>) => Observable.from(heroes) )
			  .first( (h:Hero, idx:number, obs:Array<Hero>) => h.id===id  )
			  //.first( function (h:Hero, idx:number, obs:Array<Hero>) {return h.id===id;} )
			  .subscribe( (h:Hero) => this.hero = h );
          });
	}
}

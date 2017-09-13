import { Injectable } from '@angular/core';
import { Film } from '../interfaces';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FilmListService } from '../filmList/filmList.service';

@Injectable()
export class FilmListResolver implements Resolve<Film[]> {
    constructor(private filmListService: FilmListService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Film[]> {
        return this.filmListService.loadFilms();
    }
}
import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of'

@Injectable()
export class DishService {
constructor() { }

 
    
    getDishes(): Observable<Dish[]> {
//return Promise.resolve(DISHES);
      /*  return new Promise(resolve=> {
// Simulate server latency with 2 second delay
setTimeout(() => resolve(DISHES), 2000);
});*/
        return Observable.of(DISHES).delay(2000);
        
}
getDish(id: number): Observable<Dish> {
//return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
    /*
    return new Promise(resolve=> {
// Simulate server latency with 2 second delay
setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
});
*/
        return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay(2000);
      
    
}
getFeaturedDish(): Observable<Dish> {
//return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
   /* return new Promise(resolve=> {
// Simulate server latency with 2 second delay
setTimeout(() => resolve(DISHES.filter((dish) => (dish.featured))[0]), 2000);
});*/
        return Observable.of(DISHES.filter((dish) => (dish.featured))[0]).delay(2000);
  
}
    getDishIds(): Observable<number[]> {
return Observable.of(DISHES.map(dish => dish.id )).delay(2000);
}
    
}
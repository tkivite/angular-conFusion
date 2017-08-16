import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable()
export class LeaderService {

  constructor() { }
getLeaders(): Promise<Leader[]> {
//eturn Promise.resolve(LEADERS);
      return new Promise(resolve=> {
// Simulate server latency with 2 second delay
setTimeout(() => resolve(LEADERS), 2000);
});
}

    getFeaturedLeader(): Promise<Leader> {
//return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
        return new Promise(resolve => {        
        setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]),2000);
        
        });
}

}

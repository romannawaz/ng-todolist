import { Injectable, computed, signal } from '@angular/core';

import { first, from } from 'rxjs';

import { User } from './search.interface';
import { USERS_MOCK } from './users.mock';

@Injectable()
export class SearchService {
  private _usersSig = signal<User[]>([]);
  usersSig = computed(() => this._usersSig());

  isLoadingSig = signal(false);

  constructor() {
    this.initUsers();
  }

  private initUsers(): void {
    this.isLoadingSig.set(true);

    from(this.fetchMockData())
      .pipe(first())
      .subscribe((users) => {
        this._usersSig.set(users);
        this.isLoadingSig.set(false);
      });
  }

  private fetchMockData(): Promise<User[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(USERS_MOCK);
      }, 2000);
    });
  }
}

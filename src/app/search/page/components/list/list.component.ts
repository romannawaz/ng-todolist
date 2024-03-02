import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchService, User, UserFields } from '@app/search/service';
import { ListItemComponent } from '../list-item/list-item.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { TheadComponent } from './components/thead/thead.component';

type UserWithoutId = Omit<User, 'id'>;
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    ListItemComponent,
    SearchBarComponent,
    TheadComponent,
  ],
  providers: [SearchService],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  UserFields = UserFields;

  private searchService = inject(SearchService);
  isServiceLoadingSig = this.searchService.isLoadingSig;

  private usersSig = this.searchService.usersSig;
  private searchSig = signal<Partial<UserWithoutId>>({});
  sortSig = signal<Partial<{ [key in keyof UserWithoutId]: boolean }>>({});
  modifiedUsersSig = computed(() => this.sortUsers(this.getFilteredUsers()));

  private getFilteredUsers(): User[] {
    let res: User[] = this.usersSig();
    const { name, age } = this.searchSig();

    if (name) {
      res = res.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase()),
      );
    }
    if (age) {
      res = res.filter((user) => user.age.toString().includes(age.toString()));
    }

    return res;
  }

  private sortUsers(users: User[]): User[] {
    if (this.sortSig()[UserFields.NAME] !== undefined) {
      users.sort((a, b) =>
        a[UserFields.NAME].localeCompare(b[UserFields.NAME]),
      );

      if (!this.sortSig()[UserFields.NAME]) {
        users.reverse();
      }
    }

    if (this.sortSig()[UserFields.AGE] !== undefined) {
      users.sort((a, b) => a[UserFields.AGE] - b[UserFields.AGE]);

      if (!this.sortSig()[UserFields.AGE]) {
        users.reverse();
      }
    }

    return users;
  }

  onSearch(searchValue: string, field: UserFields): void {
    this.searchSig.set({ ...this.searchSig(), [field]: searchValue });
  }

  onSort(field: UserFields): void {
    this.sortSig.set({ [field]: !this.sortSig()[field] });
  }

  isSearchEmpty(): boolean {
    return !Object.values(this.searchSig()).filter(Boolean).length;
  }
}

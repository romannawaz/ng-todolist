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

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ListItemComponent, SearchBarComponent],
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
  private searchSig = signal<Partial<Omit<User, 'id'>>>({});
  filteredUsersSig = computed(() => this.filterUsersOnSearch());

  private filterUsersOnSearch() {
    let res = this.usersSig();
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

  onSearch(searchValue: string, field: UserFields) {
    this.searchSig.set({ ...this.searchSig(), [field]: searchValue });
  }

  isSearchEmpty(): boolean {
    return !Object.values(this.searchSig()).filter(Boolean).length;
  }
}

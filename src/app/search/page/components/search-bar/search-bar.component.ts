import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  @Output()
  private onSearch = new EventEmitter<string>();

  search = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    this.onChangeSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private onChangeSearch(): void {
    this.search.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => this.onSearch.emit(value));
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Todo } from '@app/todo/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent implements OnChanges {
  private _subscription?: Subscription;

  @Input({ required: true })
  todo!: Todo;

  @Output()
  onTodoChanges = new EventEmitter<Todo>();

  doneControl = new FormControl<boolean>(false);

  ngOnChanges(): void {
    this.doneControl.setValue(this.todo.done);

    if (this._subscription) {
      this._subscription.unsubscribe();
    }
    this._subscription = this.doneControl.valueChanges.subscribe((done) => {
      if (done !== null) this.onTodoChanges.emit({ ...this.todo, done });
    });
  }
}

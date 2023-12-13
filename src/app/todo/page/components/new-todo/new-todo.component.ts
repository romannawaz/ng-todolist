import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Todo } from '@app/todo/common';

export enum NewTodoFormFields {
  TODO = 'todo',
}

export interface NewTodoForm {
  [NewTodoFormFields.TODO]: FormControl<string>;
}

@Component({
  selector: 'app-new-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-todo.component.html',
  styleUrl: './new-todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTodoComponent {
  NewTodoFormFields = NewTodoFormFields;

  private fb = inject(FormBuilder);

  @Output()
  onNewTodoSubmit = new EventEmitter<Todo>();

  newTodoForm = this._generateForm();

  get todoControl(): FormControl<string> {
    return this.newTodoForm.controls[NewTodoFormFields.TODO];
  }

  private _generateForm(): FormGroup<NewTodoForm> {
    return this.fb.group({
      [NewTodoFormFields.TODO]: this.fb.nonNullable.control('', [
        Validators.required,
      ]),
    });
  }

  newTodo(): void {
    if (this.newTodoForm.invalid) return;

    const newTodo: Todo = {
      id: Date.now(),
      title: this.todoControl.value,
      done: false,
    };

    this.onNewTodoSubmit.emit(newTodo);
    this.todoControl.reset();
  }
}

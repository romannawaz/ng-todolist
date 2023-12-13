import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Todo } from '@app/todo/common';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { NewTodoComponent } from './components/new-todo/new-todo.component';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, NewTodoComponent],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoPageComponent {
  Todos: Todo[] = [
    {
      id: 1,
      title: 'First task',
      done: false,
    },
    {
      id: 2,
      title: 'Second task (Done)',
      done: true,
    },
  ];

  newTodo(todo: Todo): void {
    this.Todos.unshift(todo);
  }

  onTodoChanges(todo: Todo): void {
    const todoIndex = this.Todos.findIndex((t) => t.id === todo.id);
    this.Todos[todoIndex] = todo;
  }
}

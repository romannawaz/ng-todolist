import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTodoComponent, NewTodoFormFields } from './new-todo.component';

describe('NewTodoComponent', () => {
  let component: NewTodoComponent;
  let fixture: ComponentFixture<NewTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTodoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('new todo form should be valid', () => {
    const todoControlValue = 'New todo';
    component.newTodoForm.setValue({
      [NewTodoFormFields.TODO]: todoControlValue,
    });

    expect(component.newTodoForm.valid).toEqual(true);
  });

  it('new todo form should not be valid', () => {
    const todoControlValue = '';
    component.newTodoForm.setValue({
      [NewTodoFormFields.TODO]: todoControlValue,
    });

    expect(component.newTodoForm.valid).toEqual(false);
  });

  it('should emit todo', () => {
    spyOn(component.onNewTodoSubmit, 'emit');

    const todoControlValue = 'New todo';
    component.newTodoForm.setValue({
      [NewTodoFormFields.TODO]: todoControlValue,
    });

    component.newTodo();

    const expectedEmitValue = {
      id: Date.now(),
      title: todoControlValue,
      done: false,
    };
    expect(component.onNewTodoSubmit.emit).toHaveBeenCalledWith(
      expectedEmitValue,
    );
    expect(component.newTodoForm.value).toEqual({
      [NewTodoFormFields.TODO]: '',
    });
  });
});

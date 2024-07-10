// @ts-ignore

import { Component } from '@angular/core';
import {Todo} from "../models/todo";
import {FormsModule} from "@angular/forms";
import {NgClass, NgFor, NgIf} from "@angular/common";
import {assertEnumNumberBody} from "@babel/types";
import {TodoService} from "../services/todo.service";

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, NgClass],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {
  todos: Todo[] = [];
  inputValue = '';
  isEditing = false;
  ongoingEditing = false
  constructor(private todoService: TodoService ) {
    this.todos = this.todoService.getAll()
  }
  fetchTodos() {
  this.todos = this.todoService.getAll()
  }

  onAddClick() {
    if (this.inputValue) {
      let todo: Todo = {description: this.inputValue, completed: false, isEditing: false};
      this.inputValue = ''
      this.todoService.save(todo);
      this.fetchTodos();
      console.log(this.todos)

    }
  }


  onDelete(index: number) {
    if (confirm('Are you sure?')) {
      this.todos.splice(index, 1 )
      this.fetchTodos();

    }
  }

  onEdit(index: number) {
    if(this.ongoingEditing){
      return
    }
    this.todos[index].isEditing = true;
    this.ongoingEditing = true;
  }

  onSave(index: number, value: string) {
    this.todos[index].description = value;
    this.todos[index].isEditing = false;
    this.ongoingEditing = false;
    this.fetchTodos();
  }


  onCancel(index : number) {
    this.todos[index].isEditing = false;
    this.todos[index] = {...this.todos[index]};
this.ongoingEditing = false;
  }


}





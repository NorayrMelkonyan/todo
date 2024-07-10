// @ts-ignore
// @ts-ignore

import {Injectable} from '@angular/core';
import {Todo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() {
  }

  getAll(): Todo[] {
    return JSON.parse(localStorage.getItem('todoItems') || '[]')
  }

  setAll(todos: Todo[]) {
    localStorage.setItem('todoItems', JSON.stringify(todos));
  }

  add(todo: Todo) {
    localStorage.setItem('todoItems', JSON.stringify(todo));

  let items = this.getAll()
items.unshift(todo);
  localStorage.setItem('todoItems', JSON.stringify(items));

  }

}

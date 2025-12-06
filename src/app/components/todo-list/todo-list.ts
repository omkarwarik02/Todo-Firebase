import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo-service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import type { Todo } from '../../Models/Todo.moddel';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.scss'],
})
export class TodoList implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
   private todoId: string | null = null;
  todos$: Observable<Todo[]>;

  private todoService = inject(TodoService);
  ngOnInit(): void {
    this.todoId = this.route.snapshot.paramMap.get('id');
  }

  constructor() {
    this.todos$ = this.todoService.getTodos();
    this.todos$.subscribe((c) => {
      console.log(c);
    });
  }
  edit(id: string) {
    this.router.navigate(['/todo-edit', id]);
  }
  delete(id: string) {
    this.todoService.deleteTodo(id).catch((err) => console.error('Delete failed:', err));
  }
}

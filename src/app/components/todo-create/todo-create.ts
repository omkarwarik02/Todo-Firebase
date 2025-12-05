import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo-service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-create.html',
  styleUrls: ['./todo-create.scss'],
})
export class TodoCreate {
  todoForm: FormGroup;

  private fb = inject(FormBuilder);
  private todoService = inject(TodoService);
  private router = inject(Router);

  constructor() {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['pending'],
    });
  }

  onSubmit() {
    this.todoService
      .addItem(this.todoForm.value.title, this.todoForm.value.description)
      .then(() => {
        console.log('Saved!');
      })
      .catch((e) => console.error(e));
    this.router.navigate(['/todo-list']);
  }
}

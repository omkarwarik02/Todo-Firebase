import {
  Component,
  inject,
  OnInit,
  runInInjectionContext,
  EnvironmentInjector,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../services/todo-service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { doc, getDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-todo-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './todo-edit.html',
  styleUrls: ['./todo-edit.scss'],
})
export class TodoEdit implements OnInit {
 private fb = inject(FormBuilder);
   private todoService = inject(TodoService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
   private firestore = inject(Firestore);
    private injector = inject(EnvironmentInjector);
    
  todoId: string | null = null;
  editForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    status: ['pending'],
  });

  async ngOnInit() {
    this.todoId = this.route.snapshot.paramMap.get('id');

    if (this.todoId) {
      const id = this.todoId;
      await runInInjectionContext(this.injector, async () => {
        const docRef = doc(this.firestore, `items/${this.todoId}`);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const data = snap.data();

          this.todoService.getTodoById(this.todoId!).subscribe((todo) => {
            console.log('fetched todo', todo);
          });
          this.editForm.patchValue({
            title: data['title'],
            description: data['description'],
            status: data['status'],
          });
        }
      });
    }
  }

  onUpdate() {
    if (!this.todoId) return;

    this.todoService.updateTodos(this.todoId, this.editForm.value).then(() => {
      console.log('Todo updated!');
      this.router.navigate(['/todo-list']);
    });
  }
}

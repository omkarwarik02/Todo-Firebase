import { Injectable, inject, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import type { Todo } from '../Models/Todo.moddel';
import { deleteDoc, getDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private firestore = inject(Firestore);
  private injector = inject(EnvironmentInjector);

  private itemsCollection = collection(this.firestore, 'items');
  items: Observable<Todo[]> = collectionData(this.itemsCollection, { idField: 'id' }) as Observable<
    Todo[]
  >;

  getTodos() {
    return this.items;
  }
  getTodoById(id: string): Observable<Todo | undefined> {
    const docRef = doc(this.firestore, `todos/${id}`);
    return new Observable((observer) => {
      getDoc(docRef).then((snap) => {
        if (snap.exists()) {
          observer.next({ id: snap.id, ...snap.data() } as Todo);
        } else {
          observer.next(undefined);
        }
        observer.complete();
      });
    });
  }

  addItem(title: string, description: string) {
    const todo: Todo = {
      id: '',
      title,
      description,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return runInInjectionContext(this.injector, () => {
      return addDoc(this.itemsCollection, todo);
    });
  }
  updateTodos(id: string, data: Partial<Todo>) {
    const docRef = doc(this.firestore, `items/${id}`);

    return runInInjectionContext(this.injector, () => {
      return updateDoc(docRef, {
        ...data,
        updatedAt: new Date(),
      });
    });
  }
  deleteTodo(id: string) {
    const docRef = doc(this.firestore, `items/${id}`);
    return deleteDoc(docRef);
  }
}

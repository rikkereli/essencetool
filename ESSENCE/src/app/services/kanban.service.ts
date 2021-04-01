import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { ITask, Task } from '../model/task';
import * as ids from '../assets/vars';
import { ProjectService } from './project.service';
import { ChosenFeature } from '../model/chosenFeature';
import { CategoryitemService } from './categoryitem.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class KanbanService {

  constructor(private store: AngularFirestore, private projectService: ProjectService, private categoryItemService: CategoryitemService) {

   }
  getObservable = (collection: AngularFirestoreCollection<Task>) => {
    const subject = new BehaviorSubject([]);
    this.categoryItemService.getFeatures().pipe(map(features => {
      this.features$.next(features); 
      return features.filter(feature => feature.chosen === "true")
    })).subscribe(features => {
      this.activeFeatures = features;
      collection.valueChanges({ idField: 'id' }).subscribe((val: Task[]) => {
        var tasks: Task[] = [];
        val.forEach(element => {
          var task = new Task();
          task.makeTask(element);
          task.setStatus(features);
          tasks.push(task);
        });
        subject.next(tasks);
      });
    })

    return subject;
  };
 features$ = new BehaviorSubject<ChosenFeature[]>([]);
  activeFeatures: ChosenFeature[];
  getBoard(board:string) {
    return this.getObservable(this.RetrieveBoardRefrence(board));
  }


  moveContainer(item: ITask, newContainer: string, previousContainer: string) {
    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.UpdateBoardRefrence(previousContainer).doc(item.id).delete(),
        this.UpdateBoardRefrence(newContainer).add(item)
      ]);
      return promise;
    });
  }
  
  // Add a new task to the backlog
  addTask(task: ITask) {
    this.UpdateBoardRefrence(ids.backlogCollection).add(task)
  }

  editTask(task:Task, board: string) {
    this.UpdateBoardRefrence(board).doc(task.id).update(task);
  }
  deleteTask(task:Task, board: string) {
    this.UpdateBoardRefrence(board).doc(task.id).delete();
  }
  // References the specified kanban board
  UpdateBoardRefrence(board: string) {
    return this.store.collection(ids.diagramsCollection).doc(this.projectService.getCurrentProject()).collection<ITask>(board);
  }
  // References the specified kanban board
  RetrieveBoardRefrence(board: string) {
    return this.store.collection(ids.diagramsCollection).doc(this.projectService.getCurrentProject()).collection<Task>(board);
  }
}

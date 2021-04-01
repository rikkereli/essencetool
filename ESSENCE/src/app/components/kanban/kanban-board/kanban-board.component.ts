import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/model/task';
import { KanbanService } from 'src/app/services/kanban.service';
import { TaskDialogComponent, TaskDialogResult } from '../task-dialog/task-dialog.component';
import * as ids from '../../../assets/vars';
import { Observable } from 'rxjs';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {

  constructor(public http: HttpClient, private dialog: MatDialog, private kanbanService: KanbanService) { }

  ngOnInit(): void {
  }
  
  boards: Observable<any[]>;

  backlog = this.kanbanService.getBoard(ids.backlogCollection);
  inProgress = this.kanbanService.getBoard(ids.inProgressCollection);
  done = this.kanbanService.getBoard(ids.doneCollection);

  drop(event: CdkDragDrop<Task[]>): void {
    if(event.previousContainer === event.container) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    this.kanbanService.moveContainer(item, event.container.id, event.previousContainer.id);

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex, 
      event.currentIndex
    );
  }
  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px', 
      data: {
        task: {}
      }
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      this.kanbanService.addTask(result.task);
    });
  }
  editTask(list: 'backlog' | 'done' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      const dataList = this[list];
      if (result.delete) {
        this.kanbanService.deleteTask(task, list);
      } else {
        this.kanbanService.editTask(task, list);
      }
    });
  }
  
}

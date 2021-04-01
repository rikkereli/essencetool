import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/model/task';
import { KanbanService } from 'src/app/services/kanban.service';

export interface TaskDialogData {
  task: Partial<Task>;
  enableDelete: boolean;
}
export interface TaskDialogResult {
  task: Task;
  delete?: boolean; 
}

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {
  private backupTask: Partial<Task> = { ...this.data.task };


  constructor(public kanbanService: KanbanService, public dialogRef: MatDialogRef<TaskDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: TaskDialogData) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.data.task.title = this.backupTask.title;
    this.data.task.description = this.backupTask.description;
    this.dialogRef.close(this.data);
  }
  selectOptions = [{text: "Feature", name: "feature"}, {text: "BugFix", name: "bugFix"}];
  features = ["Feature", "BugFix"];
  selected = "Feature";
  feaure = "";
}

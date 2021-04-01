import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/model/task';
import { KanbanService } from 'src/app/services/kanban.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Output() edit = new EventEmitter<Task>();
  constructor(public kanbanService: KanbanService) { 
    
  }

  featurename: string = "";
  ngOnInit(): void {
    this.kanbanService.features$.subscribe(
      features => {
        var feature = features.find(feature => feature.id === this.task.connectedFeature);
        if(feature) {
          this.featurename = feature.text;
        }
        else{
          this.featurename = "No feature"
        }

      })
     }
}

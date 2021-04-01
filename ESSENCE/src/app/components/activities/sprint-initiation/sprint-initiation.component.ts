import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model';
import { ChosenFeature } from 'src/app/model/chosenFeature';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryitemService } from 'src/app/services/categoryitem.service';
import { KanbanService } from 'src/app/services/kanban.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProjectService } from 'src/app/services/project.service';
import * as routes from '../../../assets/routes';
import * as ids from '../../../assets/vars';
@Component({
  selector: 'app-sprint-initiation',
  templateUrl: './sprint-initiation.component.html',
  styleUrls: ['./sprint-initiation.component.scss']
})
export class SprintInitiationComponent implements OnInit {

  feature$: Observable<Category>;
  true = true;
  constructor(public projectService: ProjectService,public navbarService: NavbarService, public categoryItemService: CategoryitemService, public categoryService: CategoryService, private kanbanService: KanbanService) { 
    this.feature$ = this.categoryService.getCategory(ids.feature);
    this.categoryItemService.getFeatures().subscribe(changes => {
      // All items that have been touched
      var newList: String[] = [];
      // Go through all items in the list and update accordingly
      changes.map(changedItem => {
              
          
        newList.push(changedItem.id);
        // Act according to the change type

          // If we do not yet have this item, add it to the local storage
          if(!this.features.some(i => i.id == changedItem.id)) {
            // It should only be possible to add active items to the sprint scope
            if(changedItem.status == 1) {
              
              this.features.push(changedItem);
            }
          }
          // If we do have this item, update value locally
          else{
            // Remove item from list if status is 0
            if(changedItem.status === 0)
            {
              var index = this.features.findIndex(element => element.id == changedItem.id);
              this.features.splice(index, 1);
            }
            else {
              this.features.find(e => e.id == changedItem.id).updateFeatureValue(changedItem);
            }
          }
        }
      ) 
      // Delete all features not in the newlist, as these must have been removed from storage
      this.features.forEach((element, index) => {
        if(!newList.includes(element.id)){
          this.features.splice(index, 1);
        }});
    })    
      // Make sure category ids are in sorted order
      // Add an empty box in the bottom of the list in order to be able to edit
  }

  ngOnInit(): void {

  }


  features: ChosenFeature[] = [];

  toogleActivity(feature) {
    feature.toogleActivity();
    this.categoryItemService.toogleFeatureActivity(feature);
  }
  nextActivity() {
    // Add tasks to the kanban board for each selected feature. 
    this.features.forEach(
      feature => {
        if(feature.chosen === "true") {
          // If the feature was already present (chosen in last sprint), then it should not be added!
          this.kanbanService.addTask({title: feature.text, description: "Develop " + feature.text, connectedFeature: feature.id, type: "feature"})
          // Should update the status of all features that are not in the sprint goal
        }
      }
    )
    this.projectService.updateProjectStage(routes.sprintWorkActivity);

  }
}

import { ChosenFeature } from "./chosenFeature";

export interface ITask {
    id?: string;
    title: string;
    description: string; 
    connectedFeature: string;
    type: "feature" | "bugFix";
}
export class Task implements ITask{
    
    makeTask(task: ITask) {
        this.id = task.id;
        this.title = task.title;
        this.description = task.description;
        this.type = task.type;
        this.connectedFeature = task.connectedFeature;
    }

    id: string;
    title: string;
    description: string; 
    connectedFeature: string;
    // Defines if it is related to a feature or if it is a bugfix. This is important in order to make tasks active or passive
    type: "feature" | "bugFix" = "feature";

    status: "active" | "passive";

    // Set task status. If it is a bugfix or related to an active feature, set to active, if it is a feature related to a passive feature, set passive
    setStatus(activeFeatures: ChosenFeature[])
    {
        if(this.type === "bugFix"){
            this.status === "active";
        }
        else if(activeFeatures.find(feature => feature.id===this.connectedFeature)){
            this.status = "active";
        }
        else {
            this.status = "passive";
        }
    }
}
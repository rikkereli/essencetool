import { CategoryItem } from "./categoryItem";
import * as routes from "../assets/routes";
export enum ProjectStage { 
    challengeDetected = 0,  
    ecologyObjectGeneration = 1, 
    leveragePointGeneration = 2,
    initialProblemGeneration = 3, 
    prospectAxisAlignment = 4, 
    prospectRepresentation = 5, 
    prospectRepresentationExpansion = 6, 
    RSTReview = 7, 
    getComments = 8,
    generateCriteria = 9, 
    updateDiagram = 10
    }

export class Project  {

    constructor(projectName: string, projectStage: string) {
        this.projectName = projectName;
        this.projectStage = projectStage;
    }
    projectName: string;
    projectStage: string;
    projectPath: string;


    /*
    makeProjectPath() {
        switch(this.projectStage) {
            case 0: {
                this.projectPath = routes.challengeDetected;
                break;
            }
            case 1: {
                this.projectPath = routes.ecologyObject;
                break;
            }
            case 2: {
                this.projectPath = routes.leveragePoint;
                break;
            }
            case 3: {
                this.projectPath = routes.initialProblem;
                break;
            }
            case 4: {
                this.projectPath = routes.axixAlignmentActivity;
                break;
            }
            case 5: {
                this.projectPath = routes.prospectRepresentationActivity;
                break;
            }
            case 6: {
                this.projectPath = routes.prospectRepresentationExpansionActivity;
                break;
            }
            case 7: {
                this.projectPath = routes.RSTReviewActivity;
                break;
            }
            case 8: {
                this.projectPath = routes.RSTReviewGetCommentsActivity;
                break;
            }
            case 9: {
                this.projectPath = routes.RSTReviewGenerateCriteriaActivity;
                break;
            }
            case 10: {
                this.projectPath = routes.RSTReviewupdateDiagramActivity;
                break;
            }
        }
    }
        */
}
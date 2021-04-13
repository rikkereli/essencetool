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

    verticalProblemStart = "";
    verticalProblemEnd = "";
    verticalSolutionStart = "";
    verticalSolutionEnd = "";
    HorizontalProblemStart = "";
    HorizontalProblemEnd = "";
    HorizontalSolutionStart = "";
    HorizontalSolutionEnd = "";

}
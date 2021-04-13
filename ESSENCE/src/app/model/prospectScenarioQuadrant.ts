export interface IProspectScenarioQuadrant {
    prototype: string;
    metaphor: string;
    proposition: string;
    icon: string;
    selected : "selected" | "notSelected";

}

export class ProspectScenarioQuadrant implements IProspectScenarioQuadrant {
    prototype = "";
    metaphor = "";
    proposition = "";
    icon = "";
    selected : "selected" | "notSelected" = "notSelected";

    getFirestoreObject() {
        return {prototype: this.prototype, metaphor: this.metaphor, proposition: this.proposition, icon: this.icon, selected: this.selected}
    }
}
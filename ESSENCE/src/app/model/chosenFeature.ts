
export class ChosenFeature {

    type = "chosenFeature";
    constructor(id: string, text: string) {
        this.id = id;
        this.text = text;
    }
    // The feature ID 
    id: string;

    // Whether the feature is actively chosen in this sprint (should save criteria text in case they want to use it again)
    chosen: string = "false";

    status: number;

    // Type 
    toogleActivity() {
        if(this.chosen === "false") {
            this.chosen = "true";
        }
        else {
            this.chosen = "false";
        }
    }
    text: string;
    updateFeatureValue(newValues) {

        if(newValues.text) {
            this.text = newValues.text;
        }
        if(newValues.chosen) {
            this.chosen = newValues.chosen;
        }
        if(newValues.status) {
            this.status = newValues.status;
        }
        if(newValues.chosen) {
            this.chosen = newValues.chosen;
        }
    }
}
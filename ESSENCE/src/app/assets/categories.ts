export class Categories {

  connectedCategories: Map<string, string[]>;
  displayTitles: Map<string, string>;
  categoryView: Map<string, string>;

    constructor() {
        this.fillOutConnectedCategories();
        this.fillOutCategoryView();
    }

    isCategory(name) {
        var obj = this.connectedCategories.get(name);
        if(obj) {
            return true;
        }
        else {
            return false;
        }
    }
    areConnected(otherCategory: string, thisCategory: string) {
        let connectedCategories = this.connectedCategories.get(otherCategory);
        if(connectedCategories) {
        let inList = connectedCategories.includes(thisCategory);
        return inList;
        }
        else {
            // If the category is not in the connected categories list, there is no reason to examine if it is connected
            return true;
        }
    }
    fillOutConnectedCategories() {
        this.connectedCategories = new Map<string, string[]>();
        this.connectedCategories.set("rationale", ["leverage", "problematic", "resolution"]);
        this.connectedCategories.set("problematic", ["ecology","leverage", "resolution"]);
        this.connectedCategories.set("leverage", ["problematic", "architecture", "resolution"]);
        this.connectedCategories.set("resolution", ["leverage", "problematic"]);
        this.connectedCategories.set("strategy", ["ecology", "architecture", "qualification"]);
        this.connectedCategories.set("ecology", ["architecture", "scenario","qualification", "problematic"]);
        this.connectedCategories.set("architecture", ["ecology","qualification", "leverage", "feature"]);
        this.connectedCategories.set("qualification", ["architecture", "ecology"]);
        this.connectedCategories.set("tactic", ["scenario", "feature", "valueproposition"]);
        this.connectedCategories.set("scenario", ["feature", "ecology","valueproposition"]);
        this.connectedCategories.set("feature", ["scenario", "valueproposition" ,"architecture"]);
        this.connectedCategories.set("valueproposition", ["feature", "scenario"]);
    }


    fillOutCategoryView() {
        var project = "project";
        var product = "product";
        var paradigm = "paradigm";
        var process = "process";
        this.categoryView = new Map<string, string>();
        this.categoryView.set("rationale", process);
        this.categoryView.set("problematic", paradigm);
        this.categoryView.set("leverage", product);
        this.categoryView.set("resolution", project);
        this.categoryView.set("strategy", process);
        this.categoryView.set("ecology", paradigm);
        this.categoryView.set("architecture", product);
        this.categoryView.set("qualification", project);
        this.categoryView.set("tactic", process);
        this.categoryView.set("scenario", paradigm);
        this.categoryView.set("feature", product);
        this.categoryView.set("valueproposition", project);    
        this.categoryView.set("challenge", paradigm);    
        this.categoryView.set("leveragePoint", product);    
        this.categoryView.set("ecologyObject", paradigm);    
        this.categoryView.set("comments", paradigm);    
    }
}
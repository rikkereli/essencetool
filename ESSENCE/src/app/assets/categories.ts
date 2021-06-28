import { ItemConnection } from "../model/itemConnection";

export type CategoryOptions = "none"|"scenarios"|"outerEnvironment"|"problem"|"innerEnvironment"|"leverage"|"features"|"valuePropositions"|"scope"|"solution"|"rationale"|"strategy"|"tactic"
;
export type ViewOptions ="paradigm"|"process"|"product"|"project"|"none";
export class Categories {

    img = "assets/img/scenarios.png";

    cateoryInfo: Map<CategoryOptions, {reasoning: string, image:string, tooltip: string,displayTitle: string,singleItemCategory: boolean, help: string, view: ViewOptions}> = new Map([
        ["scenarios", {reasoning:'Are the scenarios we described still most fitting?', image: this.img,tooltip: "Situations where the product will be used.", displayTitle: "Scenarios", singleItemCategory: false, help: "<p>Description: <p/> <p>Purpose: Define likely scenarios where the product will be used. Decide on the most important scenarios. <p/> <p>Example: <p/>", view: "paradigm"}],
        ["outerEnvironment", {reasoning:'Are the outer environment still realistic?', image: this.img, tooltip: "How the environment will interface with the product.", displayTitle: "Outer Environment", singleItemCategory: false, help:"<p>Description: <p/> <p>Purpose: Reflect on how the product interface with the environment.<p/> <p>Example: <p/>", view:"paradigm"}],
        ["problem", {reasoning:'Is the problem still reasonalble?', image:this.img,tooltip: "The background of the project.", displayTitle: "Problem", singleItemCategory: true, help: "<p>Description: The problem is the reason that the project is needed. <p/> <p>Purpose: Understand what problem we are trying to solve.<p/> <p>Example: Keeping track of household economy can be complicated.<p/>", view:"paradigm"}],
        ['innerEnvironment', {reasoning:'Do the inner environment still make sense?', image: this.img,tooltip: "The structure of the product.", displayTitle: "Inner Environment", singleItemCategory: false, help:"<p>Description: <p/> <p>Purpose: Understand the overall structure of the product. <p/> <p>Example: <p/>", view:"product"}],
        ['leverage', {reasoning:'Are the leverage points till well spend?',image:this.img,tooltip: "Building blocks of the product.", displayTitle: "Leverage", singleItemCategory: false, help: "<p>Description: <p/> <p>Purpose: Understand existing elements that can be leveraged as a part of the solution. <p/> <p>Example: <p/>", view:"product"}],
        ['features', {reasoning:'Does the selected features still make sense?',image: this.img,tooltip: "The features the product should offer.", displayTitle: "Features", singleItemCategory: false, help: "<p>Description: <p/> <p>Purpose: Define the features that should be included in the solution. <p/> <p>Example: <p/>", view:"product"}],
        ['valuePropositions', {reasoning:'Do we still believe in the value propositions?',image: this.img,tooltip: "How the features will bring value.", displayTitle: "Value Propositions", singleItemCategory: false, help:"<p>Description: <p/> <p>Purpose: Understand how the proposed features will bring value in the scenarios.<p/> <p>Example: <p/>",view:"project"}],
        ['scope', {reasoning:'Is the scope still reasonalble?',image: this.img,tooltip: "The part of the problem that we are focusing on.", displayTitle: "Scope Proposition", singleItemCategory: false, help:"<p>Description: The scope is how much of the problem we are trying to solve currently, given what we believe is possible with the available time, resources and technology.<p/> <p>Purpose: It is rarely possible to solve the problem completely. Often, the we have limited resources and have to select the most important, or most solvable, parts of the problem to solve first. Given more resources or new information, the scope can be expanded.<p/> <p>Example: For the problem: Keeping track of the household economy can be complicated, and given the outer environment: StoreBox(digital receipts) and <p/>", view:"project"}],
        ['solution', {reasoning:'Is the solution still reasonalble?',image: this.img,tooltip: "How we plan to solve the problme", displayTitle: "Solution Proposition", singleItemCategory: true, help:"<p>Description: <p/> <p>Purpose: understand how you imagine the problem will be solved. <p/> <p>Example: <p/>", view:"project"}],
        ['rationale', {reasoning:'Are the rationale still good criteria?',image:this.img,tooltip: "?", displayTitle: "Rationale", singleItemCategory: false, help:"<p>Description: <p/> <p>Purpose: <p/> <p>Example: <p/>", view:"process"}],
        ['strategy', {reasoning:'Do you still believe in the strategy criteria still?',image: this.img,tooltip: "?", displayTitle: "Strategy", singleItemCategory: false, help:"<p>Description: <p/> <p>Purpose: <p/> <p>Example: <p/>", view:"process"}],
        ['tactic', {reasoning:'Are the tactic criteria still reasonable?',image:this.img,tooltip: "?", displayTitle: "Tactic", singleItemCategory: false, help:"<p>Description: <p/> <p>Purpose: <p/> <p>Example: <p/>", view:"process"}],
        ['none', {reasoning:'',image:this.img,tooltip: "?", displayTitle: "Tactic", singleItemCategory: false, help:"<p>Description: <p/> <p>Purpose: <p/> <p>Example: <p/>", view:"none"}],
    ]);


  connectedCategories: Map<CategoryOptions, CategoryOptions[]> = new Map([
      ["scenarios", ["features","valuePropositions"]],
      ["innerEnvironment", ["leverage","features","outerEnvironment"]],
      ["outerEnvironment", ["innerEnvironment"]],
      ["leverage", ["innerEnvironment"]],
      ["features", ["scenarios", "valuePropositions"]],
      ["valuePropositions", ["tactic","scenarios","features", "scope"]],
      ["tactic", ["valuePropositions"]],
  ]);

  shouldConsiderOnUpdateCategories: Map<CategoryOptions, CategoryOptions[]> = new Map([
    ["scenarios", ["valuePropositions"]],
    ["outerEnvironment", ["scope"]],
    ["problem", ["solution"]],
    ["innerEnvironment", ["scope"]],
    ["leverage", ["solution"]],
    ["features", ["valuePropositions"]],
    ["valuePropositions", ["tactic","scenarios","features", "scope"]],
    ["scope", ["strategy","outerEnvironment","innerEnvironment","solution", "valuePropositions"]],
    ["solution", ["rationale","problem","leverage","scope"]],
    ["rationale", ["solution"]],
    ["strategy", ["scope"]],
    ["tactic", ["valuePropositions"]],
]);

    isCategory(name) {
        var obj = this.connectedCategories.get(name);
        if(obj) {
            return true;
        }
        else {
            return false;
        }
    }
    areConnected(otherCategory: CategoryOptions, thisCategory: CategoryOptions) {
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

    getDisplayTitle(category: CategoryOptions) {
        return this.cateoryInfo.get(category).displayTitle           
    }
    getHelp(category: CategoryOptions){
        return this.cateoryInfo.get(category).help
        
    }
    getView(category: CategoryOptions) {
        return this.cateoryInfo.get(category).view
    }
    getTooltip(category: CategoryOptions) {
        return this.cateoryInfo.get(category).tooltip
    }
    getImage(category: CategoryOptions) {
        return this.cateoryInfo.get(category).image
    }
    getReasoning(category: CategoryOptions) {
        return this.cateoryInfo.get(category).reasoning
    }
    canConnectItems(fromCategory: CategoryOptions, toCategory: CategoryOptions){
        var connections =this.connectedCategories.get(fromCategory);
        if(connections.includes(toCategory)){
            return true
        }
        else {
            return false
        }
    }
    
    missingConnections(parentCategory: CategoryOptions, connections: ItemConnection[]){
        var connectedCategories = this.connectedCategories.get(parentCategory)
        var missingConnections = []
        connectedCategories.forEach(category => {
            if(!connections.find(connection => connection.parentCategory == category)) {
                missingConnections.push(category)
            }
        })
        return missingConnections;
    }

    isConnectable(category: CategoryOptions) {
        if(this.connectedCategories.get(category)){
            return true
        }
        return false;
    }
    isSingleItemCategory(category: CategoryOptions) {
        var categoryInfo = this.cateoryInfo.get(category);
        var isSingleItemCategory = categoryInfo.singleItemCategory;
        return isSingleItemCategory   
     }
}
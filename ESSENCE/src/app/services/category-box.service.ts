import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
import { Category, CategoryItem, Status } from '../model';
import { ChosenFeature } from '../model/chosenFeature';
import * as ids from '../assets/vars';
import { Item } from '../model/item';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FirestoreReferencesService } from './firestore-references.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryBoxService<ItemType extends Item> {

  categoryFormGroup: FormGroup;
  itemsFormGroup: FormGroup;

  singleItemCategory: boolean = false;
  categoryReference: AngularFirestoreCollection;

  parent;

  createNewInstance(orderNr) {
    
    return <ItemType>this.type.createNew(orderNr);
  }

  constructor(
    public firestore: AngularFirestore, 
    private fb: FormBuilder
    ) {
      this.itemsFormGroup = this.fb.group({});
      this.categoryFormGroup = this.fb.group({categoryItems: this.fb.array([])});  
    }

  setSingleitemCategory() {
    this.singleItemCategory = true;
  }
  type: ItemType;

  deleteLocal(id) {
    var index = this.categoryIDS.findIndex(e => e.id == id);
    this.categoryIDS.splice(index, 1);
    this.itemsFormGroup.removeControl(id);
  }

  categoryIDS: ItemType[] = [];

  dataRecievedFromFirestore(changes: DocumentData[]) {

    // All items that have been touched
    var newList: String[] = []
    // Go through all items in the list and update accordingly
    changes.map(changedItem => {
            
    // Get content of changed item
    var content = ({id: changedItem.payload.doc['id'], ...changedItem.payload.doc.data()});
    this.categoryItems.push(this.fb.control(content.text))
    newList.push(content.id);
    // Act according to the change type
    if(changedItem.type == 'added') {
      // If we do not yet have this item, add it to the local storage
      if(!this.categoryIDS.some(i => i.id == content.id)) {
        this.itemsFormGroup.addControl(content.id, this.fb.control(content.text));
        var item = this.createNewInstance(content.orderNr);
        item.updateItemValue(content);
        this.categoryIDS.push(item);
      }
      // If we do have this item, update value locally
      else{
        var controllerValue = this.itemsFormGroup.controls[content.id].value;
        this.categoryIDS.find(e => e.id == content.id).updateItemValue(content);
        if(!(controllerValue == content.text)) {
          this.itemsFormGroup.controls[content.id].setValue(content.text);
        }
      }
    }
    if(changedItem.type =='modified') {
      this.itemsFormGroup.controls[content.id].setValue(content.text);
      // Update value of category id item
      this.categoryIDS.find(e => e.id == content.id).updateItemValue(content);
    }
  
  }) 
  // Delete all items not in the newlist, as these must have been removed from storage
  this.categoryIDS.forEach((element, index) => {
    if(!newList.includes(element.id) && !element.localOnly){
      this.categoryIDS.splice(index, 1);
      this.itemsFormGroup.removeControl(element.id);
    }

  });
  // Make sure category ids are in sorted order
  this.categoryIDS.sort((a,b) => a.orderNr - b.orderNr);
  // Add an empty box in the bottom of the list in order to be able to edit
  if(!this.bottomBoxActive()) {
    this.addBottomBox();
  }
}

// Check if we have a bottom box in the categoryIDS list
bottomBoxActive() {
  var found = this.categoryIDS.find(categoryId => categoryId.localOnly === true)
  if(found) {
    return true;
  }
  else {
    return false;
  }
}
  // Adds an empty box in the end of the screen
  // Does not add it to Firestore
  addBottomBox(){
    // We should never add a bottom box to a single item category
    if(!this.singleItemCategory){
    var newItemId: string = this.firestore.createId();
    // Add local control
    this.itemsFormGroup.addControl(newItemId,this.fb.control(""));
    var item = this.createNewInstance(this.categoryIDS.length);
    item.id = newItemId;
    this.categoryIDS.push(item);
    }
  }

  addEmptyBox(val: any) {
    // Find current value and see if it is empty. If user clicks on an empty field, add a new one.
    var currentValue = val.target.value;
    if(currentValue == "") {
      this.addBottomBox();
    }
  }
    // Deletes the item if empty when user loose focus. 
    removeEmptyItems(categoryItem: CategoryItem) {
      // We should only delete items if we can have more than one
      if(!this.singleItemCategory){
        // If item is local, delete in formcontrol and category box
        if(categoryItem.localOnly) {
          this.deleteLocal(categoryItem.id);
        }
        // If from firestore, delete from server
        else {
          this.deleteItem(categoryItem);
        }
      }
    }
  // Delete item from firestore and move all items below
  deleteItem(categoryItem) {
    // Save orderNr from category item 
    var orderNr = categoryItem.orderNr;
    // Delete item from firestore
    if(categoryItem.localOnly) {
      // Should not try to delete local item 
      console.log("Trying to delete local item. This should not be possible");
    }
    else {
      // TODO should also delete all subcollections!
      this.categoryReference.doc(categoryItem.id).delete();
    }
    // Go through all other items in category, move order nr by one.
    this.categoryIDS.forEach(element => {
      if(element.orderNr > orderNr && !element.localOnly) {
        // Decrease the order number by one
        element.orderNr = element.orderNr-1;
        this.updateItem(element);
      }
    });
  }

  getItems() {
    this.categoryReference.snapshotChanges().subscribe(changes => {this.dataRecievedFromFirestore(changes)});
  }



  updateItem(item: ItemType) {
    // If item text is empty, we should delete the item
    if(item.text === "") {
      this.deleteItem(item);
    }
    else {
      // If we try to update local item, it is not in Firestore yet. Therefore we should add it to firestore
      if(item.localOnly) {
        if(!item.id) {
          var docId = this.firestore.createId();
          item.id = docId;
        }
        //
        item.localOnly = false;
        this.categoryReference.doc(item.id).set(item.getFirestoreRep());
      }
      // If item is not local, it is already in Firestore. Therefore we should update it
      else {
        // We use update instead of set, as we only want to edit related fields
        this.categoryReference.doc(item.id).update(item.getFirestoreRep());
      }
    }
  }

  get categoryItems(){
    return this.categoryFormGroup.get("categoryItems") as FormArray;
  }
  addCategoryItem(){
    this.categoryItems.push(this.fb.control(''));
  }
}
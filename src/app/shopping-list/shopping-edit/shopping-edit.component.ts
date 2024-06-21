import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredients } from '../../shared/ingredients.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.scss'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  editedIndex: number;
  editMode: boolean = false;
  editedItem: Ingredients;
  @ViewChild('f', { static: true }) shoppongListForm: NgForm;
  constructor(private shoppingListService: ShoppingListService) {

  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedIndex = index;
      this.editedItem = this.shoppingListService.getIngredientByIndex(index);
      this.shoppongListForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredients(value.name, value.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedIndex, ingredient);
    }
    else {
      this.shoppingListService.addIngredient(ingredient);
    }

    this.editMode=false;
    form.reset();



  }

  onClear()
  {
    this.shoppongListForm.reset();
    this.editMode=false;
  }

  onDelete()
  {
    this.shoppingListService.deleteIngredient(this.editedIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss'
})
export class ShoppingListComponent implements OnInit{
 
  ingredients:Ingredients[]=[];

  constructor(private shoppingListService :ShoppingListService)
  {

  }

  ngOnInit(): void {
    this.ingredients=this.shoppingListService.getIngredients();
  }

  onEditItem(index:number)
  {
    this.shoppingListService.startedEditing.next(index);
  }
 
}

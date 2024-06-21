import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  
  recipes:Recipe[]=[];
 
  recipeSelected = new Subject<Recipe>();
  recipeChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService:ShoppingListService) { }

  getRecipes()
  {
    return this.recipes;
  }

  addIngredientsToShoppingList(ingredients:Ingredients[])
  {
   this.shoppingListService.addIngredinets(ingredients);
  }

  getRecipeById(id:number)
  {
    return this.recipes[id];
  }

  addRecipe(recipe:Recipe)
  {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes)
  }

  updateRecipe(index:number,newRecipe:Recipe)
  {
    this.recipes[index]=newRecipe;
    this.recipeChanged.next(this.recipes)
  }

  deleteRecipe(index:number)
  {
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes)
  }

  setRecipes(recipes:any)
  {
    this.recipes=recipes;
    console.log("recipes",this.recipes)
    this.recipeChanged.next(this.recipes);
  }

  
}

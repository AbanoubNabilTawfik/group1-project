import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit ,OnDestroy{
  selectedRecipe?:Recipe;

  recipeSubscription :Subscription;

  constructor(private recipeService:RecipeService)
  {

  }

  ngOnInit(): void {

   this.recipeSubscription= this.recipeService.recipeSelected.subscribe((recipe:Recipe)=>{
      this.selectedRecipe=recipe;
    });
    
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }

}

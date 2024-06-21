import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit{

  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes:Recipe[]=[];

  constructor(
         private recipeService:RecipeService,
         private router:Router,
         private activatedRoute:ActivatedRoute
        )
  {

  }

  ngOnInit(): void {
    //calling to the service
    this.recipes=this.recipeService.getRecipes();
    this.recipeService.recipeChanged.subscribe((recipes:Recipe[])=>{
      console.log("catched");
      console.log(recipes)
      this.recipes=recipes;
    })
  }
  
  // onRecipeSelected(recipe:Recipe)
  // {
  //   this.recipeWasSelected.emit(recipe);
  // }

  onNewRecipe()
  {
   this.router.navigate(["new"],{relativeTo:this.activatedRoute})
  }

}

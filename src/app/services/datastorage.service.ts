import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { BehaviorSubject, ObservableInput, exhaustMap, map, take } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class DatastorageService {


  constructor(private http: HttpClient, private recipeService: RecipeService,private authenticationService:AuthenticationService) { }


  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.post(
      'https://group1-project-4ee02-default-rtdb.firebaseio.com/recipes.json',
      recipes
    ).subscribe({
      next: response => {
        console.log(response);
      }
    })
  }

  fetchRecipes()
  {

    return this.authenticationService.user.pipe(
      take(1),
      exhaustMap(user=>{
         
        return this.http.get<{[key:string]:Recipe[]}>('https://group1-project-4ee02-default-rtdb.firebaseio.com/recipes.json').pipe(
          map((responseData:{[key:string]:Recipe[]})=>{
            const recipesArray:Recipe[]=[];
            for(const key in responseData)
              {
                if(responseData.hasOwnProperty(key))
                  {
                    recipesArray.push(...responseData[key])
                  }
              }
              return recipesArray;
          })
        )
      })
    ).subscribe({
      next:data=>{
        this.recipeService.setRecipes(data)
      }
    })



  }

}

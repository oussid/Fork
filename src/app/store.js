import { configureStore } from '@reduxjs/toolkit'
import recipeReducer from '../features/recipe/recipeSlice'
import RecipeFilterReducer from '../features/recipe/RecipeFilterSlice'
import RecipeQueryReducer from '../features/recipe/RecipeQuerySlice'
import SpecificRecipeReducer from '../features/recipe/SpecificRecipeSlice'
import RelatedRecipesReducer from '../features/recipe/RelatedRecipesSlice'

const store = configureStore({
    reducer: {
        recipe: recipeReducer,
        recipeFilter: RecipeFilterReducer,
        recipeQuery: RecipeQueryReducer,
        specificRecipe: SpecificRecipeReducer,
        relatedRecipes: RelatedRecipesReducer
    }
})

export default store
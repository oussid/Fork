import React from 'react'
import { useSelector } from 'react-redux'
import Loading from './Loading'
import shortid from 'shortid'
import { Link } from 'react-router-dom'
import RelatedRecipes from './RelatedRecipes'

export default function Result() {
    // recipes
    const state = useSelector(state => state.recipe)
    const recipesExist = state.recipesExist
    const recipes =recipesExist? state.recipes.hits : []
    const loading = state.loading
    const error = state.error
    // random recipes
    const randomRecipesState = useSelector(state => state.relatedRecipes)
    const randomRecipesError = randomRecipesState.error
    const randomRecipesLoading = randomRecipesState.loading

    // a function that filters the recipe uri and returns the id
    function getRecipeId(uri){
        // getting the id of #recipe_
        const uriIndex = uri.indexOf('#recipe_')
        // cutting a slice after "#recipe_" where the recipe id starts
        const id = uri.slice(uriIndex+uri.substring(uriIndex, uriIndex+8 ).length);
        // return the filtered id 
        return id
    }

  return (
    <>
    {/* show random recipes before search */}
    {/* first check if recipes aren't fetched yet (user did not search)*/}
    {(!recipesExist && !loading) && <>

        {/* show random recipes */}
        <RelatedRecipes/>
    </> }

    <div className='recipe-results'>
        {/* show loader animation if status is loading */}
        {loading && <Loading />}
        {/* show error message if something wrong happened */}
        {error.length > 0 && <p className='error-text'>{error}</p>}
        {/* show recipes if status is fulfilled */}
        {recipes.map(recipe =>{
            return <Link to={'/recipe/'+getRecipeId(recipe.recipe.uri)} style={{ color: 'inherit', textDecoration: 'none' }} key={shortid.generate()}>
                <div  className='recipe'>
                        <div className='recipe-img'>
                            <img src={recipe.recipe.image} alt={recipe.recipe.label}/>
                        </div>
                        <div className='recipe-body'>
                            <div className='recipe-calories'>
                                <p>{Math.round(recipe.recipe.calories) } calories</p>
                            </div>
                            <div className='recipe-label'>
                                <p>{recipe.recipe.label}</p>
                            </div>
                            <div className='recipe-cuisine'>
                                <p>{recipe.recipe.cuisineType} cuisine</p>
                            </div>
                        </div>
                        
                    </div>
            </Link>                                           
        })}
    </div>      
    </>
  )
}

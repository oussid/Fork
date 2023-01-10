import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import shortid from 'shortid'
import { fetchRelatedRecipes } from '../RelatedRecipesSlice'
import Loading from './Loading'

export default function RelatedRecipes() {
    
    const dispatch = useDispatch()
    // related recipes
    const relatedRecipesState = useSelector(state => state.relatedRecipes)
    const recipesExist = relatedRecipesState.recipesExist
    const relatedRecipes =recipesExist? relatedRecipesState.relatedecipes.hits : []
    const randomRecipesError = relatedRecipesState.error
    const randomRecipesLoading = relatedRecipesState.loading
    // filter from state
    const filter = useSelector(state => state.recipeFilter)

    // get random recipes when the page first loads 
    useEffect(()=>{
        dispatch(fetchRelatedRecipes())
    }, [])
    
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
    <div className='recipe-results '>
        {randomRecipesLoading && <Loading />}
        {randomRecipesError>0 && <p>randomRecipesError</p> }
        {relatedRecipes.map(recipe =>{
            return <Link to={'/recipe/'+getRecipeId(recipe.recipe.uri)} style={{ color: 'inherit', textDecoration: 'none' }} key={shortid.generate()}>
                <div  className='recipe'>
                        <div className='recipe-img'>
                            <img  src={recipe.recipe.image} alt={recipe.recipe.label}/>
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
  )
}

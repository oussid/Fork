import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import shortid from 'shortid'
import { useParams } from 'react-router-dom'
import { fetchRecipe } from '../SpecificRecipeSlice'
import Loading from './Loading'

export default function Header() {
    // const params = useParams()
    const dispatch = useDispatch()
    const recipe = useSelector(state => state.specificRecipe.recipe)
    const loading = useSelector(state => state.specificRecipe.loading)
    const error = useSelector(state => state.specificRecipe.error)
    const recipeExist = useSelector(state => state.specificRecipe.recipeExist)
    const {id} = useParams()


    useEffect(() => {
        dispatch(fetchRecipe(id))
        window.scrollTo(0, 0);
    }, [id])

  return (
    
    <div className='details-header'>
    {/* show loader when loading */}
    {loading && <Loading />}
        
    {/* show recipe details if exists */}
        {recipeExist && <>
        <div className='header-title'>
            <p>{recipe.label}</p>
        </div>

        <div className='header-body'>
            <div className='header-img'>
            <img  src={recipe.image} alt='recipe'/>
            </div> 
            <div className='header-quickview'>
                {recipe.healthLabels.map((label, i) => {
                   return i < 6 &&
                    <div key={shortid.generate()} className='fact'>{label}</div>
                })}
            </div>
        </div>
            </>  
        }
    </div>
    
  )
}

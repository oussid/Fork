import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecipes } from '../recipeSlice';

export default function Test() {
    const loading = useSelector((state) => state.recipe.loading)
    const recipes = useSelector((state) => state.recipe.recipes)
    const error = useSelector((state) => state.recipe.error)

    const dispatch = useDispatch()
  return (<>
  <h1>list of recipes</h1>
    <button onClick={()=>dispatch(fetchRecipes('cake'))}>fetch</button>
    {recipes.map((recipe, i) => {
      return <p key={i}>{recipe.recipe.label}</p>
    })}
    {loading && <p>loading...</p>}
  </>
  )
}

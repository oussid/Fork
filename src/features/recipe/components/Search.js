import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {FiSearch} from 'react-icons/fi'
import { setQuery } from '../RecipeQuerySlice'
import { fetchRecipes } from '../recipeSlice'

export default function Search() {
  const query = useSelector(state => state.recipeQuery.query)
  const filter = useSelector(state => state.recipeFilter)
  const dispatch = useDispatch()

  function handleClick () {
    if(query.length > 0 ){

      dispatch(fetchRecipes({query: query, filter: filter}))
    }
  }

  function handleSubmit (event) {
    event.preventDefault()
    if(query.length > 0 ){
      dispatch(fetchRecipes({query: query, filter: filter}))
    }
  }



  return (
    <form onSubmit={(event)=>handleSubmit(event)}  className='search-area'>
      <input type={'text'} value={query} onChange={(event)=> dispatch(setQuery(event.target.value)) }/>
      <button onClick={()=>handleClick()}><FiSearch size={'1.7rem'}/></button>
    </form>

  )
}

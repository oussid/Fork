import React, { useEffect, useRef, useState } from 'react'
import {ImCheckboxUnchecked, ImCheckboxChecked} from 'react-icons/im'
import {FaChevronDown, FaChevronUp} from 'react-icons/fa'
import { filters } from '../../../app/recipeConstants'
import { useDispatch, useSelector } from 'react-redux'
import { addFilter } from '../RecipeFilterSlice'
import { fetchRecipes } from '../recipeSlice'
import { useClickAway } from 'react-use'

export default function Filter() {
    
    const filter = useSelector(state => state.recipeFilter)
    const query = useSelector(state => state.recipeQuery.query)
    const recipesExist = useSelector(state => state.recipe.recipesExist)
    const [filterVisibilty, setFilterVisibilty] = useState(false)
    const dispatch = useDispatch()

    const randomRecipesState = useSelector(state => state.relatedRecipes)
    const randomRecipesExist = randomRecipesState.recipesExist

    // a ref to the filter selector so that it doesn't disappear when clicking on it
    const filterRef = useRef();

    useClickAway(filterRef, () => {
        // Hide the component
        setFilterVisibilty(false);
      });






    function applyFilter(){
        // hiding the filter selector
        setFilterVisibilty(prevFilterVisibilty=> !prevFilterVisibilty)
        // dispatch an action to fetch recipes using the query and filters from the store
        dispatch(fetchRecipes({query: query, filter: filter}))
    }


  return (
    // recipesExist means that the user has searched for recipes 
    (recipesExist || randomRecipesExist) && <div className='filter-area' ref={filterRef}>
        <button onClick={()=> setFilterVisibilty(prevFilterVisibilty=> !prevFilterVisibilty) } className='filter-btn'>Filter by {filterVisibilty? <FaChevronUp/>: <FaChevronDown/>} </button>
        {filterVisibilty && <div className='filter-selector' >
            {/* mapping through list of filters declared in recipeConstants.js */}
            {filters.map(fltr => {
                return (
                <div key={fltr.id} className='filter-selector-part'>
                    <div className='filter-heading'>
                        <p>{fltr.name}</p>
                    </div>

                    <div className='filter-filters'>
                    {fltr.values.map(val=>{
                        return (
                            <div key={val.id} className='filter-filter'>
                                <button className='filter-checkbox'  onClick={()=>dispatch(addFilter({filterName: fltr.queryName, filterValue:val.queryName}))}> {filter[fltr.queryName].includes(val.queryName) ? <ImCheckboxChecked  color='#b01e68'/> : <ImCheckboxUnchecked  color='#b01e68'/>}  </button> 
                                <p className='filter-label'>{val.name}</p>
                            </div>
                            ) 
                        })} 
                    </div>
                </div>           
                )
            })} 
            <button onClick={()=>applyFilter()} className='apply-filter-btn'>Apply</button>        
        </div>}
    </div>
  )
}

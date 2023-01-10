import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    diet: [],
    health: [],
    cuisineType: []
}


const RecipeFilterSlice = createSlice(
    {
        name:'RecipeFilter', 
        initialState,
        reducers: {
            addFilter: (state, action)=>{
                if(!state[action.payload.filterName].includes(action.payload.filterValue)){
                    state[action.payload.filterName].push(action.payload.filterValue)
                }else{
                    state[action.payload.filterName] = state[action.payload.filterName].filter(filterVal => filterVal !== action.payload.filterValue)
                }
            }
        }

    }
)

export const {addFilter} = RecipeFilterSlice.actions
export default RecipeFilterSlice.reducer
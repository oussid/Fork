import { createSlice } from "@reduxjs/toolkit";

const initialState = {query: ''}


const RecipeQuerySlice = createSlice(
    {
        name:'RecipeQuery', 
        initialState,
        reducers: {
            setQuery: (state, action)=>{
                state.query = action.payload
            }
        }

    }
)

export const {setQuery} = RecipeQuerySlice.actions
export default RecipeQuerySlice.reducer
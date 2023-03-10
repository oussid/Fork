import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// api configuration 
const app_id = '716b11be'
const app_key = '9abd4aeb0e467e35e9efce77856643e7'

// initial state
const initialState = {
    loading: false,
    recipe: {},
    recipeExist:false,
    error: ''
}

// generates pending, fulfilled, and rejected action types
export const fetchRecipe = createAsyncThunk('recipe/fetchRecipe', (id)=>{
    // generate api end point
    let endPoint = `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${app_id}&app_key=${app_key}`

    // sending request
    return axios.get(endPoint)
    .then(response => response.data.recipe)
})

// recipe slice 
// the reducers are not generated by the slice and have to be added as extra reducers
const specificRecipeSlice = createSlice(
    {
        name: 'specificRecipe',
        initialState, 
        extraReducers: builder => {
            builder.addCase(fetchRecipe.pending, (state) => {
                state.loading = true
                state.recipe = {}
                state.recipeExist = false
                state.error = ''
            })
            builder.addCase(fetchRecipe.fulfilled, (state, action) => {
                state.loading = false
                state.recipe = action.payload
                state.recipeExist = true
                state.error = ''
            })
            builder.addCase(fetchRecipe.rejected, (state, action)=>{
                state.loading = false
                state.recipe = {}
                state.recipeExist = false
                state.error = action.error.message
            })
        }
    }
)

export default specificRecipeSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// api configuration 
const app_id = '716b11be'
const app_key = '9abd4aeb0e467e35e9efce77856643e7'

// initial state
const initialState = {
    loading: false,
    relatedecipes: [],
    recipesExist: false,
    error: ''
}

// generates pending, fulfilled, and rejected action types
export const fetchRelatedRecipes = createAsyncThunk('recipe/fetchRelatedRecipes', ()=>{
    
    // array of queries 
    const queries = [
        'dinner',
        'lunch',
        'breakfast',
        'dessert',
        'appetizers',
        'snacks',
        'side dishes',
        'drinks',
        'soups',
        'stews',
        'chilis',
        'casseroles',
        'curries',
        'stir fries',
        'grilled',
        'roasted',
        'baked',
        'sauteed',
        'stuffed',
        'marinated',
        'braised',
        'slow cooked',
        'barbecue',
        'fried',
        'vegetarian',
        'vegan',
        'paleo',
        'keto',
        'gluten-free',
        'dairy-free',
        'low carb',
        'low fat',
        'high protein'
      ];
      
    // generate a random index to get a random query
    const randomIndex = Math.floor(Math.random() * queries.length)
    const query = queries[randomIndex]
        
    // generate api end point
    const endPoint = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${app_id}&app_key=${app_key}`

    // sending request
    return axios.get(endPoint)
    .then(response => response.data)
})

// recipe slice 
// the reducers are not generated by the slice and have to be added as extra reducers
const relatedRecipeSlice = createSlice(
    {
        name: 'recipe',
        initialState, 
        extraReducers: builder => {
            builder.addCase(fetchRelatedRecipes.pending, (state) => {
                state.loading = true
                state.relatedecipes = []
                state.recipesExist = false
                state.error = ''
            })
            builder.addCase(fetchRelatedRecipes.fulfilled, (state, action) => {
                state.loading = false
                state.relatedecipes = action.payload
                state.recipesExist = true
                state.error = ''
            })
            builder.addCase(fetchRelatedRecipes.rejected, (state, action)=>{
                state.loading = false
                state.relatedecipes = []
                state.recipesExist = false
                state.error = action.error.message
            })
        }
    }
)

export default relatedRecipeSlice.reducer;
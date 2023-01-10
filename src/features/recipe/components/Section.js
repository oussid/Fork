import React from 'react'
import { useSelector } from 'react-redux'
import shortid from 'shortid'
import RelatedRecipes from './RelatedRecipes'


export default function Section() {
  const recipeExist = useSelector(state => state.specificRecipe.recipeExist)
  const recipe = useSelector (state => state.specificRecipe.recipe)

  return recipeExist && <>
    <div className='section'>
      <div className='section-title'>
        <p>Ingredients</p>
      </div>
      
      <div className='section-body'>
        <div className='ingredients'>
          {
            recipe.ingredients.map(ingredient => {
              return <div key={shortid.generate()} className='ingredient'>
                <div className='ingredient-img'>
                  <img width={'50px'} src={ingredient.image} alt='ingredient'/>
                </div>
                <div className='ingredient-text'>{ingredient.text}</div>
              </div>
              
            })
          }
        </div>
      </div>

        <div className='section-title'>
          <p>Instructions</p>
        </div>

        <div className='section-body'>
          <p className='instructions'>Visit <a href={recipe.url} target='_blank' rel='noreferrer' >{recipe.source}</a> for detailed Instructions.</p>
        </div>

        <div className='section-title extra-mb'>
          <p>More recipes</p>
        </div>

          {recipeExist && <RelatedRecipes/>}
   </div>     
    </> 

    
  
}

import { useState } from 'react'
import './Main.css'
import Recipe from '../CloadRecipe/Recipe'
import ListIngredients from '../IngredientList/ListIngredient'
import { getRecipeFromMistral } from '../../ai'

export default function Main() {
    const [ingredients, setIngredient] = useState([])
    const [showRecipe, setRecipeShown] = useState('')

    const ingredientList = ingredients.map(ingredient => (
        <li key={ingredient}> {ingredient} </li>
    ))
    
    function addIngredient(formData) {
        const newIngredient = formData.get('ingredient')
        setIngredient(prevIngridient => [...prevIngridient, newIngredient])
    }

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        console.log(recipeMarkdown)
        setRecipeShown(recipeMarkdown)

    }
    

    return(
        <main>
            <form className="ingredient-form" action={addIngredient}>
                <input
                    type="text"
                    placeholder="Add ingredient e.g Orange"
                    name='ingredient'
                />
                <button>Add Ingredient</button>
            </form>

            {/* <ul>
                {ingredientList}
            </ul> */}

            { ingredients.length > 0 ?
                <ListIngredients 
                    length={ingredients.length}
                    ingredient={ingredientList}
                    getRecipe={ getRecipe }
                /> : null   
            }

            {showRecipe && <Recipe recipe = {showRecipe} /> }
        </main>
    )
}
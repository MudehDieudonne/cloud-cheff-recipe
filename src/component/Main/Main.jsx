import { useState } from 'react'
import './Main.css'
import Recipe from '../CloadRecipe/Recipe'
import ListIngredients from '../IngredientList/ListIngredient'
import { getRecipeFromMistral } from '../../ai'
import { Loading } from '../Loader/Loader'

export default function Main() {
    const [ingredients, setIngredient] = useState([])
    const [showRecipe, setRecipeShown] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const ingredientList = ingredients.map(ingredient => (
        <li key={ingredient}> {ingredient} </li>
    ))
    
    function addIngredient(formData) {
        const newIngredient = formData.get('ingredient')
        setIngredient(prevIngridient => [...prevIngridient, newIngredient])
    }

    async function getRecipe() {
        try {
            setIsLoading(true)
            const recipeMarkdown = await getRecipeFromMistral(ingredients)
            setRecipeShown(recipeMarkdown)
        } catch (error) {
            console.error("Error fetching recipe:", error)
        } finally {
            setIsLoading(false)
        }
        

    }
    

    return(
        <main>
            <form className="ingredient-form" action={addIngredient}>
                <input
                    type="text"
                    placeholder="Add ingredient e.g Orange"
                    name='ingredient'
                    required
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
                    isLoading={isLoading}
                /> : null   
            }

            {isLoading && ( <Loading /> )}

            {showRecipe && !isLoading && <Recipe recipe = {showRecipe} /> }
        </main>
    )
}
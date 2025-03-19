import { useState } from 'react'
import './Main.css'
import Recipe from '../CloadRecipe/Recipe'
import ListIngredients from '../IngredientList/ListIngredient'

export default function Main() {
    const [ingredients, setIngredient] = useState([])
    const [showRecipe, setRecipeShown] = useState(false)

    const ingredientList = ingredients.map(ingredient => (
        <li key={ingredient}> {ingredient} </li>
    ))
    
    function addIngredient(formData) {
        const newIngredient = formData.get('ingredient')
        setIngredient(prevIngridient => [...prevIngridient, newIngredient])
    }

    function toggleShowRecipe (){
        setRecipeShown(prevShown => !prevShown)
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
                    toggle={toggleShowRecipe}
                /> : null   
            }

            {showRecipe && <Recipe /> }
        </main>
    )
}
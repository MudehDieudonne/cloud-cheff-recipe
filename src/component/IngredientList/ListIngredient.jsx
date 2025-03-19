export default function ListIngredients(props) {
    return(
        <section className='ingredient-display'>
            <h2>Ingredient on hand:</h2>
            <ul className='ingredient-list' aria-label='polite'> {props.ingredient}</ul>
                {props.length > 3 && <div className='get-recipe-container'>
                    <div className='recipe-cap'>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={props.toggle} className='recepie-btn'>Get a recipe</button>                           
                </div>}
        </section> 
    )
}
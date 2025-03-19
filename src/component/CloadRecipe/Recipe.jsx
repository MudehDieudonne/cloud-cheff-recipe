import Markdown from "react-markdown"
import './Recipe.css'

export default function Recipe(props) {
    return (
        <section className='suggested-recipe-container'>
           <Markdown>{props.recipe}</Markdown> 
        </section>
    )
}
import { useState } from "react";

export default function RecipeGen() {
    const [ingredients, setIngredients] = useState('');
    const [cuisine, setCuisine] = useState('any')
    const [dietaryRestrictions, setDietaryRestrictions] = useState('')
    const [recipe, setRecipe] = useState('')
            
    const createRecipe = async () =>{
        try{
            const response = await fetch(`http://localhost:8080/recipe-creator?ingredients=${ingredients}&cuisine=${cuisine}&dietaryRestrictions=${dietaryRestrictions}`)
            const data = await response.text()
            console.log(data)
            setRecipe(data)
        }
        catch (error){
            console.log("Error generating recipe: ", error)
        }
    }

  return (
    <div>
        <h2>RecipeGen</h2>

        <input type="text"
        value={ingredients}
        onChange={e => setIngredients(e.target.value)}
        placeholder="what's ur cooking?"/>

        <input type="text"
        value={cuisine}
        onChange={e => setCuisine(e.target.value)}
        placeholder="what's ur type?"/>

        <input type="text"
        value={dietaryRestrictions}
        onChange={e => setDietaryRestrictions(e.target.value)}
        placeholder="what should i avoid?"/>

        <button onClick={createRecipe}>
            Cookin!
        </button>

        <div className="output">
            <pre className="recipe-text">{recipe}</pre>
        </div>
    </div>
  
  )
}
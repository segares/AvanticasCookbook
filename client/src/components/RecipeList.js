import '../App.css';
import Recipe from './Recipe.js';

function RecipeList(props) {
  const recipesData = props.recipesData;
  if (!recipesData || !Array.isArray(recipesData)) {
    return <h1>Not recipes</h1>;
  }
  const recipes = recipesData.map((recipe) => (
    <div key={recipe.recipeid}>
      <Recipe recipe={recipe} />
    </div>
  ));
  return <div className="recipesContainer">{recipes}</div>;
}

export default RecipeList;

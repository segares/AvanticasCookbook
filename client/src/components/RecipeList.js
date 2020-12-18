import '../App.css';
import Recipe from './Recipe.js';

function RecipeList(props) {
  const recipesData = props.recipesData;
  if (!recipesData || !Array.isArray(recipesData)) {
    return <h1>Not recipes found</h1>;
  }
  const recipes = recipesData.map((recipe, i) => (
    <div key={i}>
      <Recipe recipe={recipe} />
    </div>
  ));
  return <div className="recipesContainer">{recipes}</div>;
}

export default RecipeList;

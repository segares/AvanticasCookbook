import './App.css';
import jsonRecipes from './listRecipes.json'

function App() {
  return (
    <div>
    <Filters />
    <RecipeList recipesData={jsonRecipes} />
  </div>

  );
}

class ShoppingList extends React.Component {

  componentDidMount() { 
localhost:3000

   }

  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <l5836i>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

function Filters(props) {
  return <div className="filters">
    <label for="element_2">Category </label>
    <select id="element_2" name="element_2">
      <option value="" selected="selected"></option>
      <option value="1">All Recipes</option>
      <option value="2">Pastas</option>
      <option value="3">Salads</option>
      <option value="4">Meat</option>
      <option value="5">Desserts</option>
    </select>

    <label for="element_1">Recipe Name: </label>
    <input id="element_1" name="element_1" type="text" maxlength="255" value="" />
    <button onclick="location.href = 'createRecipe.html';" id="newRecipe" >New</button>

  </div>
}

function RecipeList(props) {
  const recipesData = props.recipesData;
  const recipes = recipesData.map((recipe) =>
    <div>
      <img src={recipe.picture} alt="Recipe." />
      <div>{recipe.recipeName}</div>
      <div>{recipe.categoryName}</div>
    </div>
  );
  return <div className="recipesContainer">{recipes}</div>;
}




export default App;

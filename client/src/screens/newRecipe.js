import '../App.css';
import axios from 'axios';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import CategorySelect from '../components/CategorySelect';

class RecipeForm extends React.Component {
    render() {
        return (
            <form id="newRecipeForm" method="post" action="">
                <div class="recipeForm">
                    <FormControl>
                        <TextField label="Recipe Name" variant="outlined" id="recipeName" name="recipeName" />
                    </FormControl>
                    <FormControl>
                        <TextField label="Cheff Name" variant="outlined" id="cheffName" name="elecheffNamement_1" />
                    </FormControl>
                    <FormControl >
                        <CategorySelect />
                    </FormControl>

                    <FormControl>
                        <TextField label="Ingredient1" variant="outlined" id="ing1" name="ing1" />
                    </FormControl>

                    <FormControl>
                        <TextField label="Ingredient2" variant="outlined" id="ing2" name="ing2" />
                    </FormControl>

                    <FormControl>
                        <TextField label="Preparation" variant="outlined" id="preparation" name="preparation" />
                    </FormControl>

                    <FormControl>
                        <Button variant="contained" color="primary" onclick="location.href = 'createRecipe.html';" id="newRecipe" >Save</Button>
                    </FormControl>
                </div>
            </form>
        );
    }
}



export default RecipeForm;
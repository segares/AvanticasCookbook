import '../App.css';
import React from 'react';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Image from 'material-ui-image';

class ShowRecipe extends React.Component {
  constructor(props) {
    super(props);
    const { recipe } = this?.props?.location?.state || {};
    const {
      recipename = '',
      picture = '',
      cheffname = '',
      categoryname = 'All Recipes',
      ingredients = [],
      recipeid = '',
      preparation = '',
      rating = 0,
    } = recipe || {};
    this.state = {
      picture,
      recipename,
      cheffname,
      categoryname,
      ingredients,
      recipeid,
      preparation,
      rating,
    };
  }

  handleRateRecipe(){
    const instance = axios.create({
      baseURL: process.env.REACT_APP_SERVER,
    });
    instance
      .post(`/rateRecipe`, {
        recipeid: this.state.recipeid,
        reviewvalue: this.state.rating,
      })
      .then((res) => {})
      .catch((error) => alert('Error rating the recipe'));
  }

  render() {
    return (
      <div className="recipe">
        <div className="recipePicture">
          <Image src={this.state.picture} />
        </div>
        <Typography variant="h3" gutterBottom>
          {this.state.recipename}
        </Typography>
        <Typography variant="h4" gutterBottom>
          {this.state.cheffname}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Category: {this.state.categoryname}
        </Typography>
        <div className="ingredients">
          <Typography variant="h5" gutterBottom>
            Ingredients:
          </Typography>
          {this.state.ingredients.map((ingredient) => (
            <Typography id={ingredient.name} variant="h6" gutterBottom>
              {ingredient.quantity} {ingredient.name}
            </Typography>
          ))}
        </div>

        <Typography variant="h6" gutterBottom>
          {this.state.preparation}
        </Typography>

        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend">Rating:</Typography>
          <Rating
            id="rating"
            name="rating"
            value={this.state.rating}
            onChange={(event) => this.setState({ [event.target.name]: event.target.value })}
            onClick={() => {
              this.handleRateRecipe();
            }}
          />
        </Box>
      </div>
    );
  }
}

export default ShowRecipe;

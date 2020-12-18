import '../App.css';
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import CategorySelect from './CategorySelect.js';
import { withRouter } from 'react-router-dom';

class Filters extends React.Component {
  constructor(props) {
    super(props);

    this.state = { recipeName: '', category: '' };
    this.searchHandler = this.props.searchHandler;
  }

  redirectToRecipeForm = () => {
    const { history } = this.props;
    if (history) history.push('/newRecipe');
  };

  render() {
    return (
      <div className="filters">
        <CategorySelect
          categoryname={this.state.category}
          onChange={(event) => this.setState({ categoryname: event.target.value })}
        />
        <FormControl>
          <TextField
            label="Recipe"
            variant="outlined"
            id="recipeName"
            name="recipeName"
            maxLength="255"
            value={this.state.recipeName}
            onChange={(event) => this.setState({ [event.target.name]: event.target.value })}
          />
        </FormControl>
        <FormControl>
          <Button
            variant="contained"
            color="primary"
            id="searchRecipe"
            onClick={() => {
              this.searchHandler(this.state.recipeName);
            }}>
            Search
          </Button>
        </FormControl>
        <FormControl>
          <Button
            variant="contained"
            color="primary"
            id="newRecipe"
            onClick={() => this.redirectToRecipeForm()}>
            New
          </Button> 
        </FormControl>
      </div>
    );
  }
}

export default withRouter(Filters);

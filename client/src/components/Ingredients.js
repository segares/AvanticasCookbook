import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

export default class Ingredients extends React.Component {
  constructor(props) {
    super(props);
    const { ingredients, handleAddIngredient } = this.props;
    this.state = { ingredientName: '', quantity: '', ingredients };
    this.handleAddIngredient = handleAddIngredient;
  }

  deleteItem(i) {
    const { ingredients } = this.state;
    ingredients.splice(i, 1);
    this.setState({ ingredients });
  }

  render() {
    return (
      <div>
        <div className="ingredientsControls">
          <FormControl>
            <TextField
              label="Name"
              variant="outlined"
              id="ingredientName"
              name="ingredientName"
              maxLength="255"
              size="small"
              value={this.state.ingredientName}
              onChange={(event) => this.setState({ [event.target.name]: event.target.value })}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Quantity"
              variant="outlined"
              id="quantity"
              name="quantity"
              maxLength="255"
              size="small"
              value={this.state.quantity}
              onChange={(event) => this.setState({ [event.target.name]: event.target.value })}
            />
          </FormControl>
          <FormControl>
            <Button
              variant="contained"
              color="primary"
              id="newIngredinet"
              size="large"
              onClick={() => {
                this.handleAddIngredient(this.state.ingredientName, this.state.quantity);
              }}>
              {' '}
              Add
            </Button>
          </FormControl>
        </div>

        <TableContainer className="ingredientsTable" component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Ingredient</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(this.state.ingredients) &&
                this.state.ingredients.map((ingredient, i) => (
                  <TableRow id={ingredient.name} key={ingredient.name}>
                    <TableCell component="th" scope="row">
                      {ingredient.name}
                    </TableCell>
                    <TableCell>{ingredient.quantity}</TableCell>
                    <TableCell>
                      <Button onClick={this.deleteItem.bind(this, i)} color="secondary">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

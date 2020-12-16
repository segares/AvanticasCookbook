import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

function CategoryList(props) {
  var { categoryname = 'All Recipes', onChange } = props;
  console.log('CATEGORY', categoryname)
    return (
    <FormControl>
      <InputLabel id="categoryLabel">Category</InputLabel>
      <Select
        value={categoryname}
        id="categoryname"
        name="categoryname"
        labelId="categoryLabel"
        onChange={onChange}>
        <MenuItem value='All Recipes'>All Recipes</MenuItem>
        <MenuItem value='Pasta'>Pastas</MenuItem>
        <MenuItem value='Salad'>Salads</MenuItem>
        <MenuItem value='Meat'>Meat</MenuItem>
        <MenuItem value='Dessert'>Desserts</MenuItem>
      </Select>
    </FormControl>
  );
}

export default CategoryList;

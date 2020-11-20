import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

function CategoryList() {
    return (
      <FormControl>
        <InputLabel id="categoryLabel">Category</InputLabel>
        <Select value="0" id="element_2" name="element_2" labelId="categoryLabel">
          <MenuItem value={0}>All Recipes</MenuItem>
          <MenuItem value={1}>Pastas</MenuItem>
          <MenuItem value={2}>Salads</MenuItem>
          <MenuItem value={3}>Meat</MenuItem>
          <MenuItem value={4}>Desserts</MenuItem>
        </Select>
      </FormControl>
    )
  }

export default CategoryList;
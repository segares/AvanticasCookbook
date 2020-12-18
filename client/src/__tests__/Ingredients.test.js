import React from 'react';
import { mount } from 'enzyme';
import '../setupTests';
import Ingredients from '../components/Ingredients.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TableRow from '@material-ui/core/TableRow';

describe('<Ingredients />', () => {
  it('ingredients table should show 3 rows (header + 2 ingredients)', () => {

    const ingredients = [
      { ingredientName: 'Masa', quantity: '500g' },
      { ingredientName: 'Carne', quantity: '1k' },
    ];
    const wrapper = mount(<Ingredients ingredients={ingredients} />);
    expect(wrapper.find(TableRow)).toHaveLength(3);
  });

  it('should should add an ingredient (row) to the table when clicking Add', () => {
   
    const ingredients = [];
    const wrapper = mount(<Ingredients ingredients={ingredients} />);
    wrapper.find(TextField).at(0).simulate("change", { target: { value: "Masa" }})
    wrapper.find(TextField).at(1).simulate("change", { target: { value: "500g" }})
    wrapper.find(Button).first().simulate('click');
    expect(wrapper.find(TableRow)).toHaveLength(2);
  });
});

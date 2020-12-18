import React from 'react';
import { shallow } from 'enzyme';
import '../setupTests';
import RecipeList from '../components/RecipeList.js';
import Recipe from '../components/Recipe.js';
import Select from '@material-ui/core/Select';

describe('<RecipeList />', () => {
  it('should show No Recipes message when no Recipes passed', () => {
    const recipes = { recipename: 'Tamales', cheffname: 'Carlos S.' };
    const wrapper = shallow(<RecipeList recipesData={recipes} />);
    expect(wrapper.find('h1').text()).toEqual('Not recipes found');
  });

  it('should show recipes if there is a value passed', () => {
    const recipes = [{recipename: 'Tamales', cheffname: 'Carlos S.'},{recipename: 'Queque', cheffname: 'John Doe.'}] ;
    const wrapper = shallow(<RecipeList recipesData={recipes} />);
    expect(wrapper.find(Recipe)).toHaveLength(2);
  });
});

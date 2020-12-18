import React from 'react';
import { shallow } from 'enzyme';
import '../setupTests';
import Recipe from '../components/Recipe.js';
import CardHeader from '@material-ui/core/CardHeader';

describe('<Recipe />', () => {
  it('should show passed value in select box', () => {
    const recipe = { recipename: 'Tamales', cheffname: 'Carlos S.' };
    const wrapper = shallow(<Recipe recipe={recipe} />);
    expect(wrapper.find(CardHeader).prop('title')).toEqual(recipe.recipename);
    expect(wrapper.find(CardHeader).prop('subheader')).toEqual(recipe.cheffname);
  });

});

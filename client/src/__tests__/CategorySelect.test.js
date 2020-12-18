import React from 'react';
import { shallow } from 'enzyme';
import '../setupTests';
import CategorySelect from '../components/CategorySelect.js';
import Select from '@material-ui/core/Select';

describe('<CategorySelect />', () => {
  it('should show passed value in select box', () => {
    const wrapper = shallow(<CategorySelect categoryname="Meat" />);
    expect(wrapper.find(Select).prop('value')).toEqual('Meat');
  });

  it('should show default value in select box', () => {
    const wrapper = shallow(<CategorySelect />);
    expect(wrapper.find(Select).prop('value')).toEqual('All Recipes');
  });
});

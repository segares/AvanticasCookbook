import React from 'react';
import { shallow } from 'enzyme';
import "../setupTests"
import CategorySelect from '../components/CategorySelect.js'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createMount } from '@material-ui/core/test-utils';
import { ThemeProvider } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';


describe('<CategorySelect />', () => {

  it('should show passed value in select box', () => {
    const wrapper = shallow(<CategorySelect categoryname = 'Meat'/>);
    expect(wrapper.find(Select).prop('value')).toEqual('Meat')
  });

  it('should show default value in select box', () => {
    const wrapper = shallow(<CategorySelect />);
    const test = wrapper.find(Select);
    console.log('WRAPPER', Object.getOwnPropertyNames(test))
    expect(wrapper.find(Select).text()).toEqual('All Recipes');
    
  });
}); 


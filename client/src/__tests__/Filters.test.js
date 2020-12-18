import React from 'react';
import { mount } from 'enzyme';
import '../setupTests';
import Filters from '../components/Filters.js';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<Filters />', () => {
  it('should call search when clicking button', () => {
    const searchHandler = jest.fn();
    const wrapper = mount(
      <Router>
        <Filters searchHandler={searchHandler} />
      </Router>
    );
    wrapper.find(Button).first().simulate('click');
    expect(searchHandler).toBeCalled();
  });
});

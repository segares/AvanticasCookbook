//import React from 'react';
import { shallow } from 'enzyme';
import "../src/setupTests"
import CategorySelect from '../src/components/CategorySelect.js'
import Select from '@material-ui/core/Select';
import { createMount } from '@material-ui/core/test-utils';
import { ThemeProvider } from '@material-ui/core/styles';

/* 
describe('<CategorySelect />', () => {



  it('should show passed value in select box', () => {
    const wrapper = shallow(<CategorySelect categoryname = 'Meat'/>);
    expect(wrapper.find(Select)).toBe('Meat')
  });
  it('should show default value in select box', () => {
    const wrapper = shallow(<CategorySelect />);
    expect(wrapper.find(Select)).toBe('All Recipes');
  });
}); */

describe('<MyComponent />', () => {
  let mount;

  function MySuccessButton({ children }) {
    return (
      <ThemeProvider theme={{ success: { main: '#fff' } }}>
        {children}
      </ThemeProvider>
    );
  }

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should work', () => {
    const wrapper = mount(<MockedTheme><MySuccessButton /></MockedTheme>);
  });
});

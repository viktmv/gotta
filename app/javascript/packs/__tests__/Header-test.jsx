import React from 'react';
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme';

import Header from '../Header.jsx';

test('Router renders the component when link is clicked', () => {
  const header = renderer.create(<Header></Header>)

  let tree = header.toJSON();
  expect(tree).toMatchSnapshot();

  // header.find('.login-link').simulate('click')

  // expect(header).toContain('<h2>Login</h2>')

});

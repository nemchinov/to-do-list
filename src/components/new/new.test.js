import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import NewUser from './new.js';

describe('New user', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NewUser></NewUser>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('snapshot', () => {
    const component = renderer.create(<NewUser></NewUser>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
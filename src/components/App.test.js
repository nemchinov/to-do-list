/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { App } from './App';

const PROPS = {
  loadTasks() { return null; },
  taskList: [{
    id: 1,
    title: 'New title',
    text: 'New text',
    complited: false
  }, {
    id: 2,
    title: 'New title 2',
    text: 'New text 2',
    complited: true
  }, {
    id: 3,
    title: 'New title 2',
    text: '',
    complited: false
  }],
  order: 'asc'
};

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App {...PROPS} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('snapshot', () => {
    const component = renderer.create(<App {...PROPS} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
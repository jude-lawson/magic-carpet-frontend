import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import App from '../App';
import Login from '../components/Login'
import Main from '../components/Main'


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the login content if not logged in', () => {
  const wrapper = mount(<App />)
  expect(wrapper.contains(Login)).toBe(true)
});

it('renders the main content if logged in', () => {
  const wrapper = mount(<App />);
  expect(wrapper.contains(Login)).toBe(true);
  wrapper.setState({ loggedIn: true });
  expect(wrapper.contains(Main)).toBe(true);
});

import React from 'react';
import { shallow, mount } from 'enzyme';

import Login from '../components/Login';
import App from '../App';

let wrapper;
beforeEach(() => {
  wrapper = shallow(<Login />);
});

describe('Login', () => {
  it('renders a button with login text', () => {
    expect(wrapper.contains(<button>Log In With Lyft</button>)).toBe(true);
  });

  it('logs the user in', () => {
    wrapper = mount(<App />);
    expect(wrapper.state('loggedIn')).toBe(false);
    wrapper.find(Login).simulate('click')
    expect(wrapper.state('loggedIn')).toBe(true);
  })
});

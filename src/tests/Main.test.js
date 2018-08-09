import React from 'react';
import { shallow, mount } from 'enzyme';

import Main from '../components/Main'

let wrapper;
beforeEach(() => {
  wrapper = shallow(<Main />)
});

describe('Main', () => {
  it('should mount without crashing', () => {
    wrapper = mount(<Main />);
  });

  it("should render a button with the words 'Magic Carpet' on it", () => {
    expect(wrapper.contains(<button>Magic Carpet</button>)).toBe(true)
  });
});

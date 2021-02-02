import React from 'react';
import Login from "../../containers/Login";
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import LoaderButton from "../../components/LoaderButton";
import Form from "react-bootstrap/Form";
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
beforeEach(() => {
  wrapper = mount(<Login />);
});

describe('<Login>', () => {
  it('has a login button', () => {
    expect(wrapper.containsMatchingElement(<LoaderButton type="submit">Login</LoaderButton>)).toBeTruthy();
  });

  it('has a email input field', () => {
    expect(wrapper.containsMatchingElement(<Form.Control type='email' />)).toBeTruthy();
  })

  it('has a password input field', () => {
    expect(wrapper.containsMatchingElement(<Form.Control type='password' />)).toBeTruthy();
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<Login>Login</Login>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})
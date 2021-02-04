import React from 'react';
import Login from "../../containers/Login";
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Users from '../../containers/Userlist';
import { render, fireEvent, cleanup } from '@testing-library/react';
import axios from 'axios';
import renderer from 'react-test-renderer';
import Button from "react-bootstrap/Button";
//import Link from '../snapshot/Link.react';

jest.mock('axios');
const mockFn = jest.fn();
Enzyme.configure({ adapter: new Adapter() });

describe('<DeleteRecord>', () => {
  it('Should delete particular user', () => {
    const wrapper = shallow(<Users />);
    expect(wrapper.find('input#btn')).toBeDefined();
  })

  it('should fetch users', () => {
    const users = 'https://reqres.in/api/unknown';
    console.log(users);
    const resp = { data: users };
    axios.get.mockResolvedValue(resp);
    // expect(axiosMock.get).toHaveBeenCalledTimes(1);
    // expect(axiosMock.get).toHaveBeenCalledWith(users);
    // return Users.all().then(data => expect(data).toEqual(users));
  })

  it('should call mock function when delete button is clicked', () => {
    const tree = shallow(
      <Button
        id='btn'
        className="btn btn-danger btn-sm"
        onClick={mockFn}
      >Delete
      </Button>
    );
    tree.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });

  it('should call mock function when edit button is clicked', () => {
    const tree = shallow(
      <button
        className="btn btn-primary btn-sm"
        style={{ margin: '5px' }}
        onClick={mockFn}
      >Edit</button>
    );
    tree.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });

  it('should call mock function when button is clicked', () => {
    const tree = shallow(
      <Button variant="link" onClick={mockFn} value='0'> Name</Button>
    );
    tree.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });


  it('renders correctly', () => {
    const tree = renderer
      .create(<Users>Userlist</Users>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });


});



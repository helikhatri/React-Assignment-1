import React from 'react';
import Login from "../../containers/Login";
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Users from '../../containers/Userlist';
import {render, fireEvent, cleanup} from '@testing-library/react';
import axios from 'axios';
import renderer from 'react-test-renderer';
//import Link from '../snapshot/Link.react';

jest.mock('axios');

Enzyme.configure({ adapter: new Adapter() });

describe('<DeleteRecord>', () => {
    it('Should delete particular user', () => {
        const wrapper = shallow(<Users />);
        expect(wrapper.find('input#btn')).toBeDefined();
    })

    it('should fetch users', () => {
        const users ='https://reqres.in/api/unknown';
        console.log(users);
        const resp = {data:users};
        axios.get.mockResolvedValue(resp);
        // expect(axiosMock.get).toHaveBeenCalledTimes(1);
        // expect(axiosMock.get).toHaveBeenCalledWith(users);
       // return Users.all().then(data => expect(data).toEqual(users));
    })

    it('renders correctly', () => {
        const tree = renderer
          .create(<Users>Userlist</Users>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
});



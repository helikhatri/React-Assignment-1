import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow,mount } from 'enzyme';
import Signup from '../../containers/Signup'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });
let wrapper;

beforeEach(() => {
    wrapper = mount(<Signup />);
});

describe('Signup', () => {
    it('has a Signup button', () => {
        expect(wrapper.containsMatchingElement(<Button type='submit'>Signup</Button>))
    })

    it('has a email input field', () => {
        expect(wrapper.containsMatchingElement(<Form.Control type='email'>Email</Form.Control>))
    })

    it('has a password input field', () => {
        expect(wrapper.containsMatchingElement(<Form.Control type='password'>Password</Form.Control>))
    })

    it('snapshot test for signup', () => {
        const tree = renderer
        .create(<Signup>signup</Signup>)
        .toJSON();
        expect(tree).toMatchSnapshot();
    })
})
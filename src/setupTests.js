import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import chai from 'chai';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.mount = mount;
global.render = render;
class LocalStorageMock {
    store = {};
    clear = () => this.store = {};
    getItem = (key) => this.store[key] || null;
    setItem = (key, value) => this.store[key] = value.toString();
    removeItem = (key) => delete this.store[key];
}
global.localStorage = new LocalStorageMock();


const WithRouterContext = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
global.WithRouterContext = WithRouterContext;


global.testRender = (Component, props) => {
    const wrapper = shallow(<Component {...props} />);

    return () => {
        it('should render', () => {
            expect(wrapper).toHaveLength(1);
        });

        // TODO: add default snapshot testing
        // TODO: current issue is store context
        // it('should match snapshot', () => {
        //     const tree = renderer.create(
        //         <WithRouterContext><Component {...props} /></WithRouterContext>
        //     ).toJSON();
        //     expect(tree).toMatchSnapshot()
        // })
    };
};

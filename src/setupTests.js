import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {shallow, mount} from 'enzyme';
import chai from 'chai';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

Enzyme.configure({adapter: new Adapter()});

global.shallow = shallow;
global.mount = mount;

// Add global "should render" test case that takes
// component export and simple tests
global.testRender = (Component, props) => {
    const wrapper = shallow(<Component {...props} />);

    return () => {
        it('should render', () => {
            expect(wrapper).toHaveLength(1);
        });

        // TODO: add default snapshot testing
        // it('should match snapshot', () => {
        //     const tree = renderer.create(
        //         <Component {...props} />
        //     ).toJson();
        //     expect(tree).toMatchSnapshot()
        // })
    }
};

class LocalStorageMock {
    store = {};
    clear=() =>this.store = {};
    getItem = (key) => this.store[key] || null;
    setItem = (key, value) => this.store[key] = value.toString();
    removeItem = (key) => delete this.store[key];
}
global.localStorage = new LocalStorageMock();


// NOTE: doesn't seem to run properly, but this way we can monkeypatch expect
// const originalExpect = global.expect;
//
// global.expect = actual => {
//     const originalMatchers = originalExpect(actual);
//     const chaiMatchers = chai.expect(actual);
//     console.warn(chaiMatchers);
//     const combinedMatchers = Object.assign(originalMatchers, chaiMatchers);
//     return combinedMatchers();
// };
//


global.WithRouterContext = ({children}) => <BrowserRouter>{children}</BrowserRouter>;
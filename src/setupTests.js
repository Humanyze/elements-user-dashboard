import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, mount } from 'enzyme';
import chai from 'chai';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.mount = mount;


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

// const StoreContext = ({children}) => {
//  const store = createStore();
//  return <Provider store={store}>{children}</Provider>
// }
// global.WithStoreContext = StoreContext;

// Simple Render test for components
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



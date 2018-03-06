import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {shallow} from 'enzyme';
import chai from 'chai';
import renderer from 'react-test-renderer';

Enzyme.configure({adapter: new Adapter()});

// global.expect = chai.expect;

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
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value.toString();
    }

    removeItem(key) {
        delete this.store[key];
    }
};

global.localStorage = new LocalStorageMock;

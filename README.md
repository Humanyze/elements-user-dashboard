# Humanyze React Elements Page


## Getting Started 
### Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Yarn](https://yarnpkg.com/) (install with `npm i -g yarn`)

### Installation

* `git clone https://github.com/Humanyze/elements-dashboard-react`
* cd into the new directory
* `yarn`

### Running / Development

* `yarn start`
* Visit your app at [http://localhost:3000](http://localhost:3000).


### Running Tests

* `yarn test`


## Development 

### View creation
Each base route path should have its own folder in `src/components`.  The folder paths should try to reflect the route configuration where possible, as this matches how [react-router](https://reacttraining.com/react-router/web) generally handles routing.  

At the root of each view directory, there frequently will be a wrapper component that will handle appropriate dispatches on switching to that view.  It will simply render a react-router switch that will then handle the sub-routing for that path.  All unique sub-routes should be created within that view folder. 

Each component folder will have at least 3 files:

  * The component file, named in PascalCase, e.g. `LoginForm.js`
  * The component `.scss` file, named in kebab-case, e.g. `login-form.scss`
  * The component test file, also in PascalCase, with `.test.` extension, e.g. `LoginForm.test.js`
  * The component storybook file, PascalCased, with `.story.` extension, e.g. `LoginForm.story.js`
  
Any unique components that are used within that parent component will be located in that parent directory.  Refactoring common components for reusability is highly encouraged, although you'll generally need to have a container component for Redux connections at a minimum. 


## Redux Overview

To get familiar, documentation from redux is very thorough and well written.  View it [here](https://redux.js.org/).  Note that redux is a standard state-management library, and can be learned in full without a react context.  Ultimately, viewing it in this way can help write more modular redux code. 

**__Note:__** Suggested readings if unfamiliar:
* [Redux](https://redux.js.org/)
* [react-redux](https://github.com/reactjs/react-redux)
* [redux-actions](https://redux-actions.js.org/)
* [reselect](https://github.com/reactjs/reselect)
* [redux-thunk](https://github.com/gaearon/redux-thunk)
* [redux-offline](https://github.com/redux-offline/redux-offline)

#### Folder Structure 
We currently have implemented a spin on a domain-driven design approach to redux.  The directory structure should match the structure of the store itself.  Each folder for redux will generally have 4 files (unless it's a [combineReducer level reducer](https://redux.js.org/recipes/structuring-reducers/beyond-combinereducers)).  All file names are camelCased, and are as follows:

* Domain action types, e.g. `authActionTypes.js`
    * `export default` object of constants, in UPPERCASED_SNAKE form
    * We will enventually want to determine how we want to set up our naming conventions for action types, there are a few opinions out there. 
    *  The key for each action is UPPERCASED_SNAKE, however, the value, which is what the reducers will actually look for, is namespaced following the convention `app/domain/subdomain/UPPERCASED_SNAKE_ACTION_TYPE`
    
* Domain actions/action-creators, e.g. `authActions.js`
    * contains the action creators and thunk creators for redux.  
    * We use the approach that all async calls and data grooming should be done in action creators, which allows for reducers and components to be as simple as possible. 
    * exports all action creators as named exports, is primary file that is referenced from components (in [react-redux connect](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)).
    * implements action creators through use of [redux-actions](https://redux-actions.js.org/) and [redux-thunk](https://github.com/gaearon/redux-thunk).  
        * Redux thunk may (most likely) be switched out for [redux-observable](https://redux-observable.js.org/) (preferred over redux-saga but up for assessment) as we recognize uses for it, but the migration path is not difficult.
        
* Domain reducer, e.g. `authReducer.js`
    *  Is the main 'state-management' piece of the store.  Takes in initial state, then responds to actions that it has "listeners" for by returning its next state (does not modify its own data AT ALL).
    *  Implemented with `redux-actions` [handleActions](https://redux-actions.js.org/docs/api/handleAction.html) at the moment.  Very solid for current use case, but easy to refactor out of and into more explicit, complex reducers (see above why advanced action creators will make this hopefully unnecessary).
    *  Actions can be combined into one entry with redux-actions combineActions, where a reducer will react to multiple actions in the same way.
    * Selectors:  Going forward we will try to embrace to selector pattern of redux as much as possible (you can view a video describing the benefits from Redux creator [here](https://egghead.io/lessons/javascript-redux-colocating-selectors-with-reducers)).  This prevents brittle state selecting in multiple components and decouples state shape from component usage.  These are separate functions that will generally be exported by name in the reducer file. 
    
    
* Domain reducer/action test, e.g.  `authReducer.test.js`
    * Testing reducers is thankfully very easy since they are pure functions.  Import the reducer, then pass the current state as the first argument, then an action that you want to run.  Compare the output to what you would expect it to be. 
    * **Reducers benefit from TDD greatly, and it's straightforward to do**
    * In theory, these tests will cover actions as well (use action creators to pass in actions to the reducer), so this should be comprehensive
    *  Testing selectors is also very important, although you need to mock the state that you pass to it as the `rootReducer` state.
    * NOTE: testing async thunks is more advanced and hasn't been implemented at the moment, setting a standard for that flow will be important going forward, hits more on larger integration style tests.
    

* Response Mappers (Optional), e.g. `authResponseMapper.js`
    * Your thunks will often need to manipulate the data received to be more normalized (long-term look into using redux-normalizer).  In order to modularize this logic of response => storeshape, we'll utilize a collection of utility functions in a mapper file.  All of these functions should be pure, and heavily unit tested.

  
#### Library Overview

##### [redux-actions](https://redux-actions.js.org/)
Used to reduce redux action creator boiler plate and reducer syntax.  Does very little besides providing quick abstractions for simple action creators and switch statement alternative for reducers.

##### [reselect](https://github.com/reactjs/reselect)
Reselect offers performance and consistency gains while enforcing a clean, functional selector pattern for data retrieval.  Easily testable and composable, it should be used where possible to encourage normalized data and memoized selectors.


##### [redux-thunk](https://github.com/gaearon/redux-thunk)
Used as redux middleware to allow for async action dispatch.  As stated above, should be replaced mid-long-term with redux observable, particularly useful for graph management where debounce and other filters will be very useful. 

##### [redux-offline](https://github.com/redux-offline/redux-offline)
Performs local storage persistence for data, allowing for data that we desire to be stored while blacklisting data that we need to be fresh every time.  Ultimately, we shouldn't even think about this library besides blacklist calls, since we always want to fetch the fresh data, while also having a local backup for offline or poor-connection situations.
    
## Testing
We're utilizing [Jest](https://facebook.github.io/jest/) for our test suites, as well as [Enzyme](http://airbnb.io/enzyme/).  To run tests, simply run `yarn test` from the project directory.  By default, Jest runs files that are associated with your most recent change.  You can change this by pressing `a` from the test window, and it will run all tests on any changes. Using p, 

Before tests are run, the scripts in `src/setupTests.js` are run.  This is very helpful for setting up global references, mocking services, or monkey-patching functions. 

Most react components, specifically presentational components, can quickly be tested by a simple shallow render test.  A global test function `testRender` has been implemented.  Currently, no e2e testing framework is implemented.  Ultimately, we can do integration style work of this using enzyme to mount the root component and simulate interactions
  
  
## StoryBook
[Storybook](https://storybook.js.org/basics/introduction/) is a tool for isolated UI component feedback.  To run the storybook server, run `yarn storybook`.  Storybook has its own webpack configuration and setup files, located in `<rootDir>/.storybook`.  At the moment, we are manually copying configs for webpack, but ultimately we'll want to use a common webpack config for this situation. 

This section requires some maintenance as we determine our specific use cases and systems for storybook.

## Linting
Standard eslint setup in `/.eslintrc`, any modifications should be accompanied by the proper global fix for that rule.  To run the eslint fix, run `npx eslint --fix .` and run the test suite to make sure changes were safe.

## Things to implement/look into

### Implement
* [Axios Middleware](https://github.com/svrcekmichal/redux-axios-middleware)
* Snapshot testing
* E2E testing

### Research
* redux-observable vs. saga (if desired) [discussion here](https://stackoverflow.com/a/40027778/9468997)


### Extra Notes

This project was immediately ejected from Create react app for ease.  Long term, look into cleaning up webpack configs and other boilerplate bloat that does not fit our needs.  
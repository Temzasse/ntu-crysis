# Crysis

Crysis client-side.

## Requirements
Install Node + npm
- [Mac tutorial](http://blog.teamtreehouse.com/install-node-js-npm-mac)
- [Windows tutorial](http://blog.teamtreehouse.com/install-node-js-npm-windows)

## Syntax

This project uses the new ES6 Javascript syntax, familiarize yourself with it [here](https://github.com/lukehoban/es6features)

React components are written with [JSX syntax](https://facebook.github.io/react/docs/jsx-in-depth.html).

## Technologies

- [React](https://facebook.github.io/react/)
- [Redux](http://redux.js.org/docs/introduction/)
- [Redux Saga](https://yelouafi.github.io/redux-saga/docs/introduction/BeginnerTutorial.html)
- [React Router](https://css-tricks.com/learning-react-router/)
- [ES2015 + modules, Babel + Stage 2](https://babeljs.io/docs/learn-es2015/)
- [Webpack](https://webpack.github.io/)
- [Webpack Dev Server](https://webpack.github.io/docs/webpack-dev-server.html)
- [ESLint](http://eslint.org/)
- [Babel](http://babeljs.io/)

**TODO:** Testing stact - add these to project...
- [Karma](https://karma-runner.github.io)
- [Enzyme](http://airbnb.io/enzyme/)
- [Mocha](http://mochajs.org/)
- [Chai](http://chaijs.com/)

## Getting Started

Install dependencies: `npm install`

### Commands

`npm start`

> Run development instance of application on port 8080 via a
> webpack development server with hot module replacement of code.
> Check out http://localhost:8080/ to see the app in your browser.

`npm run build`

> Build production-ready static files into a `build` directory.

`npm test`

> Run all the tests for the project in the `tests` directory, as well as
> generation of coverage reports in the `.coverage` directory.

**TODO:** make tests...

### Project structure
```
├── actions/
│   ├── actiontypes.js --> define possible action types
│   ├── index.actions.js --> define possible actions
│
├── components/
│   ├── UI components here...
│   ├── _Base/ --> base class for creating new components
│   ├── _Base_functional/ --> functional base class for creating new components
│
├── containers/
│   ├── container components here...
│
├── reducers/
│   ├── index.reducer.js --> define state / reducers
│
├── sagas/
│   ├── index.saga.js --> manage async REST API calls
│
├── services/
│   ├── api.js --> methods to connect to REST API
│   ├── history.js
│   ├── index.js --> wraps all services to one export
│   ├── utils.js --> just some utility methods
│
├── static/
│   ├── images/ --> create store to hold state
│   ├── css/ --> default css (eg. browser resets)
│   ├── scss/
│       ├── mixins.scss --> usefull reusable snippets
│       ├── theme.scss --> theme variables
│
├── store/
│   ├── configureStore.js --> create store to hold state
```

### Creating new React components
Start by thinking whether your component can be implemented as a stateless functional component or do you need some local component state or the [lifecycle](https://facebook.github.io/react/docs/component-specs.html) methods that React offers.

Check out the difference between class based and function based components [here](https://facebook.github.io/react/docs/reusable-components.html#es6-classes).

Also read about the [benefits](https://medium.com/@housecor/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc#.e6lxd2f59) of using stateless functional components.

After you have decided what kind of component you need:
1. Copy either `_Base` or `_Base_functional` component directory

2. Rename all occurences of Base to NewComponentName in the new directory

3. Change the new component as needed


>**NOTE:** If you have multiple components that are related to each other, create a new directory for them. For example take a look at `components/navigation` directory that has both mobile / desktop navigation components.

> One important concept in React is so called presentation vs. container components. For example `NavigationContainer` in `components/navigation` owns the state for its child components. Read more about the subject [here](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.10qqa96lp).

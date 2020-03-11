# What is this?

A WIP, nothing really.

What you have here is just an exercise to replace [Redux](https://redux.js.org/) and [React-redux](https://react-redux.js.org/)
with React Context and hooks ([`useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer), [`useContext`](https://reactjs.org/docs/hooks-reference.html#usecontext)).

It shows that it is somehow possible and doesn't require too much effort, although given the availability of the new tools above, I believe better patterns can be developed, whithout packing them into a redux-like library.

# API

It is not nearly as powerful as those libraries, read on to see what you can do with it:

## `connect()`

```js
function connect(mapStateToProps?, mapDispatchToProps?)
```

The `connect` function takes only two parameters.

### `mapStateToProps?: (state) => Object`

No `ownProps` are passed.

### `mapDispatchToProps?: (dispatch) => Object`

`mapDispatchToProps` has to be a function. No `ownProps` are passed.

## `useStore()`

```js
function useStore(reducer, initialState?)
```

There is no `combineReducers` at the moment.

## Example use

```
import React from "react";
import ReactDOM from "react-dom";
import { ContextProvider, useStore, connect } from "./redux-no-redux";

const initialState = { count: 0 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREASE":
      return { ...state, count: state.count + 1 };
    case "DECREASE":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

const increase = () => ({
  type: "INCREASE"
});

const decrease = () => ({
  type: "DECREASE"
});

const Counter = ({ count, onIncrease, onDecrease }) => {
  return (
    <div>
      <span>{count}</span>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
    </div>
  );
};

const mapStateToProps = state => ({
  count: state.count
});

const mapDispatchToProps = dispatch => ({
  onIncrease: () => dispatch(increase()),
  onDecrease: () => dispatch(decrease())
});

const CounterHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

const App = () => {
  const store = useStore(reducer, initialState);

  return (
    <ContextProvider value={store}>
      <CounterHOC />
    </ContextProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
```

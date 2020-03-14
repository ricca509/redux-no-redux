import { createElement, createContext, useReducer, useContext } from "react";

const Context = createContext();
export const ContextProvider = Context.Provider;

export const useStore = (reducer, initialState = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getState = () => state;

  return { getState, dispatch };
};

export const connect = (
  mapStateToProps = () => ({}),
  mapDispatchToProps = () => ({})
) => Component => ownProps => {
  const { getState, dispatch } = useContext(Context);
  const stateProps = mapStateToProps(getState(), ownProps);
  const dispatchProps = mapDispatchToProps(dispatch, ownProps);
  const props = { ...ownProps, ...stateProps, ...dispatchProps, dispatch };

  return createElement(Component, props, null);
};

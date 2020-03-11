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
) => Component => () => {
  const { getState, dispatch } = useContext(Context);
  const stateProps = mapStateToProps(getState());
  const dispatchProps = mapDispatchToProps(dispatch);
  const props = { ...stateProps, ...dispatchProps, dispatch };

  return createElement(Component, props, null);
};

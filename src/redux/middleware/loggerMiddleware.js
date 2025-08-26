const loggerMiddleware = store => next => action => {
  console.log('%cDispatching:', 'color: blue;', action);
  const result = next(action);
  console.log('%cNext State:', 'color: green;', store.getState());
  return result;
};

export default loggerMiddleware;

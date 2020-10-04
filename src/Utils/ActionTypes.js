const ActionTypes = (name) => {
  const SUCCESS = `${name}_SUCCESS`;
  const FAILURE = `${name}_FAILURE`;
  const REQUEST = `${name}_REQUEST`;
  return [REQUEST, SUCCESS, FAILURE];
};

export { ActionTypes };

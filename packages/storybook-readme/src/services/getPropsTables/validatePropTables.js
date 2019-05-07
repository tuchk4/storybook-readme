// Validate user inputs(excludePropTables, includePropTables) by type guarding
// whether it is an array and a function. For now, type checking if it
// is a real React component(class, stateless, renderable) looks overkill
// since components are compared directly.
export const validatePropTables = (excludePropTables, includePropTables) => {
  if (!isValidArray(excludePropTables, includePropTables)) {
    return { excludePropTables: [], includePropTables: [] };
  }

  if (!isValidArrayItems(excludePropTables, includePropTables)) {
    return { excludePropTables: [], includePropTables: [] };
  }

  return {
    excludePropTables,
    includePropTables,
  };
};

// Validate if the inputs are an array.
const isValidArray = (excludePropTables, includePropTables) => {
  let isValidArray = true;
  if (!Array.isArray(excludePropTables)) {
    isValidArray = false;
    console.warn(
      'storybook-readme: excludePropTables is not an array. It must be an ' +
        'array of React components.'
    );
  }

  if (!Array.isArray(includePropTables)) {
    isValidArray = false;
    console.warn(
      'storybook-readme: includePropTables is not an array. It must be an ' +
        'array of React components.'
    );
  }

  return isValidArray;
};

// Validate if the items inside of array is a React component.
const isValidArrayItems = (excludePropTables, includePropTables) => {
  let isValidArrayItems = true;
  excludePropTables.map(value => {
    if (typeof value !== 'function') {
      isValidArrayItems = false;
      console.warn(
        `storybook-readme: Value ${value}(${typeof value}) from ` +
          'excludePropTables is not a React component. It must be an' +
          'actual React component.'
      );
    }
  });

  includePropTables.map(value => {
    if (typeof value !== 'function') {
      isValidArrayItems = false;
      console.warn(
        `storybook-readme: Value ${value}(${typeof value}) from ` +
          'excludePropTables is not a React component. It must be an' +
          'actual React component.'
      );
    }
  });

  return isValidArrayItems;
};

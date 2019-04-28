
// Exclude propTables according to the user inputs(excludePropTables,
// includePropTables) It prioritize includePropTables over excludePropTables
// lists. User can exclude propTables globally, but it is possible to include
// it from specific story by prioritizing include rule.
export const excludePropTable = (
    innerChildren,
    excludePropTables,
    includePropTables
  ) => {
    // If inputs from user are invalid, it doesn't apply any exclude logic.
    if (
      !isValidInput(excludePropTables, `${excludePropTables}`) ||
      !isValidInput(includePropTables, `${includePropTables}`)
    ) {
        return false;
    }

    return false
}

// Check if parameters from user are valid by type guarding whether it is 
// an array and its items are a function. For now, type checking if it
// is a real React component(class, stateless, renderable) looks overkill
// since displayName, name is only be used.
const isValidInput = (propTables, parameterName) => {
    if (
      Array.isArray(propTables) &&
      propTables.some((component) => typeof component === 'function')
    ) {
        return true;
    }

    console.warn(`storybook-readme: ${parameterName} is not an array. It must be an array of React component`);
}
// Refine user inputs(excludePropTables, includePropTables) by type guarding
// whether it is an array and a function. For now, type checking if it
// is a real React component(class, stateless, renderable) looks overkill
// since displayName and name is only be used.
export const refinePropTables = (excludePropTables, includePropTables) => {
  if (!Array.isArray(excludePropTables) || !Array.isArray(includePropTables)) {
    console.warn(
      'storybook-readme: excludePropTables or includePropTables is not an' +
      'array. It must be an array of React components.'
    );

    return { excludePropTables: [], includePropTables: [] };
  }

  const refinedExcludePropTables = filterPropTables(
    excludePropTables,
    'excludePropTables'
  );
  const refinedIncludePropTables = filterPropTables(
    includePropTables,
    'includePropTables'
  );

  return {
    excludePropTables: refinedExcludePropTables,
    includePropTables: refinedIncludePropTables
  };
};

// Filter items inside of propTables by its type a function.
const filterPropTables = (propTables, propTableName) => {
  const refinedPropTables = propTables.filter(component => {
    if (typeof component !== 'function') {
      console.warn(
        `storybook-readme: Value '${component}' from '${propTableName}'` +
        `is not a React component`
      );
      return false;
    }

    return true;
  });

  return refinedPropTables;
};

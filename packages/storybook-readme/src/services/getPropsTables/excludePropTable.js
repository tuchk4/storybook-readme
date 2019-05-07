// Exclude propTables according to the user inputs(excludePropTables,
// includePropTables) It prioritizes includePropTables over excludePropTables.
// User can exclude propTables globally for convenience and it is possible to
// include it from a specific story by prioritizing include rule.
export const excludePropTable = (
  innerChildren,
  excludePropTables,
  includePropTables
) => {
  const isComponentInExcludePropTables = excludePropTables.some(
    component => component === innerChildren.type
  );
  const isComponentInIncludePropTables = includePropTables.some(
    component => component === innerChildren.type
  );

  // If nothings are in includePropTables, then excludePropTables decides
  // whether this component should be excluded or not.
  if (includePropTables.length === 0 && isComponentInExcludePropTables) {
    return true;
  }

  // If somethings are in includePropTables, then it only includes components
  // that are in incluePropTables and ignores excludePropTables at all.
  if (includePropTables.length > 0 && !isComponentInIncludePropTables) {
    return true;
  }

  return false;
};

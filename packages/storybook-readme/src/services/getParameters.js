export default function getParameters(context) {
  const parameters = context.parameters || context.options || {};
  const storyOptions = parameters.readme || {};

  const config =
    typeof storyOptions === 'string' ? { content: storyOptions } : storyOptions;

  const theme = {
    ...(context.parameters
      ? context.parameters.options
        ? context.parameters.options.theme
        : {}
      : {}),
    ...config.theme,
  };

  const codeTheme = config.codeTheme || 'github';

  return {
    ...config,
    codeTheme,
    theme,
  };
}

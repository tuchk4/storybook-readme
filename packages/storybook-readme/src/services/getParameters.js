export default function getParameters(context) {
  const parameters = context.parameters || context.options || {};
  const storyOptions = parameters.readme || {};

  const config =
    typeof storyOptions === 'string' ? { content: storyOptions } : storyOptions;

  const codeTheme = config.codeTheme || 'github';

  return {
    highlightContent: true,
    highlightSidebar: true,

    ...config,
    codeTheme,
    theme: {
      ...parameters.options.theme,
      ...config.theme,
    },
  };
}

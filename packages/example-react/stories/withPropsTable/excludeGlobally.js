import React from 'react';
import { storiesOf } from '@storybook/react';

import ButtonWithPropTypes from '../../components/Button/ButtonWithPropTypes';

const ExcludeGlobally = `
# Exclude Globally

You can exclude propTables globally by adding \`excludePropTables\` value to 
addParameters at \`config.js\` It is an array of React component.
It is convenient when the component is wrapped with
Theme, I18n, or HOC component.

### From config.js
\`\`\`javascript
import ButtonWithPropTypes from '../../components/Button/ButtonWithPropTypes';
addParameters({
  readme: {
    excludePropTables: [ButtonWithPropTypes]
  },
});
\`\`\`

### From specific story
\`\`\`javascript
import ButtonWithPropTypes from '../../components/Button/ButtonWithPropTypes';
storiesOf("Your story name", module)
  .add("Your story name", () => <ButtonWithPropTypes label={"Hello Im Button"} />, {
    readme: {
      content: \`<!-- STORY --><!-- PROPS -->\`,
    }
  })
\`\`\`

You can notice from below that the component is showing but propTable
is not showing eventhough \`<!-- PROPS -->\` is specified.

`;

storiesOf("PropsTable", module).add(
  "Exclude globally",
  () => <ButtonWithPropTypes label={"Hello Im Button"} />,
  {
    readme: {
      content: `${ExcludeGlobally}<!-- STORY --><!-- PROPS -->`
    }
  }
);


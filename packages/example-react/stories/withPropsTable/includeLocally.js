import React from 'react';
import { storiesOf } from '@storybook/react';

import ButtonWithPropTypes from '../../components/Button/ButtonWithPropTypes';

const IncludeLocally = `
# Include Locally

You can include propTables locally by adding \`includePropTables\` value to 
readme object you pass to specific story. It is an array of React component.
If valid \`includePropTables\` exists, propTable of components inside of it
only shows and ignores \`excludePropTables\` rule at all.

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
      includePropTables: [ButtonWithPropTypes]
    }
  })
\`\`\`

You can notice from below that the both component and its propTable
are showing eventhough from \`config.js\`, \`ButtonWithPropTypes\` is
inside of \`excludePropTables\`. This is because the implementation of
\`includePropTables\` always win over \`excludePropTables\`. The reason for
this is to give the user an excluding feature globally for conveninece, 
however whenever user wants, they can include whatever component they want
and ignore global \`excludePropTables\` rule.
`;

storiesOf('PropsTable', module).add(
  'Include locally',
  () => <ButtonWithPropTypes label={'Hello Im Button'} />,
  {
    readme: {
      content: `${IncludeLocally}<!-- STORY --><!-- PROPS -->`,
      includePropTables: [ButtonWithPropTypes],
    },
  }
);

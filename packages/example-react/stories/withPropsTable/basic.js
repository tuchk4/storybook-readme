import React from 'react';
import { storiesOf } from '@storybook/react';

import ButtonWithPropTypes from '../../components/Button/ButtonWithPropTypes';

const Basic = `
# Basic Usage

If your React component is already using \`PropTypes\`, then It is easy to
show it in a table format by adding \`<!-- PROPS -->\` to \`readme\` object's
\`content\`.

### From specific story
\`\`\`javascript
import ButtonWithPropTypes from '../../components/Button/ButtonWithPropTypes';
storiesOf('Your story name', module).add(
  'Your story name',
  () => <ButtonWithPropTypes label={'Hello Im Button with propTypes'} />,
  {
    readme: {
      content: \`<!-- STORY --><!-- PROPS -->\`,
    }
  }
);
\`\`\`

You can notice from below that the React component is showing and \`PropTypes\`
that you specified to component is showing as a table format.
`;

storiesOf('PropsTable', module).add(
  'Basic Usage',
  () => <ButtonWithPropTypes label={'Hello Im Button with propTypes'} />,
  {
    readme: {
      content: `${Basic}<!-- STORY --><!-- PROPS -->`,

      // This is not necessary in normal situation. The reason for
      // `includePropTables` is needed here is because `ButtonWithPropTypes` is
      // specified in `excludePropTables` at `config.js`
      includePropTables: [ButtonWithPropTypes],
    },
  }
);

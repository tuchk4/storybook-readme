import React from 'react';
import { storiesOf } from '@storybook/react';

const RenderPropPattern = `
# RenderProp Pattern

Currently using RenderProp pattern in actual usage is very limited. 
It will only show the propTable of \`RenderProp Component\`. PropTable of
actual component that is used inside of renderProp is not showing.

### From specific story
\`\`\`javascript
import {
  RenderPropComponent,
  DisplayMouseCoordinates,
} from '../../components/PropTables/RenderPropComponent';
storiesOf('PropsTable|More usages', module).add(
  'RenderProp pattern',
  () => (
    <RenderPropComponent border='2px solid purple'>
      {mouse => (
        <DisplayMouseCoordinates
          name="I'm a DisplayMouseCoordinates Component!"
          x={mouse.x}
          y={mouse.y}
        />
      )}
    </RenderPropComponent>
  ),
  {
    readme: {
      content: \`<!-- STORY --><!-- PROPS -->\`,
    },
  }
);
\`\`\`

You can notice from below that propTable of \`RenderProp Component\`
is only showing. (No propTable of \`DisplayMouseCoordinates\`)

**Note**: Only \`RenderProp Component\` propTable is showing. No 
children components.
`;

import {
  RenderPropComponent,
  DisplayMouseCoordinates,
} from '../../components/PropTables/RenderPropComponent';

storiesOf('PropsTable|More usages', module).add(
  'RenderProp pattern',
  () => (
    <RenderPropComponent border="2px solid purple">
      {mouse => (
        <DisplayMouseCoordinates
          name="I'm a DisplayMouseCoordinates Component!"
          x={mouse.x}
          y={mouse.y}
        />
      )}
    </RenderPropComponent>
  ),
  {
    readme: {
      content: `${RenderPropPattern}<!-- STORY --><!-- PROPS -->`,
    },
  }
);

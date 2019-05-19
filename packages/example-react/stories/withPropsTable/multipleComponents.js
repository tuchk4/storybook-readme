import React from 'react';
import { storiesOf } from '@storybook/react';

const SeeWrapperComponent = `
\`\`\`javascript
export const WrapperComponent = ({ width, height, children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "2px solid black",
        width,
        height,
        justifyContent: "space-evenly",
        alignItems: "center"
      }}
    >
      {children}
    </div>
  );
};
\`\`\`
`;

const Multiple = `
# Multiple Components

PropTables of multiple components can be shown at the same time. It will show all the 
propTables, so \`excludePropTables, includePropTables\` feature can be useful if you
want to constrain what to be shown.

### From specific story
\`\`\`javascript
import { WrapperComponent } from "../../components/PropTables/WrapperComponent";
import { SmallComponentOne } from "../../components/PropTables/SmallComponentOne";
import { SmallComponentTwo } from "../../components/PropTables/SmallComponentTwo";
import { SmallComponentThree } from "../../components/PropTables/SmallComponentThree";
storiesOf('Your story name', module).add(
  'Your story name',
  () => (
    <WrapperComponent width="300px" height="200px">
      <SmallComponentOne type="I'm First!" />
      <SmallComponentTwo type="I'm Second!" color="orange" />
      <SmallComponentThree type="I'm Third!" backgroundColor="lightgrey" />
    </WrapperComponent>
  ),
  {
    readme: {
      content: \`<!-- STORY --><!-- PROPS -->\`,
    }
  }
);
\`\`\`

You can notice from below that 4 components and its propTabels are showing.

**Caveat**: Component using \`{this.props.children}\` is still showing all its
children's propTables(\`WrapperComponent\` in this example)
<details>
  <summary>See WrapperComponent</summary>
  ${SeeWrapperComponent}
</details>
`;

import { WrapperComponent } from '../../components/PropTables/WrapperComponent';
import { SmallComponentOne } from '../../components/PropTables/SmallComponentOne';
import { SmallComponentTwo } from '../../components/PropTables/SmallComponentTwo';
import { SmallComponentThree } from '../../components/PropTables/SmallComponentThree';
storiesOf('PropsTable|More usages', module).add(
  'Multiple components',
  () => (
    <WrapperComponent width="300px" height="200px">
      <SmallComponentOne type="I'm First!" />
      <SmallComponentTwo type="I'm Second!" color="orange" />
      <SmallComponentThree type="I'm Third!" backgroundColor="lightgrey" />
    </WrapperComponent>
  ),
  {
    readme: {
      content: `${Multiple}<!-- STORY --><!-- PROPS -->`,
    },
  }
);

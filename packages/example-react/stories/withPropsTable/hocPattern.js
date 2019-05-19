import React from 'react';
import { storiesOf } from '@storybook/react';

const SeeHOCComponent = `
\`\`\`javascript
export const withHOC = options => WrappedComponent => {
  const Enhanced = props => {
    return <WrappedComponent {...props} />;
  };
  Enhanced.defaultProps = {
    name: 'Enhanced Component',
    whatever: 'Whatever string here',
  };
  Enhanced.propTypes = {
    /**
     * Name of this Component
     */
    name: PropTypes.string.isRequired,

    /**
     * Whatever string here
     */
    whatever: PropTypes.string.isRequired,
  };

  return Enhanced;
};
\`\`\`
`;

const HocPattern = `
# HOC Pattern

Currently using HOC pattern in actual usage is very limited. It will show the
tables of \`Enhancing Component\`with its prop names, but \`Type\` is always 
\`other\` and \`Description\` is always blank. It is due to the limitation of
\`react-docgen\`. Please see the related.
issues.
[#288](https://github.com/reactjs/react-docgen/issues/288), 
[#336](https://github.com/reactjs/react-docgen/issues/336), 

### From specific story
\`\`\`javascript
import { SmallComponentThree } from '../../components/PropTables/SmallComponentThree';
import { withHOC } from '../../components/PropTables/withHOC';
const EnhancedSmallComponent = withHOC({ maybe: 'some option' })(
  SmallComponentThree
);
storiesOf('PropsTable|More usages', module).add(
  'HOC pattern',
  () => (
    <EnhancedSmallComponent
      backgroundColor="lightgrey"
      type="I'm an Enhanced Small Component"
    />
  ),
  {
    readme: {
      content: \`<!-- STORY --><!-- PROPS -->\`,
    },
  }
);
\`\`\`

You can notice from below that propTable of \`Enhancing Component\` inside of
HOC component is only showing.

**Note**: Only \`Enhancing Component\` propTable is showing.
<details>
  <summary>See HOC Component and Enhancing Component inside of it</summary>
  ${SeeHOCComponent}
</details>
`;

import { SmallComponentThree } from '../../components/PropTables/SmallComponentThree';
import { withHOC } from '../../components/PropTables/withHOC';
const EnhancedSmallComponent = withHOC({ maybe: 'some option' })(
  SmallComponentThree
);
storiesOf('PropsTable|More usages', module).add(
  'HOC pattern',
  () => (
    <EnhancedSmallComponent
      backgroundColor="lightgrey"
      type="I'm an Enhanced Small Component"
    />
  ),
  {
    readme: {
      content: `${HocPattern}<!-- STORY --><!-- PROPS -->`,
    },
  }
);

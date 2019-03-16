import React from 'react';
import { configureReadme, addFooter, addHeader } from 'storybook-readme';

configureReadme({
  StoryPreview: ({ children }) => <div>{children}</div>,
  DocPreview: ({ children }) => (
    <div style={{ background: '#000' }}> {children}</div>
  ),
  HeaderPreview: ({ children }) => (
    <div style={{ background: 'red' }}>{children}</div>
  ),
  FooterPreview: ({ children }) => <div>{children}</div>,
  header: `
## Components kit

`,
  footer: `
---

Sources of this storybook [tuchk4/storybook-readme/packages/example-react](https://github.com/tuchk4/storybook-readme/tree/master/packages/example-react)

![twitter](https://upload.wikimedia.org/wikipedia/ru/thumb/9/9f/Twitter_bird_logo_2012.svg/1200px-Twitter_bird_logo_2012.svg.png)[tuchk4](https://twitter.com/tuchk)

![storybook](https://storybook.js.org//images/logos/logo-storybook.svg)
`,
});

import './Button';
import './withStoryPreview';
import './withSidebarDocs';
import './withContentDocs';
import './withEmoji';
import './withPropsTable';
import './withCustomTheme';
import './withCustomCodeTheme';
import './withOldApi';

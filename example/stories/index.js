import React from 'react';
import { storiesOf, action, linkTo } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import withReadme from '../../src/with-readme';
import withDocs from '../../src/with-docs';

import Button from '../components/Button';
import Content from '../components/Content';
import Header from '../components/Header';

import CommonFooterDocs from '../components/COMMON_FOOTER.md';

import ButtonReadme from '../components/Button/README.md';
import ButtonDocs from '../components/Button/DOCS.md';
import ContentReadme from '../components/Content/README.md';
import HeaderReadme from '../components/Header/README.md';
import HeaderAdvancedReadme from '../components/Header/ADVANCED.md';

withDocs.addFooter(CommonFooterDocs);

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .addDecorator(withDocs(ButtonDocs))
  .addDecorator(withReadme(ButtonReadme))
  .addWithInfo('Default', () => (
    <Button
      onClick={action('clicked')}
      alert={boolean('alert', false)}
      success={boolean('success', false)}
      label={text('label', 'Hello Im Button')}
    />
  ));

storiesOf('Content', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(ContentReadme))
  .addWithInfo('Default', () => (
    <Content loading={boolean('loading', false)} error={text('error', '')}>
      Hello world!
    </Content>
  ));

storiesOf('Header', module)
  .addDecorator(withKnobs)
  .addDecorator(withDocs([HeaderReadme, HeaderAdvancedReadme]))
  .addWithInfo('Default', () => (
    <Header
      alert={boolean('alert', false)}
      important={boolean('importnat', false)}
    >
      Hello World
    </Header>
  ));

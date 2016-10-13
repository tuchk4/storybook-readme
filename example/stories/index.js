import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';

import Button from '../components/button';
import ColoredButton from '../components/colored-button';
import Header from '../components/header';

import ButtonReadme from '../components/button/README.md';
import ColoredButtonReadme from '../components/colored-button/README.md';
import HeaderReadme from '../components/header/README.md';

storiesOf('Button', module)
  .addWithReadme('Default', ButtonReadme, () => (
    <Button onClick={action('clicked')} label="Hello Button"/>
  ))
  .addWithReadme('Colored', [ColoredButtonReadme, ButtonReadme], () => (
    <ColoredButton important onClick={action('clicked')} label="Hello Button"/>
  ));

storiesOf('Header', module)
  .addWithReadme('Default', HeaderReadme, () => (
    <Header>Hello World</Header>
  ))
  .addWithReadme('Important', HeaderReadme, () => (
    <Header important>Hello World</Header>
  ));

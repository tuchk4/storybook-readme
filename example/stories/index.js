import React from 'react';
import { storiesOf, action, linkTo } from '@storybook/react';
import withReadme from '../../src/with-readme';

import Button from '../components/button';
import ColoredButton from '../components/colored-button';
import Header from '../components/header';

import ButtonReadme from '../components/button/README.md';
import ColoredButtonReadme from '../components/colored-button/README.md';
import HeaderReadme from '../components/header/README.md';

storiesOf('Button', module)
  .addWithInfo('Default', withReadme(ButtonReadme, () => <Button onClick={action('clicked')} label="Hello Button"/>))
  .addWithInfo('Colored', withReadme([ColoredButtonReadme, ButtonReadme], () => (
    <ColoredButton success onClick={action('clicked')} label="Hello Button"/>
  )));

storiesOf('Header', module)
  .addDecorator(withReadme(HeaderReadme))
  .addWithInfo('Default',  () => <Header>Hello World</Header>)
  .addWithInfo('Important', () => <Header important>Hello World</Header>)

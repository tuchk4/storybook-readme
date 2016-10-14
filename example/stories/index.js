import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
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
    <ColoredButton important onClick={action('clicked')} label="Hello Button"/>
  )));

storiesOf('Header', module)
  .addWithInfo('Default', withReadme(HeaderReadme, () => <Header>Hello World</Header>))
  .addWithInfo('Important', withReadme(HeaderReadme, () => <Header important>Hello World</Header>))

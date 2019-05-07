import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme, doc } from 'storybook-readme';

import Button from '../components/Button';

import ButtonReadme from '../components/Button/README.md';
import ButtonUsage from '../components/Button/USAGE.md';

storiesOf('Old Api', module).add(
  'withDocs hoc',
  withDocs(ButtonReadme, () => <Button label={'Hello Im Button'} />)
);

storiesOf('Old Api', module)
  .addDecorator(withDocs(ButtonReadme))
  .add('withDocs decorator', () => <Button label={'Hello Im Button'} />);

storiesOf('Old Api', module).add('doc', doc(ButtonReadme));

storiesOf('Old Api', module).add(
  'withReadme hoc',
  withReadme(ButtonReadme, () => <Button label={'Hello Im Button'} />)
);

storiesOf('Old Api', module)
  .addDecorator(withReadme(ButtonReadme))
  .add('withReadme decorator', () => <Button label={'Hello Im Button'} />);

import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { withReadme, withDocs } from 'storybook-readme';

import Button from '../components/Button';

import CommonFooterDocs from '../components/COMMON_FOOTER.md';
import ButtonReadme from '../components/Button/README.md';
import ButtonDocs from '../components/Button/DOCS.md';

withDocs.addFooterDocs(CommonFooterDocs);

const withDocsCustom = withDocs({
  PreviewComponent: ({ children }) => (
    <div
      style={{
        textAlign: 'center',
        padding: '25px',
        margin: '25px 0',
        boxShadow: '0 0 40px rgba(0, 0, 0, 0.1)',
      }}
    >
      {children}
    </div>
  ),
  FooterComponent: ({ children }) => (
    <div
      style={{
        padding: '25px',
        background: 'rgba(246, 255, 0, 0.23)',
        borderTop: '2px solid rgba(0, 0, 0, 0.1)',
      }}
    >
      {children}
    </div>
  ),
});

storiesOf('Custom Preview and Footer', module)
  .addDecorator(withKnobs)
  .addDecorator(withDocsCustom(ButtonDocs))
  .addWithInfo('Button', () => (
    <Button
      onClick={action('clicked')}
      alert={boolean('alert', false)}
      success={boolean('success', false)}
      label={text('label', 'Hello Im Button')}
    />
  ));

storiesOf('With Docs and Readme', module)
  .addDecorator(withKnobs)
  .addDecorator(withDocs(ButtonDocs))
  .addDecorator(withReadme(ButtonReadme))
  .addWithInfo('Button', () => (
    <Button
      onClick={action('clicked')}
      alert={boolean('alert', false)}
      success={boolean('success', false)}
      label={text('label', 'Hello Im Button')}
    />
  ));

// withReadme and withDocs
storiesOf('withDocs and withReadme', module)
  .addDecorator(withKnobs)
  .addDecorator(withDocs(ButtonDocs))
  .addDecorator(withReadme(ButtonReadme))
  .addWithInfo('Button', () => (
    <Button
      onClick={action('clicked')}
      alert={boolean('alert', false)}
      success={boolean('success', false)}
      label={text('label', 'Hello Im Button')}
    />
  ));

// withDocs
storiesOf('withReadme/ As Decorator', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(ButtonReadme))
  .addWithInfo('Button', () => (
    <Button
      onClick={action('clicked')}
      alert={boolean('alert', false)}
      success={boolean('success', false)}
      label={text('label', 'Hello Im Button')}
    />
  ));

storiesOf('withReadme/As HOC', module)
  .addDecorator(withKnobs)
  .addWithInfo(
    'Button',
    withReadme(ButtonReadme, () => (
      <Button
        onClick={action('clicked')}
        alert={boolean('alert', false)}
        success={boolean('success', false)}
        label={text('label', 'Hello Im Button')}
      />
    ))
  );

// with docs
storiesOf('withDocs/As Decorator', module)
  .addDecorator(withKnobs)
  .addDecorator(withDocs(ButtonReadme))
  .addWithInfo('Button', () => (
    <Button
      onClick={action('clicked')}
      alert={boolean('alert', false)}
      success={boolean('success', false)}
      label={text('label', 'Hello Im Button')}
    />
  ));

storiesOf('withDocs/As HOC', module)
  .addDecorator(withKnobs)
  .addWithInfo(
    'Button',
    withDocs(ButtonReadme, () => (
      <Button
        onClick={action('clicked')}
        alert={boolean('alert', false)}
        success={boolean('success', false)}
        label={text('label', 'Hello Im Button')}
      />
    ))
  );

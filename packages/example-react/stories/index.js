import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { withReadme, withDocs, doc } from 'storybook-readme';
import { withNotes } from '@storybook/addon-notes';
import Marked from 'storybook-readme/components/Marked';

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
  .add('Button', () => (
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
  .add('Button', () => (
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
  .add('Button', () => (
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
  .add('Button', () => (
    <Button
      onClick={action('clicked')}
      alert={boolean('alert', false)}
      success={boolean('success', false)}
      label={text('label', 'Hello Im Button')}
    />
  ));

storiesOf('withReadme/As HOC', module)
  .addDecorator(withKnobs)
  .add(
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
  .add('Button', () => (
    <Button
      onClick={action('clicked')}
      alert={boolean('alert', false)}
      success={boolean('success', false)}
      label={text('label', 'Hello Im Button')}
    />
  ));

storiesOf('withDocs/As HOC', module)
  .addDecorator(withKnobs)
  .add(
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

storiesOf('Doc', module).add('Common', doc(ButtonReadme));

storiesOf('Custom Layout', module).add('Button', () => {
  return (
    <React.Fragment>
      <div
        style={{
          padding: '16px',
          margin: '32px 0',
          background: 'rgba(255, 255, 0, 0.41)',
        }}
      >
        <Button onClick={action('clicked')} label="Button before intro" />
      </div>
      <Marked md={'### INTRO '} />
      <div
        style={{
          padding: '16px',
          margin: '32px 0',
          background: 'rgba(0, 255, 0, 0.41)',
        }}
      >
        <Button onClick={action('clicked')} label="Button after intro" />
      </div>
      <Marked md={ButtonReadme} />
      <div
        style={{
          padding: '16px',
          margin: '32px 0',
          background: 'rgba(255, 0, 0, 0.41)',
        }}
      >
        <Button onClick={action('clicked')} label="Button before outro" />
      </div>
      <Marked md={'### OUTRO '} />
    </React.Fragment>
  );
});

storiesOf('withDocs/withNotes', module)
  .addDecorator(withKnobs)
  .add(
    'Button',
    withNotes('A very simple component')(
      withDocs(ButtonReadme, () => (
        <Button
          onClick={action('clicked')}
          alert={boolean('alert', false)}
          success={boolean('success', false)}
          label={text('label', 'Hello Im Button')}
        />
      ))
    )
  );

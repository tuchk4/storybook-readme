import transformEmojis from './transformEmojis';
import marked from './marked';
import getPropsTables from './getPropsTables';

import { getConfig } from './config';

import {
  LAYOUT_TYPE_MD,
  LAYOUT_TYPE_PROPS_TABLE,
  LAYOUT_TYPE_STORY,
  LAYOUT_TYPE_HEADER_MD,
  LAYOUT_TYPE_FOOTER_MD,
  MARKER_HIDDEN,
  MARKER_STORY,
  MARKER_PROPS_TABLE,
} from '../const';

function split(md, story, config) {
  return (
    md
      /**
       * Should replace <!-- --> with custom placeholders to allow default md/html comments
       */
      .replace(MARKER_STORY, `___{{${LAYOUT_TYPE_STORY}}}___`)
      .replace(MARKER_PROPS_TABLE, `___{{${LAYOUT_TYPE_PROPS_TABLE}}}___`)
      .split(/___{{|}}___/)
      // .split(/<!--|-->/)
      .filter(p => p.trim().length !== 0)
      .map(part => {
        switch (part.trim()) {
          case LAYOUT_TYPE_STORY:
            return {
              type: LAYOUT_TYPE_STORY,
              content: story,
            };

          case LAYOUT_TYPE_PROPS_TABLE:
            return {
              type: LAYOUT_TYPE_PROPS_TABLE,
              content: getPropsTables({
                story,
                config
              }),
            };

          default:
            return {
              type: LAYOUT_TYPE_MD,
              // content: marked(part),
              content: part,
            };
        }
      })
  );
}

function processMd(md) {
  return marked(transformEmojis(md.replace(MARKER_HIDDEN, '')));
}

export default function getDocsLayout({ md, story, excludePropTables, includePropTables }) {
  const mdAsArray = Array.isArray(md) ? [...md] : [md];
  // const mdWithEmojis = mdAsArray.map(md => transformEmojis(md));
  const mdWithEmojis = mdAsArray.map(processMd);

  const main = mdWithEmojis[0];

  const layout = [...split(main, story, { excludePropTables, includePropTables })];

  mdWithEmojis.slice(1).map(md => {
    layout.push(...split(md, story, { excludePropTables, includePropTables }));
  });

  if (layout.findIndex(p => p.type === LAYOUT_TYPE_STORY) === -1) {
    layout.push({
      type: LAYOUT_TYPE_STORY,
      content: story,
    });
  }

  const config = getConfig();
  if (config.footer) {
    layout.push({
      type: LAYOUT_TYPE_FOOTER_MD,
      content: processMd(config.footer),
    });
  }

  if (config.header) {
    layout.unshift({
      type: LAYOUT_TYPE_HEADER_MD,
      content: processMd(config.header),
    });
  }

  return layout;
}

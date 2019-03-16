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
} from '../const';

function split(md, story) {
  return md
    .split(/<!--\s|\s-->/)
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
            }),
          };

        default:
          return {
            type: LAYOUT_TYPE_MD,
            // content: marked(part),
            content: part,
          };
      }
    });
}

function processMd(md) {
  return marked(transformEmojis(md));
}

export default function getDocsLayout({ md, story }) {
  const mdAsArray = Array.isArray(md) ? [...md] : [md];
  // const mdWithEmojis = mdAsArray.map(md => transformEmojis(md));
  const mdWithEmojis = mdAsArray.map(processMd);

  const main = mdWithEmojis[0];

  const layout = [...split(main, story)];

  mdWithEmojis.slice(1).map(md => {
    layout.push(...split(md, story));
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

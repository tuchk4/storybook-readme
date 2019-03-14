import StoryPreviewDefault from '../Preview/StoryPreview';
import FooterPreviewDefault from '../Preview/FooterPreview';
import MdPreviewDefault from '../Preview/MdPreview';

import * as T from '@storybook/theming';

import highlight from '../../../services/highlite';

import {
  LAYOUT_TYPE_MD,
  LAYOUT_TYPE_STORY,
  LAYOUT_TYPE_PROPS_TABLE,
} from '../../../const';

export default {
  name: 'readme-content',
  data() {
    return {
      LAYOUT_TYPE_MD: LAYOUT_TYPE_MD,
      LAYOUT_TYPE_STORY: LAYOUT_TYPE_STORY,
      LAYOUT_TYPE_PROPS_TABLE: LAYOUT_TYPE_PROPS_TABLE,
    };
  },
  mounted() {
    highlight(this.$el);
  },
  props: ['layout'],
  template: `
    <div>
      <div v-for="item in layout">
        <div v-if="item.type === LAYOUT_TYPE_MD" v-html="item.content" class="markdown-body"/>
        <div v-if="item.type === LAYOUT_TYPE_STORY">
          <component :is="item.content" />
        </div>
      </div>
    </div>
    `,
};

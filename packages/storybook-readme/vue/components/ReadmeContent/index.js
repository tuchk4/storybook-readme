import StoryPreviewDefault from '../Preview/StoryPreview';
import FooterPreviewDefault from '../Preview/FooterPreview';
import MdPreviewDefault from '../Preview/MdPreview';
import * as T from '@storybook/theming';
import highlight from '../../../services/highlite';
import { LAYOUT_TYPE_MD, LAYOUT_TYPE_STORY, LAYOUT_TYPE_PROPS_TABLE } from '../../../const';
export default {
  name: 'readme-content',
  data: function data() {
    return {
      LAYOUT_TYPE_MD: LAYOUT_TYPE_MD,
      LAYOUT_TYPE_STORY: LAYOUT_TYPE_STORY,
      LAYOUT_TYPE_PROPS_TABLE: LAYOUT_TYPE_PROPS_TABLE
    };
  },
  mounted: function mounted() {
    highlight(this.$el);
  },
  props: ['layout'],
  template: "\n    <div>\n      <div v-for=\"item in layout\">\n        <div v-if=\"item.type === LAYOUT_TYPE_MD\" v-html=\"item.content\" class=\"markdown-body\"/>\n        <div v-if=\"item.type === LAYOUT_TYPE_STORY\">\n          <component :is=\"item.content\" />\n        </div>\n      </div>\n    </div>\n    "
};
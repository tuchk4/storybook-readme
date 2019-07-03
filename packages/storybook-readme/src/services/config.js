const config = {};

export function addFooter(footer) {
  config.footer = footer;
}

export function addHeader(header) {
  config.header = header;
}

export function addStoryPreview(Preview) {
  config.StoryPreview = Preview;
}
export function addDocPreview(Preview) {
  config.DocPreview = Preview;
}
export function addHeaderPreview(Preview) {
  config.HeaderPreview = Preview;
}
export function addFooterPreview(Preview) {
  config.FooterPreview = Preview;
}

export function getConfig() {
  return {
    ...config,
  };
}

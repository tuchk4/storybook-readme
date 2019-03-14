const config = {
  footer: null,
  header: null,
};

export function addFooter(footer) {
  config.footer = footer;
}

export function addHeader(header) {
  config.header = header;
}

export function getConfig() {
  return {
    ...config,
  };
}

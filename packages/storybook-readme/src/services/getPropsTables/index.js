import marked from '../../services/marked';
import parseProps from './parseProps';

const getName = type => type.displayName || type.name;

const getMarkdown = ({ type, name }) => {
  const propDefinitions = parseProps(type);

  if (propDefinitions.length === 0) {
    return null;
  }

  let md = `### ${name} Props\n`;
  /* copy & modified from addon-info */
  md += `<table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Required</th>
        <th>Type</th>
        <th>DefaultValue</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>`;

  propDefinitions.forEach(prop => {
    md += `<tr>
      <td>${prop.property}</td>
      <td>${prop.required ? '+' : '-'}</td>
      <td>${prop.propType}</td>
      <td>${prop.defaultValue ? prop.defaultValue : ''}</td>
      <td>${prop.description || '-'}</td>
    </tr>`
  })
  
  md += '</tbody></table>';

  return marked(md);
};

/**
 * Copied from @storybook/addon-info
 */
export default function getPropsTables({ story, config = {} }) {
  const types = new Map();

  const {
    propTablesExclude,
    // maxPropObjectKeys,
    // maxPropArrayLength,
    // maxPropStringLength,
    // excludedPropTypes,
  } = config;

  if (!story) {
    return null;
  }

  // depth-first traverse and collect types
  const extract = innerChildren => {
    if (!innerChildren) {
      return;
    }
    if (Array.isArray(innerChildren)) {
      innerChildren.forEach(extract);
      return;
    }
    if (innerChildren.props && innerChildren.props.children) {
      extract(innerChildren.props.children);
    }
    if (
      typeof innerChildren === 'string' ||
      typeof innerChildren.type === 'string' ||
      (Array.isArray(propTablesExclude) && // also ignore excluded types
        ~propTablesExclude.indexOf(innerChildren.type)) // eslint-disable-line no-bitwise
    ) {
      return;
    }
    if (innerChildren.type && !types.has(innerChildren.type)) {
      types.set(innerChildren.type, true);
    }
  };

  // extract components from children
  extract(story);

  const array = Array.from(types.keys());
  array.sort((a, b) => (getName(a) > getName(b) ? 1 : -1));

  let propTables = array.map((type, i) => {
    return getMarkdown({
      name: getName(type),
      config,
      type,
    });
  });

  if (!propTables || propTables.length === 0) {
    return null;
  }

  return propTables;
}

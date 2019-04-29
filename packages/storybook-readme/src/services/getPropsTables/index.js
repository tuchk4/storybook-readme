import marked from '../../services/marked';
import parseProps from './parseProps';
import { excludePropTable } from "./excludePropTable";

const getName = type => type.displayName || type.name;

const renderPropMeta = (propType, propMeta) => {
  if (!propMeta) {
    return '';
  }

  switch (propType) {
    case 'enum': {
      return propMeta.join(' | ');
    }

    case 'instanceOf':
    case 'arrayOf': {
      return propMeta;
    }

    case 'union': {
      return propMeta.join(' | ');
    }

    case 'objectOf': {
      return propMeta;
    }

    case 'shape': {
      return Object.keys(propMeta)
        .map(k => {
          return `<div class="property_meta">${k}: ${propMeta[k].name}</div>`;
        })
        .join('');
    }

    default:
      return '';
  }
};

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
      <td>
        <div><b>${prop.propType}</b></div>
        <div class="property_meta">${renderPropMeta(
          prop.propType,
          prop.propMeta,
        )}</div>
      </td>
      <td>${prop.defaultValue ? prop.defaultValue : '-'}</td>
      <td>${prop.description || '-'}</td>
    </tr>`;
  });

  md += '</tbody></table>';

  return marked(md);
};

/**
 * Copied from @storybook/addon-info
 */
export default function getPropsTables({ story, config = {} }) {
  const types = new Map();

  const {
    // maxPropObjectKeys,
    // maxPropArrayLength,
    // maxPropStringLength,
    // excludedPropTypes,
    excludePropTables,
    includePropTables,
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

    // Exclude specific propTable according to its exclude and include rules.
    if (
      typeof innerChildren.type === 'function' &&
      excludePropTable(innerChildren, excludePropTables, includePropTables)
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

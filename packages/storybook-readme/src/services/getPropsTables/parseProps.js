import PropTypes from 'prop-types';
import React from 'react';

const PropTypesMap = new Map();

// Object.keys(PropTypes).forEach(typeName => {
//   const type = PropTypes[typeName];

//   PropTypesMap.set(type, typeName);
//   PropTypesMap.set(type.isRequired, typeName);
// });
const clearString = str => str.replace(/^\'|\'$/g, '');

const isNotEmpty = obj => obj && obj.props && Object.keys(obj.props).length > 0;

const hasDocgen = type => isNotEmpty(type.__docgenInfo);

const propsFromDocgen = type => {
  const props = {};
  const docgenInfoProps = type.__docgenInfo.props;

  Object.keys(docgenInfoProps).forEach(property => {
    const docgenInfoProp = docgenInfoProps[property];
    const defaultValueDesc = docgenInfoProp.defaultValue || {};

    // console.log(docgenInfoProp);

    const propType =
      // docgenInfoProp.flowType ||
      (typeof docgenInfoProp.type === 'object'
        ? docgenInfoProp.type.name
        : docgenInfoProp.type) || 'other';

    let propMeta = null;

    switch (propType) {
      case 'enum': {
        // if (typeof docgenInfoProp.type === 'object') {
        propMeta = docgenInfoProp.type.value.map(v => clearString(v.value));
        // }

        break;
      }
      case 'instanceOf': {
        // if (typeof docgenInfoProp.type === 'object') {
        propMeta = docgenInfoProp.type.value;
        // }

        break;
      }
      case 'arrayOf': {
        // if (typeof docgenInfoProp.type === 'object') {
        propMeta = docgenInfoProp.type.value.name;
        // }

        break;
      }
      case 'objectOf': {
        // if (typeof docgenInfoProp.type === 'object') {
        propMeta = docgenInfoProp.type.value.name;
        // }

        break;
      }
      case 'union': {
        // if (typeof docgenInfoProp.type === 'object') {
        propMeta = docgenInfoProp.type.value.map(v => v.value || v.name);
        // }

        break;
      }

      case 'shape': {
        // if (typeof docgenInfoProp.type === 'object') {
        propMeta = docgenInfoProp.type.value;
        // }

        break;
      }
    }

    props[property] = {
      property,
      propType,
      propMeta,
      required: docgenInfoProp.required,
      description: docgenInfoProp.description,
      defaultValue: clearString(defaultValueDesc.value || ''),
    };
  });

  return props;
};

const propsFromPropTypes = type => {
  const props = {};

  if (type.propTypes) {
    Object.keys(type.propTypes).forEach(property => {
      const typeInfo = type.propTypes[property];
      const required = typeInfo.isRequired === undefined;
      const docgenInfo =
        type.__docgenInfo &&
        type.__docgenInfo.props &&
        type.__docgenInfo.props[property];
      const description = docgenInfo ? docgenInfo.description : null;
      let propType = PropTypesMap.get(typeInfo) || 'other';

      if (propType === 'other') {
        if (docgenInfo && docgenInfo.type) {
          propType = docgenInfo.type.name;
        }
      }

      props[property] = { property, propType, required, description };
    });
  }

  if (type.defaultProps) {
    Object.keys(type.defaultProps).forEach(property => {
      const value = type.defaultProps[property];

      if (value === undefined) {
        return;
      }

      if (!props[property]) {
        props[property] = { property };
      }

      props[property].defaultValue = value;
    });
  }

  return props;
};

export default function parseProps(type) {
  if (!type) {
    return null;
  }

  const propDefinitionsMap = hasDocgen(type)
    ? propsFromDocgen(type)
    : propsFromPropTypes(type);

  return Object.values(propDefinitionsMap);
}

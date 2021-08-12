import { BEMModifier, BEMModifierValue, BEMDelimiters } from './types';

function stringifyModifierValue(
  modifier: BEMModifierValue,
  delimiter: string
): string | null {
  if (typeof modifier === 'string') {
    return modifier;
  }

  const { value, name } = modifier;
  if (value === false) {
    return null;
  } else if (typeof value === 'undefined' || value === true) {
    return name;
  } else {
    return name + delimiter + value;
  }
}

// eslint-disable-next-line max-params
export function modifier(
  value: BEMModifierValue,
  blockName: string,
  elementName: string | undefined,
  delimiters: BEMDelimiters
): BEMModifier {
  const modifierString = stringifyModifierValue(
    value,
    delimiters.modifierValue
  );

  const toString = (): string => {
    return (
      delimiters.prefix +
      blockName +
      (elementName ? delimiters.element + elementName : '') +
      (modifierString ? delimiters.modifier + modifierString : '')
    );
  };

  const toSelector = (): string => {
    return `.${toString()}`;
  };

  const toSuffix = (withElement?: boolean): string => {
    return (
      (withElement === true
        ? elementName
          ? delimiters.element + elementName
          : ''
        : '') +
      delimiters.modifier +
      modifierString
    );
  };

  const toParentSelector = (withElement?: boolean): string => {
    return `&${toSuffix(withElement)}`;
  };

  return Object.assign(toString, {
    toString,
    toSelector,
    toSuffix,
    toParentSelector
  });
}

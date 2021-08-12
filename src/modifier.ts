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
  delimiters: BEMDelimiters,
  modifierContext?: string
): BEMModifier {
  const modifierString = stringifyModifierValue(
    value,
    delimiters.modifierValue
  );

  function chain(): string;
  function chain(modifierValue: BEMModifierValue): BEMModifier;
  function chain(modifierValue?: BEMModifierValue): string | BEMModifier {
    if (modifierValue) {
      return modifier(
        modifierValue,
        blockName,
        elementName,
        delimiters,
        modifierString
          ? (modifierContext ?? '') + delimiters.modifier + modifierString
          : modifierContext
      );
    } else {
      return toString();
    }
  }

  const combinedModifier =
    (modifierContext ?? '') +
    (modifierString ? delimiters.modifier + modifierString : '');

  const toString = (): string => {
    return (
      delimiters.prefix +
      blockName +
      (elementName ? delimiters.element + elementName : '') +
      combinedModifier
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
        : '') + combinedModifier
    );
  };

  const toParentSelector = (withElement?: boolean): string => {
    return `&${toSuffix(withElement)}`;
  };

  return Object.assign(chain, {
    toString,
    toSelector,
    toSuffix,
    toParentSelector
  });
}

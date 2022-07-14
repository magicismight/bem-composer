import {
  BEMElement,
  BEMModifier,
  BEMDelimiters,
  BEMModifierValue
} from './types';
import { modifier } from './modifier';

export function element(
  name: string,
  blockName: string,
  delimiters: BEMDelimiters
): BEMElement {
  function curried(): string;
  function curried(modifierValue: BEMModifierValue): BEMModifier;
  function curried(modifierValue?: BEMModifierValue): string | BEMModifier {
    if (modifierValue) {
      return modifier(modifierValue, blockName, name, delimiters);
    } else {
      return toString();
    }
  }

  const toString = (): string => {
    return (
      delimiters.prefix +
      (name ? blockName + delimiters.element + name : blockName)
    );
  };

  const toSelector = (): string => {
    return `.${toString()}`;
  };

  const toSuffix = (): string => {
    return delimiters.element + name;
  };

  const toParentSelector = (): string => {
    return `&${toSuffix()}`;
  };

  return Object.assign(curried, {
    toString,
    toSelector,
    toSuffix,
    toParentSelector
  });
}

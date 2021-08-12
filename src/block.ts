import {
  BEMBlock,
  BEMElement,
  BEMModifier,
  BEMDelimiters,
  BEMModifierValue
} from './types';
import { element } from './element';
import { modifier } from './modifier';

export function block(name: string, delimiters: BEMDelimiters): BEMBlock {
  function curried(): string;
  function curried(elementName: string): BEMElement;
  function curried(
    elementName: undefined | string,
    modifierValue: BEMModifierValue
  ): BEMModifier;
  function curried(
    elementName?: string,
    modifierValue?: BEMModifierValue
  ): BEMElement | BEMModifier | string {
    if (modifierValue) {
      return modifier(modifierValue, name, elementName, delimiters);
    } else if (typeof elementName === 'string') {
      // if elementName === '' should return BEMElement
      return element(elementName, name, delimiters);
    } else {
      return toString();
    }
  }

  const toString = (): string => {
    return name;
  };

  const toSelector = (): string => {
    return `.${toString()}`;
  };

  return Object.assign(curried, {
    toString,
    toSelector
  });
}

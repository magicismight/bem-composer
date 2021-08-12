import {
  BEMBlock,
  BEMElement,
  BEMModifier,
  BEMModifierValue,
  BEMDelimiters
} from './types';
import { block } from './block';

export const DefaultBEMDelimiters: BEMDelimiters = {
  element: '--',
  modifier: '__',
  modifierValue: '-'
};

interface bem {
  (blockName: string): BEMBlock;
  (blockName: string, elementName: string): BEMElement;
  (
    blockName: string,
    elementName: string,
    modifierValue: BEMModifierValue
  ): BEMModifier;
}

export function configure(delimiters: Partial<BEMDelimiters>): bem {
  function curried(blockName: string): BEMBlock;
  function curried(blockName: string, elementName: string): BEMElement;
  function curried(
    blockName: string,
    elementName: string,
    modifierValue: BEMModifierValue
  ): BEMModifier;
  function curried(
    blockName: string,
    elementName?: string,
    modifierValue?: BEMModifierValue
  ): BEMBlock | BEMElement | BEMModifier {
    const b = block(blockName, {
      ...DefaultBEMDelimiters,
      ...delimiters
    });
    if (typeof elementName === 'string' && !modifierValue) {
      return b(elementName);
    } else if (typeof elementName === 'string' && modifierValue) {
      return b(elementName, modifierValue);
    } else {
      return b;
    }
  }

  return curried;
}

const bem = configure(DefaultBEMDelimiters);

export { bem };

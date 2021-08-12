export interface BEMDelimiters {
  prefix: string;
  element: string;
  modifier: string;
  modifierValue: string;
}

export type BEMModifierValue =
  | {
      name: string;
      value?: string | boolean;
    }
  | string;

export interface BEMBlock {
  (): string; // shortcut for toString()
  (elementName: string): BEMElement;
  (
    elementName: undefined | string,
    modifierValue: BEMModifierValue
  ): BEMModifier;
  toString: () => string; // Return classname
  toSelector: () => string; // Return classname selector
}

export interface BEMElement {
  (): string; // shortcut for toString()
  (modifierValue: BEMModifierValue): BEMModifier;
  toString: () => string;
  toSelector: () => string;
  toSuffix: () => string;
  toParentSelector: () => string;
}

export interface BEMModifier {
  (): string;
  toString: () => string;
  toSelector: () => string;
  toSuffix: (withElement?: boolean) => string;
  toParentSelector: (withElement?: boolean) => string;
}

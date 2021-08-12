# BEM composer

![Lines](https://img.shields.io/badge/lines-100%25-brightgreen.svg) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

> A easy [BEM](https://en.bem.info/) classname tool for React, styled-components, linaria.
> Recommend using with [classnames](https://www.npmjs.com/package/classnames).

# Install

## npm

```
npm i bem-composer
```

## yarn

```
yarn add bem-composer
```

# API

## Output

```ts
import { bem } from 'bem-composer';

// create a `button` block
const b = bem('button');

console.log(b.toString()); // 'button'
// shortcut for .toString()
console.log(b()); // 'button'
console.log(b.toSelector()); // '.button'

// create a `icon` element based on `b` block
const e = b('icon');

console.log(e.toString()); // 'button--icon'
// shortcut for .toString()
console.log(e()); // 'button--icon'
console.log(e.toSelector()); // '.button--icon'
console.log(e.toSuffix()); // '--icon'
console.log(e.toParentSelector()); // '&--icon'

// create a modifier based on `e` element
const m = e('active');

console.log(m.toString()); // 'button--icon__active'
// shortcut for .toString()
console.log(m().toString()); // 'button--icon__active'
console.log(m.toSelector().toString()); // '.button--icon__active'
console.log(m.toSuffix().toString()); // '__active'
console.log(m.toParentSelector().toString()); // '&__active'
// get suffix with element
console.log(m.toSuffix(true).toString()); // '--icon__active'
// get parent selector with element
console.log(m.toParentSelector(true).toString()); // '&--icon__active'

// create a modifier with value
const mv = e({
  name: 'active',
  value: 'hover'
});
console.log(mv.toString()); // 'button--icon__active-hover'

// modifier with condition
console.log(e({
  'active',
  value: false
})) // 'button--icon'
console.log(e({
  'active',
  value: true
}).toString()) // 'button--icon__active'

// block with modifier
console.log(b('', 'active').toString()); // 'button_active'


```

## Configure delimiters

```ts
import { configure, DefaultBEMDelimiters } from 'bem-composer';

// Configure BEM constructor with custom delimiters.
const cbem = configure({
  element: '__',
  modifier: '~~',
  modifierValue: '~'
});

console.log(
  cbem('block', 'icon', {
    name: 'active',
    value: 'hover'
  }).toString()
); // block__icon~~active~hover
```

## Curried API

Provide a curried API to easily create elements and modifiers.

```ts
import { bem } from 'bem-composer';

console.log(bem('button', 'icon')); // button--icon
console.log(bem('button')('icon')); // button--icon
console.log(bem('button', 'icon', 'active').toString()); // 'button--icon__active'
console.log(bem('button')('icon', 'active').toString()); // 'button--icon__active'
console.log(bem('button', 'icon')('active').toString()); // 'button--icon__active'
```

# React

```jsx
import React from 'react';
import { bem } from 'bem-composer';
import classNames from 'classnames';

const b = bem('button');
const e = b('icon');
const m = e('active');

export default function Button(props) {
  const { active } = props;
  return (
    <button
      classname={classNames([
        b(), // 'button'
        b('', {
          name: 'active',
          value: active
        }) // button__active
      ])}
    >
      <img
        classname={classNames([
          e(), // 'button-icon'
          e({
            name: 'active',
            value: active
          }), // active === true ? 'button--icon__active' : 'button--icon'
          e('primary') // 'button--icon__primary'
        ])}
      />
    </button>
  );
}
```

## BEM Constructor type definition

```ts
function bem(blockName: string): BEMBlock;
function bem(blockName: string, elementName: string): BEMElement;
function bem(
  blockName: string,
  elementName: string,
  modifierValue: BEMModifierValue
): BEMModifier;

type BEMModifierValue =
  | {
      name: string;
      value?: string | boolean;
    }
  | string;

interface BEMBlock {
  (): string; // shortcut for toString()
  (elementName: string): BEMElement;
  (
    elementName: undefined | string,
    modifierValue: BEMModifierValue
  ): BEMModifier;
  toString: () => string; // Return classname
  toSelector: () => string; // Return classname selector
}

interface BEMElement {
  (): string; // shortcut for toString()
  (modifierValue: BEMModifierValue): BEMModifier;
  toString: () => string;
  toSelector: () => string;
  toSuffix: () => string;
  toParentSelector: () => string;
}

interface BEMModifier {
  (): string;
  toString: () => string;
  toSelector: () => string;
  toSuffix: (withElement?: boolean) => string;
  toParentSelector: (withElement?: boolean) => string;
}
```

# Styled-components & Linaria

```tsx
import styled from 'styled-components';

const b = bem('button');
const e = b('icon');
const m = e('active');

export const StyledButton = styled.button`
  /* .button */
  ${b.toSelector()} {
    border: 1px solid red;
    outline: none;
  }

  /* .button-icon */
  ${e.toParentSelector()} {
    width: 20px;
    height: 20px;

    /* .button--icon__active */
    ${m.toParentSelector()} {
      opacity: 0.5;
    }
  }
`;
```

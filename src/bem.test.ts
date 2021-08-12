import { bem, configure, DefaultBEMDelimiters } from './bem';

const BlockName = 'button';

const ElementName = 'icon';

const ModifierName = 'active';

const ModifierValue = 'true';

const BlockWithElement = [
  BlockName,
  DefaultBEMDelimiters.element,
  ElementName
].join(''); // button--icon

const BlockWithElementAndModifier = [
  BlockName,
  DefaultBEMDelimiters.element,
  ElementName,
  DefaultBEMDelimiters.modifier,
  ModifierName
].join(''); // button--icon__active

const BlockWithModifier = [
  BlockName,
  DefaultBEMDelimiters.modifier,
  ModifierName
].join(''); // button__active

const BlockWithElementAndModifierAndValue = [
  BlockName,
  DefaultBEMDelimiters.element,
  ElementName,
  DefaultBEMDelimiters.modifier,
  ModifierName,
  DefaultBEMDelimiters.modifierValue,
  ModifierValue
].join(''); // button--icon__active=true

const BlockWithModifierAndValue = [
  BlockName,
  DefaultBEMDelimiters.modifier,
  ModifierName,
  DefaultBEMDelimiters.modifierValue,
  ModifierValue
].join(''); // button__active-true

describe('block', () => {
  it('should return block classname', () => {
    expect(bem(BlockName).toString()).toBe(BlockName);
  });

  it('can be called by shortcut', () => {
    expect(bem(BlockName)()).toBe(BlockName);
  });

  it('should return block class selector', () => {
    expect(bem(BlockName).toSelector()).toEqual(`.${BlockName}`);
  });

  it('can create a element', () => {
    expect(bem(BlockName)(ElementName).toString()).toBe(BlockWithElement);
  });

  it('can create a modifier', () => {
    expect(
      bem(BlockName)(undefined, {
        name: ModifierName,
        value: ModifierValue
      }).toString()
    ).toBe(BlockWithModifierAndValue);
  });

  it('can create a element with modifier', () => {
    expect(bem(BlockName)(ElementName, ModifierName).toString()).toBe(
      BlockWithElementAndModifier
    );
  });
});

describe('element', () => {
  const b = bem(BlockName);
  it('should return element classname', () => {
    expect(b(ElementName).toString()).toBe(BlockWithElement);
  });

  it('can be called by shortcut', () => {
    expect(b(ElementName)()).toBe(BlockWithElement);
  });

  it('should works with empty element name', () => {
    expect(b('')()).toBe(BlockName);
  });

  it('should return element class selector', () => {
    expect(b(ElementName).toSelector()).toEqual(`.${BlockWithElement}`);
  });

  it('should return selector suffix', () => {
    expect(b(ElementName).toSuffix()).toEqual(
      DefaultBEMDelimiters.element + ElementName // --icon
    );
  });

  it('should return parent selector', () => {
    expect(b(ElementName).toParentSelector()).toEqual(
      '&' + DefaultBEMDelimiters.element + ElementName // &--icon
    );
  });

  it('can create a modifier', () => {
    expect(b(ElementName)(ModifierName).toString()).toBe(
      BlockWithElementAndModifier
    );
  });
});

describe('modifier with element', () => {
  const m = bem(BlockName, ElementName);

  it('should return modifier classname', () => {
    expect(m(ModifierName).toString()).toBe(BlockWithElementAndModifier);
  });

  it('should return modifier with value is true', () => {
    expect(
      m({
        name: ModifierName,
        value: true
      }).toString()
    ).toBe(BlockWithElementAndModifier);
  });

  it('should return non-modifier with value is false', () => {
    expect(
      m({
        name: ModifierName,
        value: false
      }).toString()
    ).toBe(BlockWithElement);
  });

  it('can be called by shortcut', () => {
    expect(m(ModifierName)()).toBe(BlockWithElementAndModifier);
  });

  it('should return modifier class selector', () => {
    expect(m(ModifierName).toSelector()).toEqual(
      `.${BlockWithElementAndModifier}`
    );
  });

  it('should return selector suffix with element', () => {
    expect(m(ModifierName).toSuffix(true)).toEqual(
      DefaultBEMDelimiters.element +
        ElementName +
        DefaultBEMDelimiters.modifier +
        ModifierName // --icon__active
    );
  });

  it('should return selector suffix without element', () => {
    expect(m(ModifierName).toSuffix()).toEqual(
      DefaultBEMDelimiters.modifier + ModifierName // __active
    );
  });

  it('should return parent selector', () => {
    expect(m(ModifierName).toParentSelector(true)).toEqual(
      '&' +
        DefaultBEMDelimiters.element +
        ElementName +
        DefaultBEMDelimiters.modifier +
        ModifierName // &--icon__active
    );
  });

  it('should return parent selector without element', () => {
    expect(m(ModifierName).toParentSelector()).toEqual(
      '&' + DefaultBEMDelimiters.modifier + ModifierName // &--icon__active
    );
  });
});

describe('modifier without element', () => {
  const m = bem(BlockName, '');

  it('should return modifier classname', () => {
    expect(m(ModifierName).toString()).toBe(BlockWithModifier);
  });

  it('can be called by shortcut', () => {
    expect(m(ModifierName)()).toBe(BlockWithModifier);
  });

  it('should return modifier class selector', () => {
    expect(m(ModifierName).toSelector()).toEqual(`.${BlockWithModifier}`);
  });

  it('should return selector suffix', () => {
    expect(m(ModifierName).toSuffix()).toEqual(
      DefaultBEMDelimiters.modifier + ModifierName // __active
    );
  });

  it('should return selector suffix correctly', () => {
    expect(m(ModifierName).toSuffix(true)).toEqual(
      DefaultBEMDelimiters.modifier + ModifierName // __active
    );
  });

  it('should return parent selector', () => {
    expect(m(ModifierName).toParentSelector()).toEqual(
      '&' + DefaultBEMDelimiters.modifier + ModifierName // &__active
    );
  });
});

describe('curried api', () => {
  test('BlockWithElement', () => {
    expect(bem(BlockName, ElementName).toString()).toBe(BlockWithElement);
    expect(bem(BlockName)(ElementName).toString()).toBe(BlockWithElement);
  });

  test('BlockWithElementAndModifier', () => {
    expect(bem(BlockName)(ElementName, ModifierName).toString()).toBe(
      BlockWithElementAndModifier
    );
    expect(bem(BlockName, ElementName)(ModifierName).toString()).toBe(
      BlockWithElementAndModifier
    );
    expect(bem(BlockName, ElementName, ModifierName).toString()).toBe(
      BlockWithElementAndModifier
    );
  });

  test('BlockWithElementAndModifierAndValue', () => {
    expect(
      bem(BlockName)(ElementName, {
        name: ModifierName,
        value: ModifierValue
      }).toString()
    ).toBe(BlockWithElementAndModifierAndValue);
    expect(
      bem(
        BlockName,
        ElementName
      )({ name: ModifierName, value: ModifierValue }).toString()
    ).toBe(BlockWithElementAndModifierAndValue);
    expect(
      bem(BlockName, ElementName, {
        name: ModifierName,
        value: ModifierValue
      }).toString()
    ).toBe(BlockWithElementAndModifierAndValue);
  });
});

describe('custom delimiters', () => {
  const cbem = configure({
    element: '__',
    modifier: '~~',
    modifierValue: '~'
  });
  it('should replace with custom delimiters', () => {
    expect(
      cbem(BlockName, ElementName, {
        name: ModifierName,
        value: ModifierValue
      }).toString()
    ).toBe(
      [
        BlockName,
        '__',
        ElementName,
        '~~',
        ModifierName,
        '~',
        ModifierValue
      ].join('') // button__icon~~active~true
    );
  });
});

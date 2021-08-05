import { createMapper } from '../src';

describe('mapper test', () => {
  const mappingsMock = {
    some: [
      {
        label: 'someLabel',
        value: 'someValue',
      },
    ],
  };

  const { mapToValue, mapToLabel } = createMapper(mappingsMock);
  it('mapToValue when label exist', () => {
    const resultValue = mapToValue('some', 'someLabel');
    expect(resultValue).toEqual('someValue');
  });

  it('mapToValue when label not exist', () => {
    const resultValue = mapToValue('some', 'falseLabel');
    expect(resultValue).toEqual(null);
  });

  it('mapToLabel when label exist', () => {
    const resultLabel = mapToLabel('some', 'someValue');
    expect(resultLabel).toEqual('someLabel');
  });

  it('mapToLabel when value not exist', () => {
    const resultLabel = mapToLabel('some', 'falseValue');
    expect(resultLabel).toEqual('');
  });
});

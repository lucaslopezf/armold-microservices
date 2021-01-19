/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable security/detect-object-injection */

export interface Mapping {
  label: string;
  value: any;
}

export interface MapperConfig {
  [key: string]: Mapping[];
}

export interface Mapper<T extends MapperConfig, M extends keyof T> {
  mapToLabel(key: M, value?: any): string;
  mapToValue(key: M, value?: string): any;
}

export const createMapper = <T extends MapperConfig, M extends keyof T>(mapperConfig: T): Mapper<T, M> => {
  const find = (key: M): Mapping[] => {
    return mapperConfig[key];
  };

  const hasValue = (property: any, value: any): boolean => {
    if (Array.isArray(property)) {
      return property.includes(value);
    } else {
      return property === value;
    }
  };

  const findByProperty = (key: M, property: keyof Mapping, value: any): Mapping => {
    const mappings = find(key);

    const mapping = mappings.find((x) => hasValue(x[property], value));
    if (!mapping) return { label: '', value: null };

    return mapping;
  };

  return {
    mapToLabel: (key: M, value?: any): string => {
      return findByProperty(key, 'value', value).label;
    },
    mapToValue: (key: M, value?: string): any => {
      return findByProperty(key, 'label', value).value;
    },
  };
};

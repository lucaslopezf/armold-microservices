export interface Mapping {
  label: string;
  value: unknown;
}

export interface MapperConfig {
  [key: string]: Mapping[];
}

export interface Mapper<T extends MapperConfig, M extends keyof T> {
  mapToLabel(key: M, value?: unknown): string;
  mapToValue(key: M, value?: string): unknown;
}

export const createMapper = <T extends MapperConfig, M extends keyof T>(mapperConfig: T): Mapper<T, M> => {
  const find = (key: M): Mapping[] => {
    return mapperConfig[key];
  };

  const findByProperty = (key: M, property: keyof Mapping, value: unknown): Mapping => {
    const mappings = find(key);

    const hasValue = (property: unknown, value: unknown): boolean => {
      return property === value;
    };

    const mapping = mappings.find((x) => hasValue(x[property], value));
    if (!mapping) return { label: '', value: null };

    return mapping;
  };

  return {
    mapToLabel: (key: M, value?: unknown): string => {
      return findByProperty(key, 'value', value).label;
    },
    mapToValue: (key: M, value?: string): unknown => {
      return findByProperty(key, 'label', value).value;
    },
  };
};

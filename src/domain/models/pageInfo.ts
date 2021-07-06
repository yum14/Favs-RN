export interface Model {
  readonly id: string;
  readonly uri: string;
  readonly order: number;
  readonly comment?: string;
  readonly category?: string;
  readonly title: string;
  readonly desc?: string;
  readonly imageSource?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface Values {
  readonly id: string;
  readonly uri: string;
  readonly order: number;
  readonly comment?: string;
  readonly category?: string;
  readonly title: string;
  readonly desc?: string;
  readonly imageSource?: string;
}

export const factory = (values: Values): Model => {
  const now = new Date().toISOString();

  return {
    id: values.id,
    uri: values.uri,
    order: values.order,
    comment: values.comment,
    category: values.category,
    title: values.title,
    desc: values.desc,
    imageSource: values.imageSource,
    createdAt: now,
    updatedAt: now,
  };
};

export const update = (value: Model, newValue: Values): Model => {
  const now = new Date().toISOString();

  return {
    ...value,
    ...newValue,
    updatedAt: now,
  };
};

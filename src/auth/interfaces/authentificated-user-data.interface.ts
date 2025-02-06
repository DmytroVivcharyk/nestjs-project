export interface IAuthentificatedUserData {
  id: number;
  email: string;
  role: string;
}

export type data = Pick<IAuthentificatedUserData, 'id' | 'email'>;

export type MyPick<T extends object, K extends (keyof T)[]> = {
  [P in K[number]]: T[P];
};

export const func = <T extends (keyof IAuthentificatedUserData)[]>(
  data: T,
  user: IAuthentificatedUserData,
): MyPick<IAuthentificatedUserData, T> => {
  return data.reduce(
    (acc, key) => {
      return {
        ...acc,
        [key]: user[key],
      };
    },
    {} as MyPick<IAuthentificatedUserData, T>,
  );
};

export const joe = {
  id: 1,
  email: 'joe@gmail.com',
  role: 'user',
};

// const partialdata = func(['id', 'email'], joe);

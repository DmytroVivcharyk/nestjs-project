import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAuthentificatedUserData } from '../interfaces/authentificated-user-data.interface';

export type MyPick<T extends object, K extends (keyof T)[]> = {
  [P in K[number]]: T[P];
};

// export const AuthentificatedUser = <
//   T extends (keyof IAuthentificatedUserData)[],
// >() =>
//   createParamDecorator((data: T | undefined, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     const user = request.get('user') as IAuthentificatedUserData;

//     if (data) {
//       return data.reduce(
//         (acc, key) => {
//           return {
//             ...acc,
//             [key]: user[key],
//           };
//         },
//         {} as MyPick<IAuthentificatedUserData, T>,
//       );
//     }

//     return user;
//   });

export const AuthentificatedUser = createParamDecorator<
  (keyof IAuthentificatedUserData)[], // Define `data` type explicitly
  ExecutionContext,
  Partial<IAuthentificatedUserData> // Define the return type correctly
>(
  (
    data: (keyof IAuthentificatedUserData)[] | undefined,
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as IAuthentificatedUserData;

    if (data) {
      return data.reduce((acc, key) => {
        return {
          ...acc,
          [key]: user[key],
        };
      }, {} as Partial<IAuthentificatedUserData>);
    }

    return user;
  },
);

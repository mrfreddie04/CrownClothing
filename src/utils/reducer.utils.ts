export type Action = {type: string, payload?: any};
export const createAction = (type: string, payload?: any): Action => ({type, payload});

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};
import { User } from "firebase/auth";
import { createAction } from './../../utils/reducer.utils';
import { UserActionType } from './user.types';

export const setCurrentUser = (user: User | null) => createAction(UserActionType.SET_CURRENT_USER, user);

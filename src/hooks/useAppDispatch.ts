import { useDispatch } from 'react-redux';
import { Action } from '../utils/reducer.utils';

export type AsyncAction = (dispatch: (action: Action) => any) => void;
export type Dispatcher = (action: AsyncAction | Action) => void
export const useAppDispatch: () => Dispatcher = useDispatch as any;
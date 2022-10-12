import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCollectionAndDocuments } from '../../firebase/firebase.utils';
import { CategoryDoc } from '../../models/category.model';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';
import { CategoriesActionType } from "./category.types";

export function* fetchCategoriesAsync(): Generator<
  any,//CallEffect<CategoryDoc[]>,
  void,
  CategoryDoc[]
  > 
{
  try {
    const categories = yield call(getCollectionAndDocuments<CategoryDoc>,"categories");
    //console.log("SAGA", categories);
    yield put(fetchCategoriesSuccess(categories));  
  } catch(err) {
    yield put(fetchCategoriesFailed(err));
  }
}

//generators respond to actions - like reducers
export function* onFetchCategories() {
  //we will RESPOND to FETCH_CATEGORIES_START action
  //we use take() use to RECEIVE ACTIONS, 
  //takeLastest() - take the last action is there is a sequence of the same actions (debounce logic)
  yield takeLatest(CategoriesActionType.FETCH_CATEGORIES_START,fetchCategoriesAsync); 
}

//accumulator that holds all the sagas related to the category
export function* categoriesSagas() {
  yield all([call(onFetchCategories)]); //pause till all functions/generators passed to all() are finish
}

//all - run everyting inside and complete when everything is done
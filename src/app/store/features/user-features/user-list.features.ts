import {
  createFeature,
  createReducer,
} from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';

import { Features } from 'src/app/shared/enums';
import { initialUserListState } from '../../states';
import { UserListActions } from '../../actions';

export const userListReducer = createReducer(
  initialUserListState,
  immerOn(UserListActions.getUserList, (state) => {
    state.loading = true;
    state.userList = [];
  }),

  immerOn(UserListActions.getUserListSuccess, (state, { data }) => {
    state.userList = data;
  }),

  immerOn(
    UserListActions.getUserListSuccess,
    UserListActions.getUserListError,
    (state) => {
      state.loading = false;
    }
  )
);

export const userListFeature = createFeature({
  name: Features.UserList,
  reducer: userListReducer
});

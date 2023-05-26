import { produce } from 'immer';

import { LOGOUT } from '@/constants';
import * as C from './constants';

export const initialState = {
  introActive: false,
  introStep: 0,
};

const reducer = produce((state, action: StandardAction) => {
  switch (action.type) {
    case 'persist/REHYDRATE': {
      // if (!action.payload) break;

      // const { tutorial = {} } = action.payload;
      // const { introActive, introStep } = tutorial;

      state.introActive = false;
      state.introStep = 0;

      break;
    }

    case C.SET_INTRO_TUT_ACTIVE:
      state.introActive = action.payload.active;

      break;

    case C.SET_INTRO_TUT_STEP:
      state.introStep = action.payload.step;

      break;

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}, initialState);

export default reducer;

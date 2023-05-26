import * as C from './constants';

export const dispatchSetIntroActive = (active: boolean) => ({
  type: C.SET_INTRO_TUT_ACTIVE,
  payload: { active },
});

export const dispatchSetIntroStep = (step: number) => ({
  type: C.SET_INTRO_TUT_STEP,
  payload: { step },
});

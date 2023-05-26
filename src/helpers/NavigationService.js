import { createRef } from 'react';

export const navigationRef = createRef();
export const isReadyRef = createRef();

class NavigationService {
  navigate = (name, params) => {
    if (isReadyRef.current && navigationRef.current)
      navigationRef.current.navigate(name, params);
  };

  goBack = () => {
    if (isReadyRef.current && navigationRef.current)
      navigationRef.current.goBack();
  };

  getNavigation = () => {
    if (isReadyRef.current && navigationRef.current)
      return navigationRef.current;
  };

  getCurrentRoute = () => {
    if (isReadyRef.current && navigationRef.current)
      return navigationRef.current.getCurrentRoute();
  };
}

export default new NavigationService();

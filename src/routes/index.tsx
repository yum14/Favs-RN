import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainRoutes from './Main';

const initialRoutes = () => {
  return (
    <NavigationContainer>
      <MainRoutes />
    </NavigationContainer>
  );
};

export default initialRoutes;

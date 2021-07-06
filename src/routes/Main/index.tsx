import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { createMaterialTopTabNavigator } from '@reactnavigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { INITIAL, FAVS, WEBVIEW, CATEGORIES, CATEGORY_EDIT } from '../../constants/path';
import * as Ui from '../../contexts/ui';
import { Initial, Favs, Categories, CategoryEditInfo } from '../../containers';
import { WebView } from '../../components/pages';
import { getMessages } from '../../locales/i18n';

const initialStack = createStackNavigator();
const InitialRoutes = () => {
  const uiContext = React.useContext(Ui.Context);

  return (
    <initialStack.Navigator headerMode="none">
      {uiContext.applicationState === Ui.Status.INITIAL ? (
        <initialStack.Screen name={INITIAL} component={Initial} />
      ) : (
        <initialStack.Screen name={FAVS} component={HomeRoutes} />
      )}
      {/* <Stack.Screen name={INITIAL} component={Initial} />
      <Stack.Screen name="HOMENAV" component={HomeNav} /> */}
    </initialStack.Navigator>
  );
};

const HomeBottomTab = createMaterialBottomTabNavigator();
const HomeRoutes = () => {
  const selectHomeIcon = React.useCallback((focused: boolean) => {
    return focused ? 'home' : 'home-outline';
  }, []);
  const selectCategoriesIcon = React.useCallback((focused: boolean) => {
    return focused ? 'view-grid' : 'view-grid-outline';
  }, []);
  const messages = getMessages();

  return (
    <HomeBottomTab.Navigator shifting={true}>
      <HomeBottomTab.Screen
        name={FAVS}
        component={FavsRoutes}
        options={{
          tabBarLabel: messages.bottomTab_home,
          tabBarColor: '#000',
          tabBarIcon: props => (
            <MaterialCommunityIcons name={selectHomeIcon(props.focused)} color={props.color} size={26} />
          ),
        }}
      />
      <HomeBottomTab.Screen
        name={CATEGORIES}
        component={CategoryRoutes}
        options={{
          tabBarLabel: messages.bottomTab_category,
          tabBarColor: '#000',
          tabBarIcon: props => (
            <MaterialCommunityIcons name={selectCategoriesIcon(props.focused)} color={props.color} size={26} />
          ),
        }}
      />
    </HomeBottomTab.Navigator>
  );
};

interface Params {
  uri: string;
}

const FavsStack = createStackNavigator();
const FavsRoutes = () => {
  return (
    <FavsStack.Navigator initialRouteName={FAVS} headerMode="screen">
      <FavsStack.Screen name={FAVS} component={Favs} options={{ headerShown: false }} />
      <FavsStack.Screen name={WEBVIEW} component={WebView} options={{ headerShown: false }} />
    </FavsStack.Navigator>
  );
};

const CategoryStack = createStackNavigator();
const CategoryRoutes = () => {
  return (
    <CategoryStack.Navigator initialRouteName={CATEGORIES} headerMode="screen">
      <CategoryStack.Screen name={CATEGORIES} component={Categories} options={{ headerShown: false }} />
      {/* <CategoryStack.Screen name={CATEGORY_EDIT} component={CategoryEditInfoRoutes} /> */}
      <CategoryStack.Screen
        name={CATEGORY_EDIT}
        component={CategoryEditInfo}
        options={{ headerShown: false }}
        // options={{ header: () => <PaperHeader title="Edit Info" rightButtonVisible={false} /> }}
      />
    </CategoryStack.Navigator>
  );
};

interface categoryEditRouteParams {
  id: string;
}

export default InitialRoutes;

import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, DefaultTheme, Colors } from 'react-native-paper';
import * as UiContext from './contexts/ui';
import Routes from './routes';
import ShareMenu from 'react-native-share-menu';

type SharedItem = {
  mimeType: string;
  data: string;
  extraData: any;
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    // primary: '#3498db',
    // accent: '#f1c40f',
    primary: '#000',
    accent: Colors.pink300,
  },
};

const App = () => {
  const [applicationState, setApplicationState] = React.useState(UiContext.createApplicationInitialState());
  const [sharedData, setSharedData] = React.useState<SharedItem>();

  const handleShare = React.useCallback((item: SharedItem) => {
    if (!item) {
      return;
    }
    setSharedData(item);

    console.log(`shareitem: ${item}`);
  }, []);

  React.useEffect(() => {
    ShareMenu.getInitialShare(handleShare);
  }, [handleShare]);

  React.useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);

    return () => {
      listener.remove();
    };
  }, [handleShare]);

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <UiContext.Context.Provider
            value={{ applicationState: applicationState, setApplicationState: setApplicationState }}
          >
            <Routes />
          </UiContext.Context.Provider>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;

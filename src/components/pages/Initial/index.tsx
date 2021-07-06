import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from 'react-native-paper';
import { Context as UiContext, Status } from '../../../contexts/ui';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.pink300,
  },
  text: {
    fontSize: 48,
    color: Colors.white,
    fontWeight: 'bold',
  },
});

interface Props {
  actions: {
    setFavs: () => Promise<void>;
  };
}

const useFavRepository = (setFavs: () => Promise<void>) => {
  const { setApplicationState } = React.useContext(UiContext);

  return async () => {
    await setFavs();
    setApplicationState(Status.LOADED);
  };
};

const Initial = (props: Props) => {
  const { setFavs } = props.actions;
  const retrieveFavRepository = useFavRepository(setFavs);

  React.useEffect(() => {
    retrieveFavRepository();
  }, []);

  return (
    <View style={styles.container}>
      {/* <ActivityIndicator animating={true} color={Colors.deepOrangeA700} size="large" /> */}
      <Text style={styles.text}>favs</Text>
    </View>
  );
};

export default Initial;

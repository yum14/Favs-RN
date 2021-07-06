import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { default as FavBox, State as FavBoxState } from '../molecules/FavBox';

export type State = FavBoxState & {
  order: number;
};

interface Props {
  data: Array<State>;
  backgroundColor?: string;
  actions: {
    onCardPress: (state: State) => void;
    onCardLongPress: (state: State) => void;
  };
}

const FavList = (props: Props) => {
  const { data, backgroundColor } = props;
  const { onCardPress, onCardLongPress } = props.actions;
  const sortedData = [...data].sort((a, b) => {
    return a.order > b.order ? -1 : 1;
  });

  const getPressAction = (state: State) => {
    return () => onCardPress(state);
  };

  const getLongPressAction = (state: State) => {
    return () => onCardLongPress(state);
  };

  const containerStyle = {
    ...styles.container,
    // backgroundColor,
  };

  return (
    <FlatList
      style={containerStyle}
      data={sortedData}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item }) => (
        <FavBox
          // {...item}
          id={item.id}
          uri={item.uri}
          title={item.title}
          comment={item.comment}
          category={item.category}
          // desc={item.desc}
          imageSource={item.imageSource}
          options={{ numberOfLines: 3, ellipsizeMode: 'tail' }}
          actions={{ onPress: getPressAction(item), onLongPress: getLongPressAction(item) }}
          paddingHorizontal={24}
        />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={() => <View style={styles.header} />}
      ListFooterComponent={() => <View style={styles.footer} />}
      keyExtractor={item => item.id}
      // ListHeaderComponent={props.header}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    // margin: 16,
  },
  separator: {
    height: 24,
  },
  header: {
    height: 32,
  },
  footer: {
    height: 40,
  },
});

export default FavList;

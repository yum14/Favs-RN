import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Menu, Colors } from 'react-native-paper';
import * as window from '../../lib/window';
import { ColorTile } from '../../components/molecules';
import { CATEGORY_COLORS } from '../../constants/theme';

interface Props {
  visible?: boolean;
  anchor: any;
  onDismiss: () => void;
  onSelected: (backgroundColor: string) => void;
  selectedColor: string;
}

interface Color {
  id: number;
  color: string;
  visible: boolean;
}

const tileContainerWidth = window.width * 0.8 + 16;
const tileContainerMaxHeight = window.height * 8;
const tileWidth = (window.width * 0.8) / 3;

const createInitialIconState = (color: string): Array<Color> => {
  return CATEGORY_COLORS.map((item, index) => {
    return {
      id: index,
      color: item,
      visible: item === color ? true : false,
    };
  });
};

const ColorSelectMenu = (props: Props) => {
  const { visible = false, anchor, onDismiss, onSelected, selectedColor } = props;
  const [colors, setColors] = React.useState(createInitialIconState(selectedColor));

  const getIconVisible = React.useCallback(
    (id: number) => {
      return colors.find(item => item.id === id)!.visible;
    },
    [colors],
  );

  const onTilePressed = React.useCallback(
    (id: number) => {
      return () => {
        const newValue = [...colors];
        const targetIndex = colors.findIndex(item => item.id === id && item.visible === false);
        if (targetIndex !== -1) {
          newValue.forEach((item, index) => {
            if (index === targetIndex) {
              item.visible = true;
            } else {
              item.visible = false;
            }
          });
          setColors(newValue);
          onSelected(newValue[targetIndex].color);
        }
      };
    },
    [colors, setColors, onSelected],
  );

  return (
    <View>
      <Menu visible={visible} onDismiss={onDismiss} anchor={anchor}>
        <ScrollView contentContainerStyle={styles.tileContainer}>
          {colors.map(color => {
            return (
              <ColorTile
                key={color.id}
                width={tileWidth}
                height={tileWidth}
                backgroundColor={color.color}
                iconName="check-bold"
                iconSize={32}
                iconColor={Colors.white}
                iconVisible={getIconVisible(color.id)}
                onPress={onTilePressed(color.id)}
              />
            );
          })}
        </ScrollView>
      </Menu>
    </View>
    // </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // height: 64,
    // backgroundColor: 'red',
    // padding: 50,
    // padding: 20,
    // margin:
  },
  separator: {
    height: 24,
    // backgroundColor: 'red',
  },
  header: {
    height: 12,
  },
  footer: {
    height: 12,
  },
  tileContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxHeight: tileContainerMaxHeight,
    width: tileContainerWidth,
    paddingHorizontal: 8,
  },
});

export default ColorSelectMenu;

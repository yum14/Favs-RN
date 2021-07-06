import React from 'react';
import { StyleSheet, View, TextInput as RNTextInput } from 'react-native';
import { TextInput } from 'react-native-paper';
import { BackgroundAngleRightDisplay } from '../../../molecules';
import { Category } from '../../../../domain/models';
import ColorSelectMenu from '../../../organisms/ColorSelectMenu';
import { PaperHeader } from '../../../../routes/Header';
import { getMessages } from '../../../../locales/i18n';

interface Props {
  category: Category.Model;
  // name: string;
  actions: {
    editCategory: (id: string, values: Category.Model, newValues: Category.Values) => void;
  };
}

const EditInfo = (props: Props) => {
  const { category } = props;
  const { editCategory } = props.actions;
  const [inputCategory, setInputCategory] = React.useState(category.name);
  const [selectBackgroundColor, setSelectBackgroundColor] = React.useState(category.backgroundColor);
  const [colorSelectMenuVisible, setColorSelectMenuVisible] = React.useState(false);
  const messages = getMessages();

  const openBackgroundColorEdit = React.useCallback(() => {
    if (categoryRef && categoryRef.current) {
      categoryRef.current.blur();
    }
    setColorSelectMenuVisible(true);
  }, [setColorSelectMenuVisible]);

  const onMenuSelected = React.useCallback(
    (backgroundColor: string) => {
      setSelectBackgroundColor(backgroundColor);
      setColorSelectMenuVisible(false);
    },
    [setSelectBackgroundColor, setColorSelectMenuVisible],
  );

  const onMenuDismiss = React.useCallback(() => {
    setColorSelectMenuVisible(false);
  }, [setColorSelectMenuVisible]);

  const onCategoryChangeText = React.useCallback(
    (text: string) => {
      setInputCategory(text);
    },
    [setInputCategory],
  );

  const getOnBackButtonPress = React.useCallback(
    (inputCategoryName: string, inputBackgroundColor: string) => {
      return () => {
        const newCategoryName = !inputCategoryName ? category.name : inputCategoryName;
        if (category.name !== newCategoryName || category.backgroundColor !== inputBackgroundColor) {
          const newCategory = {
            ...category,
            name: newCategoryName,
            backgroundColor: inputBackgroundColor,
          };
          editCategory(category.id, category, newCategory);
        }
      };
    },
    [editCategory, category],
  );

  const categoryRef = React.useRef<HTMLInputElement>(null);

  return (
    <View style={styles.container}>
      <PaperHeader
        title={messages.category_edit_title}
        leftButtonOptions={{ icon: 'back', onPress: getOnBackButtonPress(inputCategory, selectBackgroundColor) }}
        rightButtonVisible={false}
      />
      <View style={styles.categoryContainer}>
        <TextInput
          theme={{ colors: { background: 'white' } }}
          label={messages.category_edit_category}
          autoCapitalize="none"
          onChangeText={onCategoryChangeText}
          value={inputCategory}
          ref={categoryRef}
          maxLength={30}
          multiline={false}
          numberOfLines={1}
          // dense={true}
          style={styles.categoryInput}
        />
      </View>
      <RNTextInput />
      <ColorSelectMenu
        anchor={
          <BackgroundAngleRightDisplay
            label={messages.category_edit_background}
            selectedColor={selectBackgroundColor}
            onPress={openBackgroundColorEdit}
          />
        }
        selectedColor={selectBackgroundColor}
        onDismiss={onMenuDismiss}
        visible={colorSelectMenuVisible}
        onSelected={onMenuSelected}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryContainer: {
    margin: 8,
  },
  categoryInput: {
    height: 64,
    paddingTop: 24,
    paddingBottom: 4,
    // flexWrap: 'nowrap',
    // flex: 1,
    // overflow: 'hidden',
  },
});

export default EditInfo;

import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { PageInfo } from '../../../../domain/models';
import { CategorySelectField } from '../../../molecules';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Modal from 'react-native-modalbox';
import { State as FavBoxState } from '../../../molecules/FavBox';
import { CategorySelectMenu } from '../../../organisms';
import Header from './Header';
import { COLOR } from '../../../../constants/theme';

export type CategoryState = {
  id: string;
  name: string;
  order: number;
  backgroundColor: string;
};

export type FavState = FavBoxState;

interface Props {
  // visible?: boolean;
  fav: PageInfo.Model;
  categories: CategoryState[];
  onClosed: () => void;
  update: (values: PageInfo.Model, newValues: PageInfo.Values) => void;
  isOpen: boolean;
}

export interface State {
  uri: string;
  categoryId: string;
}

const initialCategory = {
  id: '',
  name: '',
  order: 0,
  backgroundColor: '',
};

const EditInfo = (props: Props) => {
  const { fav, onClosed, categories, update, isOpen } = props;
  const [categorySelectMenuVisible, setCategorySelectMenuVisible] = React.useState(false);
  const [selectCategory, setSelectCategory] = React.useState(initialCategory);

  const onMenuSelected = React.useCallback(
    (id: string) => {
      const category = categories.find(item => item.id === id);

      if (category) {
        setSelectCategory(category);
      }
      setCategorySelectMenuVisible(false);
    },
    [setSelectCategory, setCategorySelectMenuVisible, categories],
  );

  const onDone = React.useCallback(() => {
    update(fav, {
      ...fav,
      category: selectCategory.id,
    });
  }, [update, fav, selectCategory]);

  React.useEffect(() => {
    if (fav && fav.category) {
      const category = categories.find(item => item.id === fav.category);
      if (category) {
        setSelectCategory(category);
      }
    }
  }, [fav, categories, setSelectCategory]);

  const onCloseCallback = React.useCallback(() => {
    if (fav && fav.category) {
      const category = categories.find(item => item.id === fav.category);
      if (category) {
        setSelectCategory(category);
      }
    }
    onClosed();
  }, [fav, categories, setSelectCategory, onClosed]);

  return (
    <Modal isOpen={isOpen} position="bottom" style={styles.container} onClosed={onCloseCallback}>
      <Header onCancel={onCloseCallback} onDone={onDone} />
      <TextInput
        theme={{ colors: { background: COLOR.BACKGROUND } }}
        label="URL"
        autoCapitalize="none"
        value={fav.uri}
        editable={false}
      />
      <CategorySelectMenu
        anchor={
          <TouchableWithoutFeedback
            onPress={() => {
              setCategorySelectMenuVisible(true);
            }}
          >
            <CategorySelectField label={selectCategory.name} tileColor={selectCategory?.backgroundColor} />
          </TouchableWithoutFeedback>
        }
        onDismiss={() => setCategorySelectMenuVisible(false)}
        visible={categorySelectMenuVisible}
        categories={categories}
        onSelected={onMenuSelected}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: '10%',
    borderRadius: 8,
    // overflow: 'hidden',
    // height: window.height * 0.76,
  },
  url: {
    marginTop: 32,
  },
});

export default EditInfo;

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Portal, Dialog, TextInput, Button, Colors, HelperText } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-community/clipboard';
import { useForm, Controller } from 'react-hook-form';
import { CategorySelectField } from '../../../molecules';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import Modal from 'react-native-modalbox';
import { CategorySelectMenu } from '../../../organisms';
import { getMessages } from '../../../../locales/i18n';
import { COLOR } from '../../../../constants/theme';

const URL_PATTERN = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/;

export type Category = {
  id: string;
  name: string;
  order: number;
  backgroundColor: string;
};

interface Props {
  visible?: boolean;
  categories: Category[];
  onSubmit?: (state: State) => void;
  onDismiss?: () => void;
  categoryId: string;
}

export interface State {
  uri: string;
  categoryId: string;
}

const initialState = {
  uri: '',
  categoryId: '',
};

const initialCategory = {
  id: '',
  name: '',
  order: 0,
  backgroundColor: '',
};

interface FormInput {
  url: string;
}

const New = (props: Props) => {
  const { visible = false, categories, onSubmit, onDismiss, categoryId } = props;
  const [inputState, setInputState] = React.useState<State>(initialState);
  const [selectCategory, setSelectCategory] = React.useState<Category>(initialCategory);
  const { control, handleSubmit, errors, setValue } = useForm<FormInput>();
  const [categorySelectMenuVisible, setCategorySelectMenuVisible] = React.useState(false);
  const messages = getMessages();
  const validationTypes = [
    {
      type: 'required',
      message: messages.fav_new_url_required,
    },
    {
      type: 'pattern',
      message: messages.fav_new_url_pettern,
    },
  ];

  const onChangeText = React.useCallback(
    (value: string, name: string) => {
      setValue(name, value);
      setInputState(state => {
        return { ...state, uri: value };
      });
    },
    [setValue, setInputState],
  );

  const onDismissCallback = React.useCallback(() => {
    if (onDismiss) {
      onDismiss();
    }
    if (categoryId) {
      const category = categories.find(item => item.id === categoryId);
      if (category) {
        setSelectCategory(category);
        setInputState(state => ({
          ...initialState,
          categoryId: categoryId,
        }));
      }
    }
  }, [categories, categoryId, onDismiss, setSelectCategory, setInputState]);

  const onSubmitCallback = React.useCallback(
    (state: State) => {
      return () => {
        if (!onSubmit) {
          return;
        }
        onSubmit(state);
      };
    },
    [onSubmit],
  );

  const createValidationMessage = (type: string) => {
    const message = validationTypes.find(item => item.type === type);
    return message ? <HelperText type="error">{message.message}</HelperText> : <></>;
  };

  const onMenuSelected = React.useCallback(
    (id: string) => {
      const category = categories.find(item => item.id === id);
      if (category) {
        setSelectCategory(category);
        setInputState(state => ({ ...state, categoryId: category.id }));
      }
      setCategorySelectMenuVisible(false);
    },
    [categories],
  );

  const paste = () => {
    const setClipboardString = async () => {
      const clipboardString = await Clipboard.getString();
      setValue('url', clipboardString);
      setInputState(state => {
        return { ...state, uri: clipboardString };
      });
    };
    setClipboardString();
  };

  const onCategorySelectMenuPress = React.useCallback(() => {
    if (urlRef && urlRef.current) {
      urlRef.current.blur();
    }
    setCategorySelectMenuVisible(true);
  }, [setCategorySelectMenuVisible]);

  const onCategorySelectMenuDismiss = React.useCallback(() => {
    setCategorySelectMenuVisible(false);
  }, [setCategorySelectMenuVisible]);

  React.useEffect(() => {
    if (categoryId) {
      const category = categories.find(item => item.id === categoryId);
      if (category) {
        setSelectCategory(category);
        setInputState(state => ({
          ...state,
          categoryId: categoryId,
        }));
      }
    }
  }, [categories, categoryId, setSelectCategory, setInputState]);

  React.useEffect(() => {
    if (urlRef && urlRef.current) {
      urlRef.current.focus();
    }
  }, []);

  const urlRef = React.useRef<HTMLInputElement>(null);

  return (
    <Portal>
      <Dialog style={styles.container} visible={visible} onDismiss={onDismissCallback}>
        <Dialog.Title>{messages.fav_new_title}</Dialog.Title>
        <Dialog.Content>
          <View style={styles.urlContainer}>
            <View style={styles.urlInput}>
              <Controller
                control={control}
                render={({ onChange, onBlur, value, name }) => {
                  return (
                    <TextInput
                      theme={{ colors: { background: COLOR.BACKGROUND } }}
                      ref={urlRef}
                      label="URL"
                      autoCapitalize="none"
                      onChangeText={(text: string) => onChangeText(text, name)}
                      onChange={onChange}
                      onBlur={onBlur}
                      // selectionColor={Colors.redA700}
                      // underlineColor={Colors.redA700}
                      error={errors.url ? true : false}
                      value={value}
                      maxLength={100}
                    />
                  );
                }}
                name="url"
                rules={{ required: true, pattern: URL_PATTERN }}
                defaultValue=""
              />
            </View>
            <Icon style={styles.icon} size={24} color={Colors.grey900} name="content-paste" onPress={paste} />
          </View>
          {errors.url && createValidationMessage(errors.url.type)}
          <CategorySelectMenu
            anchor={
              <TouchableWithoutFeedback onPress={onCategorySelectMenuPress}>
                <CategorySelectField label={selectCategory.name} tileColor={selectCategory?.backgroundColor} />
              </TouchableWithoutFeedback>
            }
            onDismiss={onCategorySelectMenuDismiss}
            visible={categorySelectMenuVisible}
            categories={categories}
            onSelected={onMenuSelected}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismissCallback}>{messages.fav_new_cancel}</Button>
          <Button onPress={handleSubmit(onSubmitCallback(inputState))}>{messages.fav_new_create}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: '10%',
    borderRadius: 4,
    overflow: 'hidden',
    // width: window.width * 0.8,
    // alignSelf: 'center',
    // height: window.height * 0.76,
  },
  urlContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  urlInput: { flex: 6 },
  icon: { flex: 1, textAlign: 'center' },
  category: { marginVertical: 8 },
});

export default New;

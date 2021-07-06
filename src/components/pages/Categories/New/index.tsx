import React from 'react';
import { StyleSheet, View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import Modal from 'react-native-modalbox';
import { BackgroundAngleRightDisplay } from '../../../molecules';
import { CATEGORY_COLORS } from '../../../../constants/theme';
import ColorSelectMenu from '../../../organisms/ColorSelectMenu';
import Header from './Header';
import { getMessages } from '../../../../locales/i18n';

interface Props {
  isOpen: boolean;
  onClosed: () => void;
  onCreatePressed: (state: State) => void;
}

export interface State {
  category: string;
  backgroundColor: string;
}

interface FormInput {
  category: string;
}

const initialState = {
  category: '',
  backgroundColor: CATEGORY_COLORS[0],
};

const New = (props: Props) => {
  const { isOpen, onClosed, onCreatePressed } = props;
  const [inputState, setInputState] = React.useState(initialState);
  const [colorSelectMenuVisible, setColorSelectMenuVisible] = React.useState(false);
  const { control, handleSubmit, errors, setValue } = useForm<FormInput>();
  const messages = getMessages();
  const validationTypes = [
    {
      type: 'required',
      message: messages.category_new_url_required,
    },
  ];

  const onMenuSelected = React.useCallback(
    (backgroundColor: string) => {
      setInputState(value => ({ ...value, backgroundColor }));
      setColorSelectMenuVisible(false);
    },
    [setInputState, setColorSelectMenuVisible],
  );

  const openBackgroundColorEdit = React.useCallback(() => {
    if (categoryRef && categoryRef.current) {
      categoryRef.current.blur();
    }
    setColorSelectMenuVisible(true);
  }, [setColorSelectMenuVisible]);

  const onColorSelectMenuDismiss = React.useCallback(() => {
    setColorSelectMenuVisible(false);
  }, [setColorSelectMenuVisible]);

  const onCategoryChangeText = React.useCallback(
    (value: string, name: string) => {
      setValue(name, value);
      setInputState(state => ({ ...state, category: value }));
    },
    [setValue, setInputState],
  );

  const onClosedCallback = React.useCallback(() => {
    onClosed();
    setInputState(initialState);
  }, [onClosed, setInputState]);

  const OnCreatedCallback = React.useCallback(
    (state: State) => {
      return () => {
        onCreatePressed(state);
        setInputState(initialState);
      };
    },
    [onCreatePressed, setInputState],
  );

  const createValidationMessage = (type: string) => {
    const message = validationTypes.find(item => item.type === type);
    return message ? <HelperText type="error">{message.message}</HelperText> : <></>;
  };

  const categoryRef = React.useRef<HTMLInputElement>(null);

  return (
    <Modal isOpen={isOpen} position="bottom" style={styles.container} onClosed={onClosed}>
      <Header onCancel={onClosedCallback} onCreated={handleSubmit(OnCreatedCallback(inputState))} />
      <View style={styles.categoryContainer}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value, name }) => {
            return (
              <TextInput
                theme={{ colors: { background: 'white' } }}
                label={messages.category_new_category}
                autoCapitalize="none"
                onChangeText={(text: string) => onCategoryChangeText(text, name)}
                onChange={onChange}
                onBlur={onBlur}
                error={errors.category ? true : false}
                ref={categoryRef}
                value={value}
                maxLength={30}
                autoFocus={true}
                dense={true}
                style={styles.categoryInput}
              />
            );
          }}
          name="category"
          rules={{ required: true }}
          defaultValue=""
        />
      </View>
      {errors.category && createValidationMessage(errors.category.type)}
      <ColorSelectMenu
        anchor={
          <BackgroundAngleRightDisplay
            label={messages.category_new_background}
            selectedColor={inputState.backgroundColor}
            onPress={openBackgroundColorEdit}
          />
        }
        selectedColor={inputState.backgroundColor}
        onDismiss={onColorSelectMenuDismiss}
        visible={colorSelectMenuVisible}
        onSelected={onMenuSelected}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop: '10%',
    // borderRadius: 8,
  },
  categoryContainer: {
    margin: 8,
  },
  categoryInput: {
    height: 64,
    paddingTop: 24,
    paddingBottom: 4,
  },
});

export default New;

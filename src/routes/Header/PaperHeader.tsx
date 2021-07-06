import React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

type LeftButtonType = 'back' | 'close';

interface Props {
  title: string;
  leftButtonVisible?: boolean;
  leftButtonOptions?: {
    icon?: LeftButtonType;
    onPress?: () => void;
  };
  rightButtonVisible?: boolean;
  rightButtonOptions?: {
    icon?: string;
    onPress?: () => void;
  };
}

const PaperHeader = (props: Props) => {
  const { title, leftButtonVisible = true, leftButtonOptions, rightButtonVisible = true, rightButtonOptions } = props;
  const leftIcon = leftButtonOptions ? leftButtonOptions.icon : 'back';
  const onLeftPress = leftButtonOptions?.onPress;
  const rightIcon = rightButtonOptions && rightButtonOptions.icon ? rightButtonOptions.icon : '';
  const onRightPress = rightButtonOptions?.onPress;
  const { goBack } = useNavigation();

  const onBackActionPress = React.useCallback(() => {
    if (onLeftPress) {
      onLeftPress();
    }
    goBack();
  }, [onLeftPress, goBack]);

  const renderLeftButton = (type: LeftButtonType) => {
    return type === 'close' ? (
      <Appbar.Action icon="close" onPress={onBackActionPress} />
    ) : (
      <Appbar.BackAction onPress={onBackActionPress} />
    );
  };

  return (
    <Appbar.Header>
      {leftButtonVisible && leftIcon && renderLeftButton(leftIcon)}
      <Appbar.Content title={title} />
      {rightButtonVisible && <Appbar.Action icon={rightIcon} onPress={onRightPress} />}
    </Appbar.Header>
  );
};

export default PaperHeader;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Divider } from 'react-native-paper';
// import Modal from 'react-native-modal';
import Modal from 'react-native-modalbox';
import * as window from '../../lib/window';
import { COLOR } from '../../constants/theme';
import { ModalIconButtom } from '../molecules';
import { getMessages } from '../../locales/i18n';

interface Props {
  visible?: boolean;
  onEdit: () => void;
  onCopy: () => void;
  onShare: () => void;
  onDelete: () => void;
  onClosed: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const FavOperationMenu = (props: Props) => {
  const { visible = false, onEdit, onCopy, onShare, onDelete, onClosed, onMoveUp, onMoveDown } = props;
  const messages = getMessages();

  return (
    <Modal style={styles.modal} isOpen={visible} position="bottom" onClosed={onClosed}>
      <View style={styles.buttonBox}>
        <ModalIconButtom
          paddingTop={16}
          materialCommunityIcon="content-copy"
          label={messages.favs_menu_copy}
          onPress={onCopy}
        />
        <ModalIconButtom materialCommunityIcon="share-variant" label={messages.favs_menu_share} onPress={onShare} />
        <ModalIconButtom materialCommunityIcon="square-edit-outline" label={messages.favs_menu_edit} onPress={onEdit} />
        <ModalIconButtom
          materialCommunityIcon="arrow-up-bold-outline"
          label={messages.favs_menu_moveup}
          onPress={onMoveUp}
        />
        <ModalIconButtom
          materialCommunityIcon="arrow-down-bold-outline"
          label={messages.favs_menu_movedown}
          onPress={onMoveDown}
        />
        <ModalIconButtom
          paddingBottom={16}
          materialCommunityIcon="trash-can-outline"
          label={messages.favs_menu_delete}
          color={Colors.redA700}
          onPress={onDelete}
        />
        <Divider style={styles.divideｒ} />
        <ModalIconButtom materialCommunityIcon="close" label={messages.favs_menu_cancel} onPress={onClosed} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
  },
  modal: {
    // flex: 1,
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonBox: {
    // flex: 1,
    // marginTop: 32,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: COLOR.BACKGROUND,
    width: window.width,
    borderWidth: 0,
    paddingVertical: 8,
    paddingLeft: 8,
  },
  divideｒ: {
    width: window.width,
  },
});

export default FavOperationMenu;

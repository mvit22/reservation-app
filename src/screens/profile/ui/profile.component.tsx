import React from 'react';
import { Button, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ButtonWrapper,
  InfoTitle,
  LogOutContainer,
  ProfileWrapper,
} from './profile.styles';
import { InfoItem } from '@src/entities/info-item';
import { NavigatorParamList } from '@src/routes';
import { useGetCurrentUser } from '@src/shared/data-access/hooks/queries';
import { useModal } from '@src/shared/hooks';
import { EditProfileModal } from '@src/widgets/edit-profile-modal';
import { Modal } from '@src/shared/components/modal';
import { useSignOut } from '@src/shared/hooks/use-signout.hook';
import { ChangePasswordModal } from '@src/widgets/change-password-modal';

export type ProfileScreenProps = NativeStackScreenProps<
  NavigatorParamList,
  'Profile'
>;

export const ProfileScreen: React.FC<ProfileScreenProps> = ({}) => {
  // const { user: currentUser } = useContext(UserContext);
  const { user, refetch } = useGetCurrentUser();
  const { isOpen, handleClose, handleOpen } = useModal();
  const {
    isOpen: isChangePasswordModalOpen,
    handleClose: handleChangePasswordModalClose,
    handleOpen: handleChangePasswordModalOpen,
  } = useModal();
  const { signOut } = useSignOut();

  return user ? (
    <ProfileWrapper>
      <View>
        <InfoTitle>Profile Info</InfoTitle>
        <InfoItem title="Email" value={user.email} />
        <InfoItem title="Name" value={user.displayName} />
        <ButtonWrapper>
          <Button title="Edit Profile Info" onPress={handleOpen} />
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            title="Change Password"
            onPress={handleChangePasswordModalOpen}
          />
        </ButtonWrapper>
      </View>
      <LogOutContainer>
        <Button title="Log Out" onPress={signOut} color="red" />
      </LogOutContainer>
      <Modal open={isOpen} onClose={handleClose} title="Edit Profile Info">
        <EditProfileModal
          user={user}
          onClose={handleClose}
          onSuccesCallback={refetch}
        />
      </Modal>
      <Modal
        open={isChangePasswordModalOpen}
        onClose={handleChangePasswordModalClose}
        title="Change Password">
        <ChangePasswordModal
          user={user}
          onClose={handleChangePasswordModalClose}
        />
      </Modal>
    </ProfileWrapper>
  ) : null;
};

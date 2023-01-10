import React, { useContext } from 'react';
import { Button, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ButtonWrapper,
  InfoTitle,
  LogOutContainer,
  ProfileWrapper,
} from './profile.styles';
import { UserContext } from '@src/app/App';
import { InfoItem } from '@src/entities/info-item';
import { NavigatorParamList } from '@src/routes';
import { Loading } from '@src/shared/components/loader';
import { useGetCurrentUser } from '@src/shared/data-access/hooks/queries';
import { useModal } from '@src/shared/hooks';
import { ChangePasswordModal } from '@src/widgets/change-password-modal';
import { EditProfileModal } from '@src/widgets/edit-profile-modal';
import { Modal } from '@src/shared/components/modal';

export type ProfileScreenProps = NativeStackScreenProps<
  NavigatorParamList,
  'Profile'
>;

export const ProfileScreen: React.FC<ProfileScreenProps> = ({}) => {
  const { userId, setUserId } = useContext(UserContext);
  const { data: user, isLoading, refetch } = useGetCurrentUser(userId!);
  const { isOpen, handleClose, handleOpen } = useModal();
  const {
    isOpen: isChangePasswordModalOpen,
    handleClose: handleChangePasswordModalClose,
    handleOpen: handleChangePasswordModalOpen,
  } = useModal();

  if (isLoading) {
    return <Loading />;
  }

  return user ? (
    <ProfileWrapper>
      <View>
        <InfoTitle>Profile Info</InfoTitle>
        <InfoItem title="Username" value={user.username} />
        <InfoItem title="Full Name" value={user.name} />
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
        <Button title="Log Out" onPress={() => setUserId!(null)} color="red" />
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
          onSuccesCallback={refetch}
        />
      </Modal>
    </ProfileWrapper>
  ) : null;
};

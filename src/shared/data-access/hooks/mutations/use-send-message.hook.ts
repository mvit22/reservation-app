import { db } from '@src/app/firebase';
import { MessageData } from '@src/widgets/chat-modal/ui/message.component';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { Alert } from 'react-native';

export const useSendMessage = (
  reservationId: string,
  successCallback?: () => void,
) => {
  const mutate = (data: MessageData) => {
    const reservationRef = doc(db, 'reservations', reservationId);

    updateDoc(reservationRef, {
      chat: arrayUnion(data),
    })
      .then(() => {
        successCallback && successCallback();
      })
      .catch(error => {
        Alert.alert(error.code, error.message);
      });
  };

  return { mutate };
};

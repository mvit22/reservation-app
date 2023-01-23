import { db } from '@src/app/firebase';
import { MessageData } from '@src/widgets/chat-modal/ui/message.component';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useChatData = (chatId: string) => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const unsub = onSnapshot(doc(db, `reservations/${chatId}`), doc => {
      setMessages(doc.data()?.chat ?? []);
      setIsLoading(false);
    });
    return () => {
      unsub();
    };
  }, [chatId]);

  return { messages, isLoading };
};

import { PUBLIC_CHAT } from '../../common/config/constants.config';
import { TIo } from './socket.interfaces';

export const publicChatHandler = (io: TIo) => (socket: string) => {
  io.emit(PUBLIC_CHAT, socket);
};

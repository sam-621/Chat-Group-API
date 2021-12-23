import { PUBLIC_CHAT } from '../../common/config/constants.config';
import { TIo } from './socket.interfaces';
import { IGlobalChatOwner } from './sockets.dto';

export const publicChatHandler = (io: TIo) => (socket: IGlobalChatOwner) => {
  io.emit(PUBLIC_CHAT, socket);
};

import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { PUBLIC_CHAT } from '../../common/config/constants.config';
import { TIo } from './socket.interfaces';
import { PublicChatDto } from './sockets.dto';

export const publicChat = (io: TIo) => (socket: string) => {
  io.emit(PUBLIC_CHAT, socket);
};

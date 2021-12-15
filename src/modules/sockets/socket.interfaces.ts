import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export type TIo = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

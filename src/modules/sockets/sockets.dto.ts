export interface IGlobalChatDto {
  id: string;
  message: string;
  owner: IGlobalChatOwner;
}

export interface IGlobalChatOwner {
  id: string;
  profilePic: string;
  username: string;
}

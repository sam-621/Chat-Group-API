export interface PublicChatDto {
  message: string;
  owner: IPublicChatOwner;
}

export interface IPublicChatOwner {
  profilePic: string;
  username: string;
}

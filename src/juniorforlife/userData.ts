import { ImageRequireSource } from "react-native";


export interface UserModel {
  id: number;
  avatar: ImageRequireSource;
}

export const users: UserModel[] = [
  {
    id: 0,
    avatar: require('./users/girl1.jpeg'),
  },
  {
    id: 1,
    avatar: require('./users/girl2.jpeg'),
  },
  {
    id: 2,
    avatar: require('./users/girl3.jpeg'),
  },
  {
    id: 3,
    avatar: require('./users/girl4.jpeg'),
  },
  {
    id: 4,
    avatar: require('./users/girl5.jpeg'),
  },
];
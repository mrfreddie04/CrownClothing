import { Timestamp } from "firebase/firestore";

// export interface UserCreateDTO {
//   displayName: string;
//   email: string;
//   createdAt: Timestamp;
// }

export interface UserData {
  id: string;
  displayName: string;
  email: string;
  createdAt: Timestamp;
}
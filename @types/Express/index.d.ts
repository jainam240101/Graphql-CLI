/** @format */

// import { User } from "../entity/Users";

// declare global {
//   namespace Express {
//     interface Request {
//       currentUser: User | undefined;
//     }
//   }
// }

export {};

declare global {
  namespace Express {
    interface Request {
      userSession: any;
    }
    interface Response {
      userSession: any;
    }
  }
}

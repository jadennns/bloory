import { User } from "./dts/user";

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}

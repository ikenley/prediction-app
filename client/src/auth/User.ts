import { jwtDecode } from "jwt-decode";

export default class User {
  constructor(public id: string, public email: string) {}

  public static fromIdToken(idToken: string) {
    const decoded = jwtDecode(idToken) as any;

    const id = decoded.sub;
    const email = decoded.email;

    return new User(id, email);
  }
}

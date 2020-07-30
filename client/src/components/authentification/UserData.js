import { extendObservable } from "mobx";


class UserData {
  constructor() {
    extendObservable(this, {
      loading: false,
      isLoggedIn: true,
      username: "",
      post: "aaa",
    });
  }
}

export default new UserData();

import WebApi from "./webApi";

class WebApiUser {
  static Login(data) {
    console.log("data--.", data);
    return WebApi.ApisType(`/auth/login`, "post", data);
  }

  static getUserById(data) {
    return WebApi.ApisType(`/user/user/${data}`, "get");
  }

  static getUsers() {
    return WebApi.ApisType(`/user/users`, "get");
  }

  static createUser(data) {
    return WebApi.ApisType(`/user/user`, "post", data);
  }

  static deleteUser(data) {
    return WebApi.ApisType(`/user/${data}`, "delete");
  }
}

export default WebApiUser;

import WebApi from "./webApi";

class WebApiProgram {
  static getPrograms() {
    return WebApi.ApisType(`/configuration/programs`, "get");
  }
  static createProgram(data) {
    return WebApi.ApisType(`/configuration/programs`, "post", data);
  }
  static deleteProgram(data) {
    return WebApi.ApisType(`/configuration/${data}`, "delete");
  }
}

export default WebApiProgram;

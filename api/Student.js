import WebApi from "./webApi";

class WebApiStudent {
  static getStudents(data) {
    return WebApi.ApisType(`/student/students`, "get");
  }
}

export default WebApiStudent;

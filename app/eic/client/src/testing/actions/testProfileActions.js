import * as ProfileActions from "../../actions/ProfileActions.js";

export function testUpdateProfileInfo() {
  const testStudentInput = {
    info: [{ itemtype: "Student" }],
    biography: "Test1",
    interests: "Test2"
  };
  const testStudent = ProfileActions.updateProfileInfo(testStudentInput);

  const testBuddyInput = {
    info: [{ itemtype: "Buddy" }],
    biography: "Test1",
    skills: "Test2",
    company: "Test3"
  };
  const testBuddy = ProfileActions.updateProfileInfo(testBuddyInput);

  const pass1 =
    testStudent.hasOwnProperty("biography") &&
    testStudent.biography === "Test1" &&
    testStudent.hasOwnProperty("interests") &&
    testStudent.interests === "Test2";
  const pass2 =
    testBuddy.hasOwnProperty("biography") &&
    testBuddy.biography === "Test1" &&
    testBuddy.hasOwnProperty("skills") &&
    testBuddy.skills === "Test2" &&
    testBuddy.hasOwnProperty("company") &&
    testBuddy.company === "Test3";

  return pass1 && pass2;
}

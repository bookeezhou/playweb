import { useEffect, useState } from "react";
import { getConfig } from "../../utils/configHelper";
import { getTeacherByTeacherId } from "../../services/apiTeacher";
import { signup } from "../../services/apiAuth";
import { createStudent } from "../../services/apiStudent";

export default function StudentCreate() {
  const [name, setName] = useState("John Doe");

  const [classInfo, setClassInfo] = useState("x | x");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("some@email.com");
  const [teacherId, setTeacherId] = useState("");
  const [classInChargeArr, setClassinChargeArr] = useState([]);

  useEffect(() => {
    const token = getConfig("SUPABASE_TOKEN");
    const userToken = JSON.parse(localStorage.getItem(token));
    if (!userToken) {
      return;
    }
    setTeacherId(userToken.user.id);

    async function fetchData() {
      const teachers = await getTeacherByTeacherId(userToken.user.id);
      const teacherInCharge = setClassinChargeArr(
        JSON.parse(teachers[0].class_in_charge),
      );
    }

    fetchData();
  }, []);

  async function onClick() {
    // Signup student user
    const userData = await signup(email, "123456", { isStudent: true });
    console.log(userData);

    console.log(classInfo);
    // Insert student
    const students = await createStudent({
      name,
      class: classInfo.split("|")[0],
      grade: classInfo.split("|")[1],
      gender,
      teacher_id: teacherId,
      avatar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      student_id: userData.user.id,
    });
    console.log(students);
  }

  return (
    <>
      <div className="w-1/3 mx-auto text-center shadow-2xl shadow-amber-300 rounded-box mt-40 p-6">
        <div>
          <label className="input my-2 w-full">
            Email
            <input
              type="text"
              className="grow"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="input my-2 w-full">
            Name
            <input
              type="text"
              className="grow"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <select
            className="select my-2 w-full"
            value={classInfo}
            onChange={(e) => setClassInfo(e.target.value)}
          >
            <option disabled={true}>Choose Class</option>
            {classInChargeArr.map((item) => (
              <option key={item} value={item}>
                Class {item.split("|")[0]} | Year {item.split("|")[1]}
              </option>
            ))}
          </select>
          <br />

          <select
            className="select my-2 w-full"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option disabled={true}>Choose Gender</option>
            <option>male</option>
            <option>female</option>
          </select>
        </div>

        {/* button */}
        <div>
          <button className="btn btn-primary my-4" onClick={onClick}>
            Create Student
          </button>
        </div>
      </div>
    </>
  );
}

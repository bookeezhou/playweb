import { useEffect, useState } from "react";
import { getUserId } from "../../utils/userHelper";
import { getStudentList } from "../../services/apiStudent";
import { createScore } from "../../services/apiScore";

export default function ScoreUpload() {
  const [score, setScore] = useState(80);
  const [subject, setSubject] = useState("mathmatics");

  const [semesterYear, setSemesterYear] = useState(new Date().getFullYear());
  const [semesterSeason, setSemesterSeason] = useState("Spring");

  const yearList = Array.from(
    { length: new Date().getFullYear() - 2000 + 1 },
    (_, idx) => 2000 + idx,
  );

  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState({
    name: "someone",
    student_id: "12345678",
    class: "x",
    grade: "x",
  });

  useEffect(() => {
    async function fetchData() {
      const userId = getUserId();

      const studentList = await getStudentList(userId);
      // console.log(mockStudentList);
      setCurrentStudent(studentList[0]);
      setStudents(studentList);
    }

    fetchData();
  }, []);

  async function onClick() {
    const newScore = {
      student_id: currentStudent.student_id,
      score,
      subject,
      semesterYear,
      semesterSeason,
    };

    const scores = await createScore(newScore);
    console.log(scores);
  }

  return (
    <>
      <div className="w-1/3 mx-auto text-center shadow-2xl shadow-amber-300 rounded-box mt-40 p-6">
        <div>
          <select
            className="select my-2 w-full"
            value={currentStudent.student_id}
            onChange={(e) => {
              const selectedStudent = students.find(
                (student) => student.student_id === e.target.value,
              );

              setCurrentStudent(selectedStudent);
            }}
          >
            <option disabled>Choose Student</option>
            {students.map((student, idx) => (
              <option key={idx} value={student.student_id}>
                {student.name}
              </option>
            ))}
          </select>

          <label className="input my-2 w-full">
            Student ID
            <input
              type="text"
              className="grow"
              value={currentStudent.student_id}
              // onChange={(e) => setStudentId(e.target.value)}
              disabled
            />
          </label>
          <label className="input my-2 w-full">
            Class
            <input
              type="text"
              className="grow"
              value={`Class ${currentStudent.class} | Year ${currentStudent.grade}`}
              // onChange={(e) => setClassInfo(e.target.value)}
              disabled
            />
          </label>
          <br />
          <label className="input my-2 w-full">
            Score
            <input
              type="number"
              className="grow"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
            />
          </label>

          <select
            className="select my-2 w-full"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option disabled={true}>Choose Subject</option>
            <option>Mathematics</option>
            <option>English</option>
            <option>Science</option>
            <option>History</option>
            <option>Geography</option>
            <option>Art</option>
            <option>Music</option>
            <option>Sports</option>
          </select>

          <div className="grid grid-cols-2 w-full gap-x-2">
            {/* semester Year*/}
            <select
              className="select my-2 col-span-1"
              value={semesterYear}
              onChange={(e) => setSemesterYear(e.target.value)}
            >
              <option disabled={true}>Choose Semeser Year</option>
              {yearList.map((year) => (
                <option key={year}>{year}</option>
              ))}
            </select>

            {/* semester season*/}
            <select
              className="select my-2 col-span-1"
              value={semesterSeason}
              onChange={(e) => setSemesterSeason(e.target.value)}
            >
              <option disabled={true}>Choose Semester Season</option>
              <option>Spring</option>
              <option>Fall</option>
            </select>
          </div>
        </div>

        {/* button */}
        <div>
          <button className="btn btn-primary my-4" onClick={onClick}>
            Upload Score
          </button>
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentByStudentId } from "../../services/apiStudent";
import { getScoreByScoreId, updateScore } from "../../services/apiScore";
import Loading from "../../ui/Loading";
import { toast } from "sonner";

export default function ScoreEdit() {
  const [score, setScore] = useState(80);
  const [subject, setSubject] = useState("mathmatics");

  const [semesterYear, setSemesterYear] = useState(new Date().getFullYear());
  const [semesterSeason, setSemesterSeason] = useState("Spring");
  const [isLoading, setIsLoading] = useState(true);

  const yearList = Array.from(
    { length: new Date().getFullYear() - 2000 + 1 },
    (_, idx) => 2000 + idx,
  );

  const params = useParams();
  const navigate = useNavigate();
  const [currentStudent, setCurrentStudent] = useState({
    name: "Someone",
    class: "x",
    grade: "x",
  });

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const scores = await getScoreByScoreId(params.id);
      const scoreData = scores[0];

      setScore(scoreData.score);
      setSubject(scoreData.subject);
      setSemesterSeason(scoreData.semesterSeason);
      setSemesterYear(scoreData.semesterYear);

      const students = await getStudentByStudentId(scoreData.student_id);
      const student = students[0];
      setCurrentStudent(student);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  async function onClick() {
    toast.loading("updating...");

    const newScore = {
      score,
      subject,
      semesterSeason,
      semesterYear,
    };

    const scores = await updateScore(params.id, newScore);
    console.log(scores);

    toast.dismiss();
    toast.success("updating successfuly");

    navigate("/home/score");
  }

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="w-1/3 mx-auto text-center shadow-2xl shadow-amber-300 rounded-box mt-40 p-10">
          <h1 className="text-center text-4xl pt-4">{currentStudent.name}</h1>
          <div>
            <label className="input my-2 w-full">
              Class
              <input
                type="text"
                className="grow"
                value={`Class ${currentStudent.class} | Year ${currentStudent.grade}`}
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
              Update Score
            </button>
          </div>
        </div>
      )}
    </>
  );
}

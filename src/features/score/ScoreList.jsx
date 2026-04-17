import { useState, useEffect } from "react";
import { getScoreList } from "../../services/apiScore";
import ScoreListItem from "./ScoreListItem";
import { getUserId } from "../../utils/userHelper";
import { getStudentList } from "../../services/apiStudent";

export default function ScoreList() {
  const [scoreList, setScoreList] = useState([]);
  const [students, setStudents] = useState([]);

  const filteredScoreList = scoreList.filter((scoreItem) => {
    return students
      .map((student) => student.student_id)
      .includes(scoreItem.student_id);
  });

  useEffect(() => {
    async function fetchData() {
      const userId = getUserId();

      const mockScoreList = await getScoreList();
      setScoreList(mockScoreList);

      const studentList = await getStudentList(userId);
      setStudents(studentList);
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-lg">
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Subject</th>
              <th>Semester</th>
              <th>Score</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredScoreList.map((scoreItem) => (
              <ScoreListItem
                key={scoreItem.id}
                scoreItem={scoreItem}
                currentStudent={students.find(
                  (student) => student.student_id === scoreItem.student_id,
                )}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

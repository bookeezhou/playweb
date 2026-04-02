import { useState, useEffect } from "react";
import { getScoreList } from "../../services/apiScore";
import ScoreListItem from "./ScoreListItem";

export default function ScoreList() {
  const [scoreList, setScoreList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const mockScoreList = await getScoreList();
      console.log(mockScoreList);
      setScoreList(mockScoreList);
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
            {scoreList.map((scoreItem) => (
              <ScoreListItem key={scoreItem.id} scoreItem={scoreItem} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

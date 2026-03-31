import { useEffect, useState } from "react";
import StudentListItem from "./StudentListItem";
import { getStudentList } from "../../services/apiStudent";

export default function StudentList() {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    const mockStudentList = getStudentList();
    // console.log(mockStudentList);
    setStudentList(mockStudentList);
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table table-lg">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Class</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((studentItem) => (
            <StudentListItem key={studentItem.id} studentItem={studentItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

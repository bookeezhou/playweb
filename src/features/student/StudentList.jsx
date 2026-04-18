import { useEffect, useState } from "react";
import StudentListItem from "./StudentListItem";
import { getStudentList } from "../../services/apiStudent";
import { getUserId } from "../../utils/userHelper";
import Loading from "../../ui/Loading";

export default function StudentList() {
  const [studentList, setStudentList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const userId = getUserId();

      const mockStudentList = await getStudentList(userId);
      // console.log(mockStudentList);
      setStudentList(mockStudentList);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
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
                <StudentListItem
                  key={studentItem.id}
                  studentItem={studentItem}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

import { useEffect, useState } from "react";
import StudentListItem from "./StudentListItem";
import {
  countStudents,
  getStudentListWithLimit,
} from "../../services/apiStudent";
import { getUserId } from "../../utils/userHelper";
import Loading from "../../ui/Loading";
import { useAtomValue } from "jotai";
import { studentSearchConditionAtom } from "../../atoms/search";
import Pagination from "../../ui/Pagination";
import { useSearchParams } from "react-router-dom";
import { getConfig } from "../../utils/configHelper";

export default function StudentList() {
  const [studentList, setStudentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const studentSearchCondition = useAtomValue(studentSearchConditionAtom);

  const filteredStudentList = studentList.filter((studentItem) => {
    if (!studentSearchCondition.length) {
      return studentList;
    }

    const studentInfoJSON = JSON.stringify([
      studentItem.name.toLowerCase(),
      studentItem.class,
      studentItem.gender,
      studentItem.grade,
    ]);

    for (const condition of studentSearchCondition) {
      if (!studentInfoJSON.includes(condition)) {
        return false;
      }
    }

    return true;
  });

  // for pagination
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
  const pageSize = getConfig("PAGE_SIZE");

  const [studentCount, setStudentCount] = useState(0);
  const pageCount = Math.ceil(studentCount / pageSize);

  useEffect(() => {
    async function fetchData() {
      const userId = getUserId();

      const studentCountData = await countStudents(userId);
      setStudentCount(studentCountData);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const userId = getUserId();

      const mockStudentList = await getStudentListWithLimit(
        userId,
        currentPage,
        pageSize,
      );
      // console.log(mockStudentList);
      setStudentList(mockStudentList);
      setIsLoading(false);
    }

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(searchParams.get("page") || 1);
  }, [searchParams.get("page")]);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
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
                {filteredStudentList.map((studentItem) => (
                  <StudentListItem
                    key={studentItem.id}
                    studentItem={studentItem}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <Pagination currentPage={currentPage} pageCount={pageCount} />
        </>
      )}
    </>
  );
}

import { useAtom, useAtomValue } from "jotai";
import { useLocation, useNavigate } from "react-router-dom";
import { isStudentAtom } from "../atoms/user";
import { useState } from "react";
import {
  scoreSearchConditionAtom,
  studentSearchConditionAtom,
} from "../atoms/search";
import { toast } from "sonner";
import Condition from "./Condition";

export default function Toolbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isStudent = useAtomValue(isStudentAtom);

  const [searchString, setSearchString] = useState("");

  function onClick() {
    const { pathname } = location;
    if (pathname === "/home/score") {
      navigate("/home/score/upload");
      return;
    }

    navigate("/home/student/create");
  }

  const isStudentList = location.pathname === "/home/student";
  const [studentSearchCondition, setStudentSearchCondition] = useAtom(
    studentSearchConditionAtom,
  );
  const [scoreSearchCondition, setScoreSearchCondition] = useAtom(
    scoreSearchConditionAtom,
  );

  function onSearch() {
    if (!searchString.length) {
      toast.dismiss();
      toast.warning("Please enter a search string");
      return;
    }

    if (isStudentList) {
      setStudentSearchCondition((prev) => [
        ...prev,
        searchString.toLowerCase(),
      ]);
    } else {
      setScoreSearchCondition((prev) => [...prev, searchString.toLowerCase()]);
    }

    setSearchString("");
  }

  function onDelete(idx) {
    if (isStudentList) {
      setStudentSearchCondition((prev) => prev.filter((_, i) => i !== idx));
    } else {
      setScoreSearchCondition((prev) => prev.filter((_, i) => i !== idx));
    }
  }

  return (
    <section className="grid grid-cols-4 items-center text-center mx-4 my-6 w-full gap-2">
      {/* condition */}
      <div className="col-span-1 flex gap-2 justify-center my-auto">
        {isStudentList
          ? studentSearchCondition.map((studentCondition, idx) => (
              <Condition onDelete={() => onDelete(idx)} key={idx}>
                {studentCondition}
              </Condition>
            ))
          : scoreSearchCondition.map((scoreCondition, idx) => (
              <Condition onDelete={() => onDelete(idx)} key={idx}>
                {scoreCondition}
              </Condition>
            ))}
      </div>

      {/* search bar */}
      <div className="col-span-2">
        <label className="input w-3/5">
          <input
            type="text"
            required
            placeholder="Search"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
          <svg
            className="h-[1em] opacity-50 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            onClick={onSearch}
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
        </label>
      </div>

      {/* Action button */}
      <div className="col-span-1">
        {!isStudent && (
          <button className="btn btn-primary" onClick={onClick}>
            {location.pathname === "/home/score"
              ? "Upload Score"
              : "Create Student"}
          </button>
        )}
      </div>
    </section>
  );
}

import { useState } from "react";

export default function StudentCreate() {
  const [name, setName] = useState("John Doe");

  const [classInfo, setClassInfo] = useState("Class 1 | Year 9");
  const [gender, setGender] = useState("Male");

  return (
    <>
      <div className="w-1/3 mx-auto text-center shadow-2xl shadow-amber-300 rounded-box mt-40 p-6">
        <div>
          <label className="input my-2 w-full">
            Name
            <input
              type="text"
              className="grow"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="input my-2 w-full">
            Class
            <input
              type="text"
              className="grow"
              value={classInfo}
              onChange={(e) => setClassInfo(e.target.value)}
            />
          </label>
          <br />

          <select
            defaultValue="Pick a color"
            className="select my-2 w-full"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option disabled={true}>Choose Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        {/* button */}
        <div>
          <button className="btn btn-primary my-4">Create Student</button>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";

export default function ScoreEdit() {
  const [score, setScore] = useState(80);
  const [subject, setSubject] = useState("mathmatics");

  const [semesterYear, setSemesterYear] = useState(new Date().getFullYear());
  const [semesterSeason, setSemesterSeason] = useState("Spring");

  const yearList = Array.from(
    { length: new Date().getFullYear() - 2000 + 1 },
    (_, idx) => 2000 + idx,
  );

  return (
    <>
      <div className="w-1/3 mx-auto text-center shadow-2xl shadow-amber-300 rounded-box mt-40 p-10">
        <label className="text-center text-4xl pt-4">Sunshine</label>
        <div>
          <label className="input my-2 w-full">
            Class
            <input
              type="text"
              className="grow"
              value="Class 1 | Year 6"
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
            defaultValue="Pick a color"
            className="select my-2 w-full"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option disabled={true}>Choose Subject</option>
            <option>Crimson</option>
            <option>Amber</option>
            <option>Velvet</option>
          </select>

          <div className="grid grid-cols-2 w-full gap-x-2">
            {/* semester Year*/}
            <select
              defaultValue="Pick a color"
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
              defaultValue="Pick a color"
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
          <button className="btn btn-primary my-4">Update Score</button>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";

export default function StudentEdit() {
  const [name, setName] = useState("Alex");
  const [gender, setGender] = useState("Male");

  return (
    <div className="w-1/3 mx-auto text-center shadow-2xl shadow-amber-300 rounded-box mt-10 px-20 py-4 ">
      <div className="avatar cursor-pointer">
        <div className="w-24 rounded-full">
          <label htmlFor="avatar-input">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </label>
        </div>
      </div>

      <div className="w-3/4 mx-auto">
        <label className="input input-bordered flex items-center gap-2 w-full my-4">
          Name
          <input
            type="text"
            className="grow"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <select
          className="select select-bordered w-full mb-4"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option disabled>Choose Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      <div className="text-center">
        <button className="btn btn-primary my-2">Update Profile</button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { uploadAvatar } from "../../services/apiStorage";
import { useAtom } from "jotai";
import { userAtom } from "../../atoms/user";
import { getTeacherByTeacherId } from "../../services/apiTeacher";
import { getUserId } from "../../utils/userHelper";
import { getConfig } from "../../utils/configHelper";
import { updateUser } from "../../services/apiAuth";

export default function Info() {
  const [user, setUser] = useAtom(userAtom);

  const [currentAvatarUrl, setCurrentAvatarUrl] = useState(user.avatar);

  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    setCurrentAvatarUrl(user.avatar);
  }, [user]);

  const [classInChargeArr, setClassInChargeArr] = useState([]);

  useEffect(() => {
    async function loadData() {
      const userId = getUserId();

      const teachers = await getTeacherByTeacherId(userId);
      const teacher = await teachers[0];

      setClassInChargeArr(JSON.parse(teacher.class_in_charge));
    }

    loadData();
  }, []);

  function handleCurrentAvatar(event) {
    const file = event.target.files[0];
    setAvatarFile(file);
    const newAvatarUrl = URL.createObjectURL(file);
    setCurrentAvatarUrl(newAvatarUrl);
  }

  async function onClick() {
    if (!avatarFile) {
      // waring toast
      console.log("unselect avatar");
      return;
    }

    // Build avatar filename
    const token = getConfig("SUPABASE_TOKEN");

    const userToken = JSON.parse(localStorage.getItem(token));
    const avatarFilename = `${userToken.user.email}-${Date.now()}.png`;

    // Upload avatar file
    await uploadAvatar(avatarFile, avatarFilename);

    // Update user metadata in supabase
    const supabaseUrl = getConfig("SUPABASE_URL");
    const newAvatarUrl = `${supabaseUrl}/storage/v1/object/public/avatar/public/${avatarFilename}`;
    const newUserMetadata = await updateUser({ avatar: newAvatarUrl });

    // Update user metadata in jotai
    setUser(newUserMetadata.user.user_metadata);
  }
  return (
    <>
      <div className="w-1/3 mx-auto text-center shadow-2xl shadow-amber-300 rounded-box mt-10 px-20 py-4 ">
        <div className="avatar cursor-pointer">
          <div className="w-24 rounded-full">
            <label htmlFor="avatar-input">
              <img src={currentAvatarUrl} />
            </label>
          </div>
        </div>

        <input
          id="avatar-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleCurrentAvatar}
        />
        <div>
          <label className="input validator my-4 w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <input type="email" placeholder="mail@site.com" disabled />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>
          <br />

          {classInChargeArr.length > 0 && (
            <ul className="w-full menu bg-base-200 rounded-box mx-auto  mb-3">
              <li>
                <details open>
                  <summary>Class in Charge</summary>
                  <ul>
                    {classInChargeArr.map((classItem, idx) => (
                      <li key={idx}>
                        <a className="pointer-events-none">
                          Class {classItem.split("|")[0]} | Year{" "}
                          {classItem.split("|")[1]}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            </ul>
          )}
        </div>
        {/* button */}

        <div>
          <button className="btn btn-primary my-4" onClick={onClick}>
            Update avatar
          </button>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function onClick() {
    const data = await login(email, password);

    if (data) {
      navigate("/");
      console.log("Login successfully");
      console.log(data);
    } else {
      console.log("Login failed");
    }
  }
  return (
    <>
      <div className="w-1/3 mx-auto text-center shadow-2xl shadow-amber-300 rounded-box mt-40">
        <label className="text-center text-4xl">Sunshine</label>
        <div>
          <label className="input validator my-4">
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
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              placeholder="mail@site.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>
          <br />
          {/* password */}
          <label className="input validator my-2">
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
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            At least one number <br />
            At least one lowercase letter <br />
            At least one uppercase letter
          </p>
        </div>

        {/* button */}
        <div className="mt-4 ">
          <label className="label mx-1">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-primary"
            />
            Remember me
          </label>
          <button className="btn btn-link mx-1">Forgotten password?</button>
        </div>
        <div>
          <button className="btn btn-primary mx-4 my-4" onClick={onClick}>
            Login
          </button>
          <button className="btn btn-secondary mx-4 my-4">Signup</button>
        </div>
      </div>
    </>
  );
}

import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../ui/ErrorMessage";

export default function Login() {
  const navigate = useNavigate();

  const validationSchema = yup
    .object({
      email: yup.string().required().email(),
      password: yup.string().required().min(6),
    })
    .required();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  async function onSubmit({ email, password }) {
    const data = await login(email, password);

    console.log("Login", data);
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
      <form
        className="w-1/3 mx-auto text-center shadow-2xl shadow-amber-300 rounded-box mt-40"
        onSubmit={handleSubmit(onSubmit)}
      >
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
              {...register("email")}
            />
            {errors.email && (
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            )}
          </label>
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
              {...register("password")}
            />
            {errors.password && (
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            )}
          </label>
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
          <button className="btn btn-primary mx-4 my-4">Login</button>
          <button
            className="btn btn-secondary mx-4 my-4"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        </div>
      </form>
    </>
  );
}

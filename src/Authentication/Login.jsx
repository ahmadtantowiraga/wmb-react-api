import PropTypes from "prop-types";
import * as z from "zod";
import AuthService from "../service/AuthService";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const schema = z.object({
  username: z.string().min(1, "Username tidak boleh kosong"),
  password: z
    .string()
    .min(8, "Password setidaknya harus lebih dari 8 karakter"),
});

function Login() {
  const authService = useMemo(() => AuthService(), []);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data);
      if (response && response.statusCode === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const checkToken = async () => {
        const isValidToken = await authService.validateToken();
        if (isValidToken) {
          navigate("/");
        }
      };
      checkToken();
    }
  }, [authService, navigate]);

  return (
    <>
      <div id="form-login">
        <div className="container-fluid">
          <div className="container">
            <div className="row justify-content-center align-items-center ">
              <div className="card w-50 shadow border">
                <img
                  src="./public/login.png"
                  className="card-img-top w-50 m-auto"
                  alt="..."
                />
                <div className="card-body">
                  <div className="login text-center">
                    <h2>Login</h2>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        username
                      </label>
                      <input
                        {...register("username")}
                        name="username"
                        type="username"
                        className={`form-control border-0 border-bottom shadow-none ${
                          errors.username && "is-invalid"
                        }`}
                        id="username"
                        aria-describedby="emailHelp"
                      />
                      {errors.username && (
                        <div className="invalid-feedback">
                          {errors.username.message}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Password
                      </label>
                      <input
                        {...register("password")}
                        name="password"
                        type="password"
                        id="password"
                        className={`form-control border-0 border-bottom shadow-none ${
                          errors.password && "is-invalid"
                        }`}
                      />
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password.message}
                        </div>
                      )}
                    </div>

                    <div className="container text-center">
                      <button disabled={!isValid} type="submit" className="btn btn-primary w-75">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
Login.propTypes = {
  handleAuthentication: PropTypes.func,
};

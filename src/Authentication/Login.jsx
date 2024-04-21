import PropTypes from "prop-types";
import * as z from "zod";

const schema = z.object({
    username: z.string().min(1, "Username tidak boleh kosong"),
    password: z
      .string()
      .min(8, "Password setidaknya harus lebih dari 8 karakter"),
  });

function Login(){

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
                    <form className="form">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          username
                        </label>
                        <input
                          name="username"
                          type="username"
                          className={`form-control border-0 border-bottom shadow-none ${
                            false && "is-invalid"
                          }`}
                          id="username"
                          aria-describedby="emailHelp"
                        />
                        <div className="invalid-feedback">
                         
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Password
                        </label>
                        <input
                
                          name="password"
                          type="password"
                          id="password"
                          className={`form-control border-0 border-bottom shadow-none ${
                            false && "is-invalid"
                          }`}
                        />
                        <div className="invalid-feedback">
                    
                        </div>
                      </div>

                      <div className="container text-center">
                        <button
                          type="submit"
                          className="btn btn-primary w-75"
                        >
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

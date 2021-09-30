import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { accountService, alertService } from "@/_api_services";

function Register({ history }) {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    bvnNin: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    bvnNin: Yup.string().required("BVN/NIN is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "Accept Terms & Conditions is required"
    ),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    accountService
      .register(fields)
      .then(() => {
        alertService.success(
          "Registration successful, please check your email for verification instructions",
          { keepAfterRouteChange: true }
        );
        history.push("login");
      })
      .catch((error) => {
        setSubmitting(false);
        alertService.error(error);
      });
  }

  return (
    <div className="container register-card">
      <div className="row login mt-3 d-flex pt-5 justify-content-between">
        <div  class="col-6">
            <div className="text-blue font-weight-bold">
                <p className="logo">LOGO</p>
            </div>
            <h3 className="text-gray font-weight-bold">It's your first time here?</h3>
            <h3 className="text-blue font-weight-bold">Let's get you started</h3>
        </div>
        <div className="col login-card bg-white round-img">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="card-body">
                  <h6 className="text-blue pb-3 you-rock font-weight-bold form-group">You Rule!</h6>
                  <div>
                  <div className="form-group">
                      <Field
                        name="phoneNumber"
                        type="number"
                        placeholder="Phone Number"
                        id="register-num"
                        className={
                          "form-control" +
                          (errors.phoneNumber && touched.phoneNumber ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        id="register-first"
                        className={
                          "form-control" +
                          (errors.firstName && touched.firstName ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        id="register-last"
                        className={
                          "form-control" +
                          (errors.lastName && touched.lastName ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <Field
                      name="email"
                      type="text"
                      placeholder="Enter Email"
                      id="register-email"
                      className={
                        "form-control" +
                        (errors.email && touched.email ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  {/* <div className="form-group">
                    <Field
                      name="bvnNin"
                      type="text"
                      placeholder="BVN/NIN"
                      className={
                        "form-control" +
                        (errors.bvnNin && touched.bvnNin ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="bvnNin"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div> */}
                  <div>
                    <div className="form-group">
                      <Field
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        id="register-password"
                        className={
                          "form-control" +
                          (errors.password && touched.password ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        id="register-confirm"
                        className={
                          "form-control" +
                          (errors.confirmPassword && touched.confirmPassword
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="form-group form-check">
                    <Field
                      type="checkbox"
                      name="acceptTerms"
                      id="acceptTerms"
                      className={
                        "form-check-input " +
                        (errors.acceptTerms && touched.acceptTerms
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <label htmlFor="acceptTerms" className="text-blue form-check-label">
                      I accept the Terms & Conditions
                    </label>
                    <ErrorMessage
                      name="acceptTerms"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-row px-1 py-1 d-flex justify-content-between">
                      <h6 className="text-gray link align-self-center my-auto">Already have an account?
                          <span><Link to="login" className="text-blue" > Sign in</Link></span>
                      </h6>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="register-btn float-right btn btn-primary"
                      >
                        {isSubmitting && (
                          <span className="spinner-border spinner-border-sm mr-1"></span>
                        )}
                        NEXT
                      </button>                  
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <footer className="row pl-3">
          <span>
              <Link to="register" className="text-gray" > Privacy . </Link>
              <Link to="register" className="text-gray"> Terms</Link>
          </span>
      </footer>
    </div>
    
  );
}

export { Register };

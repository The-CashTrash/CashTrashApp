import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '@/_api_services';

function Login({ history, location }) {
    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    function onSubmit({ email, password }, { setSubmitting }) {
        alertService.clear();
        accountService.login(email, password)
            .then(() => {
                const { from } = location.state || { from: { pathname: "/" } };
                history.push(from);
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
        <div className=" login container-fluid py-3">
            <div class="row mt-4 pt-4 m-4">
                <div  class="col-7 welcome">
                    {/* <h2 className="font-weight-bold text-gray">CashTrash</h2> */}
                    <h3 className="text-gray pt-4 font-weight-bold">Welcome Back!</h3>
                    <h3 className="text-blue font-weight-bold">Login to your dashboard</h3>
                    <img src="https://images.unsplash.com/photo-1545303234-a34381f8b5cf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=746&q=80" alt="trash full of cash" className="login-image" />
                </div>
                <div class="col-5 mt-4 pt-4 bg-white round">
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {({ errors, touched, isSubmitting }) => (
                        <Form>
                            <div className="card-body my-4">
                                <h4 className="text-blue form-group font-weight-bold">Login</h4>                 
                                <div>
                                    <div className="form-group">
                                        <Field name="email" type="text" placeholder="Your Email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    </div>

                                    <div className="form-group">
                                        <Field name="password" type="password" placeholder="Your Password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col">
                                            <p className="text-blue">Don't have an account?
                                            <span><Link to="register" > Register</Link></span>
                                            </p>
                                        </div>
                                        <div className="form-group col text-right">
                                            <Link to="forgot-password">Forgot Password?</Link>
                                        </div>
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className="btn btn-primary float-right mb-4">
                                        {isSubmitting && <span className="spinner-border spinner-border-sm"></span>}
                                        SIGN IN
                                    </button>
                                </div>
                            </div>                     
                        </Form>
                        )}
                    </Formik>
                </div>
                <footer className="p-3 text-gray">Privacy / Terms</footer>
            </div>
        </div>
    )
}

export { Login }; 
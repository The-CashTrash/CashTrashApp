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
        <div className=" login container py-3">
            <div class="row mt-4 pt-4 m-4">
                <div  class="col-5 md-col-6 welcome d-none d-md-block">
                        <h2 className="text-blue pt-4 pb-4 my-auto font-weight-bold">Welcome Back!</h2>
                </div>
                <div class="col pt-4 bg-white round-img d-flex align-items-start">
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {({ errors, touched, isSubmitting }) => (
                        <Form className="login">
                            <div className="card-body my-4">
                                <h3 className="text-blue form-group">Sign into your account</h3>                 
                                <div>
                                    <div className="form-group form-input">
                                        <Field name="email" type="text" placeholder="Your Email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    </div>

                                    <div className="form-group round-form">
                                        <Field name="password" type="password" placeholder="Your Password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" disabled={isSubmitting} className="login-btn btn btn-primary mb-4">
                                            {isSubmitting && <span className="spinner-border spinner-border-sm"></span>}
                                            Login
                                        </button>
                                    </div>
                                        <Link to="forgot-password" className="text-gray">Forgot Password?</Link>
                                    <div className="form-row">
                                        <div className="form-group col">
                                            <p className="text-blue">Don't have an account?
                                            <span><Link to="register"className="text-gray" > Register</Link></span>
                                            </p>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                <span>
                                    <Link to="register" className="text-gray" > Privacy . </Link>
                                    <Link to="register" className="text-gray"> Terms</Link>
                                </span>
                            </div> 
                        </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export { Login }; 
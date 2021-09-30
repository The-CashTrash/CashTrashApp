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
        <div className="container-fluid mx-3 px-5">
            <div class="row login mt-3 d-flex pt-5 justify-content-between">
                <div class="col-6 pl-5 ml-3 d-none d-md-block">
                    <div className="text-blue d-flex align-items-center font-weight-bold">
                        <p className="logo">LOGO</p>
                    </div>
                    <h3 className="text-gray font-weight-bold">Welcome Back!</h3>
                    <h3 className="text-blue font-weight-bold">Login to your dashboard</h3>
                </div>
                <div className="col-12 d-block d-md-none">
                    <h3 className="text-gray font-weight-bold">Welcome Back!</h3>
                    <h3 className="text-blue font-weight-bold">Login to your dashboard</h3>
                </div>
                <div class="col mx-4 login-card bg-white round-img">
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {({ errors, touched, isSubmitting }) => (
                        <Form className="">
                            <div className="card-body">
                                <h6 className="text-blue you-rock font-weight-bold form-group">You Rock!</h6>
                                <div>
                                    <div className="form-group form-input">
                                        <Field name="email" type="text" placeholder="Enter Email" id="login-email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                        <ErrorMessage name="email" component="div"  className="link invalid-feedback" />
                                    </div>

                                    <div className="form-group">
                                        <Field name="password" type="password" placeholder="Your Password" id="login-password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />                                        
                                        <ErrorMessage name="password" component="div" className="link invalid-feedback" />
                                    </div>
                                    <div className="form-row pt-2 px-1 d-flex justify-content-between">
                                        <h6 className="text-gray link">Don't have an account?
                                            <span><Link to="register"className="text-blue font-weight-bold" > Sign up</Link></span>
                                        </h6>
                                        <Link to="forgot-password" className="text-gray link ">Forgot Password?</Link>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" disabled={isSubmitting} className="login-btn float-right btn btn-primary">
                                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                            SIGN IN
                                        </button>
                                    </div>                                    
                                </div>
                            </div> 
                        </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <footer className="row pl-4 ml-4">
                <span>
                    <Link to="register" className="text-gray" >Privacy . </Link>
                    <Link to="register" className="text-gray"> Terms</Link>
                </span>
            </footer>
        </div>
    )
}

export { Login }; 
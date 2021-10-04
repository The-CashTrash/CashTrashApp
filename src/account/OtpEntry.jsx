import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function OtpEntry() {
    
    return (
        <div className="container-fluid mx-3 px-5">
            <div className="row login mt-3 pt-5 d-flex justify-content-between">
                <div class="col-6 pl-5 ml-3 d-none d-md-block">
                    <div className="text-blue d-flex align-items-center font-weight-bold">
                        <img src="src/images/Logo big.svg" alt="" className="logo" />
                    </div>
                    <h3 className="text-gray font-weight-bold">We sent you a code</h3>
                    <h3 className="text-blue font-weight-bold">Check your email for an OTP</h3>
                </div>
                <div className="col-12 d-block d-md-none pb-2">
                    <h3 className="text-gray font-weight-bold">We sent you a code</h3>
                    <h3 className="text-blue font-weight-bold">Check your email for an OTP</h3>
                </div>
                <div className="col mx-4 d-flex align-items-center">
                    <div className="col forgot-card bg-white round-img">
                        {/* <Formik>
                            {({}) => (
                                <Form className="">
                                    <div className="card-body">
                                        <h6 className="text-blue you-rock font-weight-bold form-group">Almost there</h6>
                                        <div className="form-group">
                                            <Field name="otp" type="number" id="otp-field" placeholder="Enter OTP" />
                                        </div>
                                        <div>
                                            <Link to="login" className="">
                                                <button className="login-btn float-right btn btn-primary">
                                                    PROCEED
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>  */}
                    </div>
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

export { OtpEntry }
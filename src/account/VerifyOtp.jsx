import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import queryString from "query-string";

// import { accountService, alertService } from "@/_api_services";

function VerifyOtp() {
    return (
        <div className=" container-fluid d-flex justify-content-center align-items-center text-aligncenter otp">
            <div className="otp-verify">
                <h1 className="text-white pb-2">Congratulations Sarah</h1>
                <h5 className="otp-text">You have successfully signed up for CashTrash.</h5>
                <h5 className="otp-text">An OTP has been sent to your email</h5>
                <br />
                <div>
                    <Link to="otp-entry" className="">
                        <button className="btn verify-btn btn-primary">
                            PROCEED
                        </button>
                    </Link>
                </div>
                <br />
                <div>
                    <Link to="/" className="text-white">
                        <button className="btn otp-btn btn-primary">
                            Resend OTP
                        </button>
                    </Link>
                </div>
            </div>
        </div>
      );
    }
    
export { VerifyOtp };

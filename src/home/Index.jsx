import React from 'react';

// import { accountService } from '@/_api_services';

function Home() {
    
    return (
        <div className="container-fluid home">
            <div className="dashboard">
                <div className="row px-1">
                    <div className="col-8">
                        <h4 className="font-weight-bold dash">Dashboard</h4>
                    </div>
                    <div className="col-4">
                        <div className="float-right">
                            <img src="" alt="" />
                            <img src="" alt="" />
                        </div>
                    </div>
                </div>
                <div className="row px-1">
                    <div className="col-7 d-none d-md-block dash-overview">
                        <div className="fixed mb-5">
                            <h5 className="font-weight-bold dash-sections">Overview</h5>
                            <div className="row d-flex justify-content-between">
                                <div className="col-6 round-img overview-points total mx-3">
                                    <div className="pt-5">
                                        <h3 className="d-flex justify-content-center">12,000</h3>
                                        <h6 className="d-flex point-bal justify-content-center">Total Point</h6>
                                    </div>
                                </div>
                                <div className="col-6 round-img overview-bal total mx-3">
                                    <div className="pt-5">
                                        <h3 className="d-flex justify-content-center">N20,000</h3>
                                        <h6 className="d-flex point-bal justify-content-center">Total Balance</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row my-5">
                            <div className="col-6">
                                <h5 className="font-weight-bold dash-sections">Quick Links</h5>
                                <div className="row">
                                    <div className="col-4">
                                        <div className="ql-icon">
                                            <img src="/src/images/Send(arrow).png" alt="" className="pt-2"/>
                                        </div>
                                        <h6>Transfer</h6>
                                    </div>
                                    <div className="col-4">
                                        <div className="ql-icon">
                                            <img src="/src/images/Layer 2.svg" alt="" className=" pt-3" />
                                        </div>
                                        <h6>Airtime</h6>
                                    </div>
                                    <div className="col-4">
                                        <div className="ql-icon">
                                            <img src="/src/images/Send(arrow).png" alt="" className=" pt-2" />
                                        </div>
                                        <h6>Data</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <h5 className="font-weight-bold dash-sections">Free Transfer</h5>
                                <div className="row">
                                    <div className="col-4">
                                        <img src="" alt="" />
                                        Gabriel
                                    </div>
                                    <div className="col-4">
                                        <img src="" alt="" />
                                        Anita
                                    </div>
                                    <div className="col-4">
                                        <img src="" alt="" />
                                        Caleb
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-5">
                            <h5 className="font-weight-bold dash-sections">Get the most out of your money</h5>
                            <div>
                                <div className="d-flex">
                                    <img src="" alt="" />
                                    <h5>Convert Point</h5>
                                </div>
                            </div>
                        </div>
                        <div className="my-5">
                            <h5 className="font-weight-bold dash-sections">Refer and earn</h5>
                            <img src="" alt="megaphone" />
                        </div>
                    </div>
                    <div className="col-12 dash-overview d-block d-md-none">
                        <div className="fixed mb-3">
                            <h5>Overview</h5>
                            <div className="row d-flex justify-content-around">
                                <div className="col-6 round-img  total m-3">
                                    <div className="overview">
                                        <h4 className="d-flex justify-content-center">12,000</h4>
                                        <h6 className="d-flex justify-content-center">Total Points</h6>
                                    </div>
                                </div>
                                <div className="col-6 round-img total m-3">
                                    <div className="">
                                        <h4 className="d-flex justify-content-center">20,000</h4>
                                        <h6 className="d-flex justify-content-center">Total Balance</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-5">
                            <div className="">
                                <h5>Quick Links</h5>
                                <div className="row">
                                    <div className="col-4">
                                        <img src="" alt="" />
                                        Transfer
                                    </div>
                                    <div className="col-4">
                                        <img src="" alt="" />
                                        Airtime
                                    </div>
                                    <div className="col-4">
                                        <img src="" alt="" />
                                        Data
                                    </div>
                                </div>
                            </div>
                            <div className="my-5">
                                <h5>Free Transfer</h5>
                                <div className="row">
                                    <div className="col-4">
                                        <img src="" alt="" />
                                        Gabriel
                                    </div>
                                    <div className="col-4">
                                        <img src="" alt="" />
                                        Anita
                                    </div>
                                    <div className="col-4">
                                        <img src="" alt="" />
                                        Caleb
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-5">
                            <h5>Get the most out of your money</h5>
                            <div>
                                <div className="d-flex">
                                    <img src="" alt="" />
                                    <h5>Convert Point</h5>
                                </div>
                            </div>
                        </div>
                        <div className="my-5">
                            <h5>Refer and earn</h5>
                            <img src="" alt="megaphone" />
                        </div>
                    </div>
                    <div className="col-5 d-none d-md-block">
                        <h6>Transaction history</h6>
                    </div>
                    <div className="col-12 pt-4 d-block d-md-none">
                        <h6>Transaction history</h6>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export { Home };
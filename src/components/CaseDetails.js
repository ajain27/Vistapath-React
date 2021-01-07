import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "../styles/caseDetails.css"
import { Link } from 'react-router-dom'

function CaseDetails({ match }) {

    const caseByIdUrl = `/cases/${match.params.id}`;
    const [caseDetails, setCaseDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            const data = await axios.get(caseByIdUrl).then(res => {
                const details = res.data;
                return details;
            })
            setCaseDetails(data);
        };
        fetchDetails();
    }, [match.params.id, caseByIdUrl])


    function handleApproveCase() {
        setApproveStatus(caseDetails);
    }

    const setApproveStatus = async (caseDetails) => {
        await fetch(caseByIdUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...caseDetails, status: 'Approved' })
        })
    }

    return (
        <div className="wrapper">
            <div className="card individual-card">
                {
                    caseDetails ?
                        <div className="row m-3 row-item">
                            <div className="col-sm-4 mt-3 mb-3">
                                <img src={caseDetails.image} style={{ height: "200px" }} alt="upload" />
                                <div className="form-row m-auto">
                                    <label className="col-sm-4 col-form-label text-right p-0 pt-2" htmlFor="name">Case Id:</label>
                                    <span className="col-sm-2"></span>
                                    <label className="col-sm-6 p-0 pt-2 text-left">{caseDetails.id}</label>
                                </div>
                            </div>
                            <div className="col-sm-8 mt-3 mb-3 text-left case-detail">
                                <h4>{caseDetails.name}</h4>
                                <div className="summary">
                                    <p>{caseDetails.notes}</p>
                                    <p><strong>Image Notes:</strong>{caseDetails.imageNotes}</p>
                                    <span className="badge badge-success statusBadge">{caseDetails.status}</span>
                                </div>
                            </div>
                            {
                                !caseDetails.status ?
                                    <div className='col-sm-12 d-flex p-0'>
                                        <button className='btn btn-outline-danger ml-auto actionBtn float-right mr-2' type='button'>Reject</button>
                                        <button className='btn btn-outline-success actionBtn float-right' type='button' name="approve" onClick={handleApproveCase}>Approve</button>
                                    </div> : <Link type="button" className="btn btn-link ml-auto goBackLink" to={'/'}>Go back</Link>
                            }
                        </div> : ''
                }
            </div>
        </div>
    )
}

export default CaseDetails

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/home.css'
import AddCase from './AddCase';
import { Link } from 'react-router-dom'

function Home() {
    const [caseList, setCaseList] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const url = '/cases';
    useEffect(() => {
        fetchCases();
    }, [])

    const fetchCases = () => {
        axios.get(url).then((res) => {
            setLoading(true);
            setCaseList(res.data);
            setLoading(false);
        })
            .catch(error => {
                setLoading(false);
                setCaseList([]);
                setError('Something went wrong, cannot fetch the date');
            })
    }

    return (

        <div className="container-fluid">
            <AddCase></AddCase>
            <div className="wrapper">
                <div className="card individual-card">
                    <ul className="case-detail-ul">
                        {
                            isLoading ? 'Loading ... ' :
                                caseList?.map(cases =>
                                    <li className="case" key={cases.id}>
                                        <div className="row m-3 row-item">
                                            <div className="col-sm-4 mt-3 mb-3">
                                                <img src={cases.image} style={{ height: "200px" }} />
                                                <div className="form-row m-auto">
                                                    <label className="col-sm-4 col-form-label text-right p-0 pt-2" htmlFor="name">Case Id:</label>
                                                    <span className="col-sm-2"></span>
                                                    <label className="col-sm-6 p-0 pt-2 text-left">{cases.id}</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-8 mt-3 mb-3 text-left case-detail">
                                                <div class="d-flex">
                                                    <h4>{cases.name}</h4>
                                                    <span className="badge badge-success statusBadge">{cases.status}</span>
                                                </div>

                                                <div className="summary">
                                                    <p>{cases.notes}</p>
                                                    <p><strong>Image Notes:</strong> {cases.imageNotes}</p>
                                                </div>
                                            </div>
                                            <div className='col-sm-12 d-flex p-0'>
                                                <Link className='btn btn-outline-secondary ml-auto showDetailsBtn float-right' type='submit' to={`/cases/${cases.id}`}>Show Details</Link>
                                            </div>
                                        </div>
                                    </li>
                                )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home

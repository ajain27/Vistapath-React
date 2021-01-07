import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import '../styles/home.css'
import AddCase from './AddCase';
import { Link } from 'react-router-dom';
import { ClipLoader } from "react-spinners";

function Home() {
    const [caseList, setCaseList] = useState(null);
    const [showLoader, setShowLoader] = useState(true);
    const inputEl = useRef(null);

    const url = '/cases';
    useEffect(() => {
        setTimeout(() => {
            fetchCases();
        }, 1000)
    }, [])

    const fetchCases = () => {
        axios.get(url).then((res) => {
            setShowLoader(true);
            setCaseList(res.data);
            setShowLoader(false);
        })
            .catch(error => {
                setShowLoader(false);
                setCaseList([]);
                console.log(error);
            })
    }
    function handleSearch() {
        const query = inputEl.current.value;
        return query;
    }

    const handleSearchClick = (searchTerm) => {
        searchTerm = handleSearch();
        axios.get(`cases/?q=${searchTerm}`).then(res => {
            setCaseList(res.data);
        });
    }

    return (
        <div className="container-fluid">
            <AddCase></AddCase>
            <div className="md-form active-pink active-pink-2 mb-3 mt-0">
                <input className="form-control m-auto search" ref={inputEl} type="text" placeholder="Search a case" onChange={handleSearch} aria-label="Search" />
                <button type="button" className='btn btn-outline-secondary ml-auto showDetailsBtn float-right' onClick={handleSearchClick}>Search</button>
            </div>
            <div className="wrapper">
                <div className="card individual-card">
                    <ul className="case-detail-ul">
                        {
                            showLoader ? <ClipLoader size={100} color="#dc5b28" className="mt-2" /> :
                                caseList && caseList?.map(cases =>
                                    <li className="case" key={cases.id}>
                                        <div className="row m-3 row-item">
                                            <div className="col-sm-4 mt-3 mb-3">
                                                <img src={cases.image} style={{ height: "200px" }} alt="home-image"/>
                                                <div className="form-row m-auto">
                                                    <label className="col-sm-4 col-form-label text-right p-0 pt-2" htmlFor="name">Case Id:</label>
                                                    <span className="col-sm-1"></span>
                                                    <label className="col-sm-7 p-0 pt-2 text-left">{cases.id}</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-8 mt-3 mb-3 text-left case-detail">
                                                <div className="d-flex">
                                                    <h4>{cases.name}</h4>
                                                    <span className="badge badge-success statusBadge">{cases.status}</span>
                                                </div>
                                                <div className="summary">
                                                    <p>{cases.notes}</p>
                                                    <p><strong>Image Notes:</strong>{cases.imageNotes}</p>
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

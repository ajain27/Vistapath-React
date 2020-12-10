import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/home.css'

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
            <div className="wrapper">
                <div className="card individual-card">
                    <ul className="case-detail-ul">
                        {
                            isLoading ? 'Loading ... ' :
                            caseList?.map(cases =>
                                <li className="case" key={cases.id}>
                                    <div className="row m-3 row-item">
                                        <div className="col-sm-4 mt-3 mb-3">
                                            <img src="https://picsum.photos/200" alt="" style={{ height: "275px" }} />
                                        </div>
                                        <div className="col-sm-8 mt-3 mb-3 text-left case-detail">
                                            <h4>{cases.name}</h4>
                                            <div className="summary">
                                                <p>{cases.notes}</p>
                                            </div>
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

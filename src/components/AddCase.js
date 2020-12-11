import React, { useState } from 'react';
import Modal from 'react-modal'
import '../styles/addCase.css';
import { storage } from '../firebase'
import ProgressBar from 'react-bootstrap/ProgressBar'

Modal.setAppElement('#root');
function AddCase() {

    const [isModalOpen, setisModalOpen] = useState(false);
    // const [cases, setCases] = useState(null);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [image, setImage] = useState(null);
    const [form, setForm] = useState({ name: '', notes: '', image: '', imageNotes: '' });

    const url = '/cases';

    // const fetchCases = async () => {
    //     const res = await fetch(url);
    //     const data = await res.json();
    //     setCases(data);
    // }

    const validate = () => {
        let err = {}
        if (!form.name) {
            err.name = "Case name is required"
        }
        if (!form.notes) {
            err.notes = "Case notes is required"
        }
        if (!form.image) {
            err.notes = "Image is required"
        }
        if (!form.imageNotes) {
            err.imageNotes = "Image notes is required"
        }

        return err;
    }

    const showError = (errorObj) => {
        let errorMsg = '';
        for (let err in errorObj) {
            errorMsg += `${errorObj[err]} \n `
        }
        alert(`${errorMsg}`)
    }

    function handleChange(e) {
        console.log('Form Data --', e.target.value);
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function handleImageUploadChange(e) {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    function handleUploadImage() {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setUploadPercentage(progress);
                setIsUploading(true);
            },
            error => {
                console.log(error)
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setForm({
                            ...form,
                            image: url
                        })
                    })
            }
        )
    }

    const handleCloseModal = () => {
        setisModalOpen(false);
        reloadPage();
    }

    const reloadPage = () => {
        window.location.reload();
    }

    const postFormData = async (data) => {
        await fetch(url, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(data.form)
        })
        handleCloseModal();
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            await postFormData({ form });
            setForm({ name: '', notes: '', image: '', imageNotes: '' });
        } else {
            showError(errors)
        }
    }

    return (
        <div className='container-fluid'>
            <button className='btn btn-warning add-case m-0 p-0' onClick={() => setisModalOpen(true)}>ADD CASE</button>
            <Modal isOpen={isModalOpen}>
                <h2 className='text-center addCaseHeading'>Add a new case</h2>
                {
                    isUploading ?
                        <div className="row-flex d-flex full-width">
                            <ProgressBar className="full-width progress-custom" striped variant="custom" now={uploadPercentage} label={`${uploadPercentage}%`} />
                        </div> : ''
                }

                <form className='form-group row' style={{ margin: 'auto' }} onSubmit={handleOnSubmit}>
                    <label htmlFor='casename' className='col-sm-4 col-form-label text-right'>Case Name</label>
                    <div className='col-sm-8 mb-2'>
                        <input
                            type='text'
                            className='form-control'
                            name='name'
                            placeholder='Case name'
                            id='casename'
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>
                    <label htmlFor='casenotes' className='col-sm-4 col-form-label text-right'>Case Notes</label>
                    <div className='col-sm-8 mb-2'>
                        <textarea
                            rows='3'
                            className='form-control'
                            name='notes'
                            id="casenotes"
                            placeholder='Case notes'
                            value={form.notes}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <label htmlFor='uploadImage' className='col-sm-4 col-form-label text-right'>Image</label>
                    <div className='col-sm-8 mb-2 d-flex'>
                        <input
                            type='file'
                            name="image"
                            style={{ width: "80%" }}
                            className="btn btn-outline-secondary mr-2"
                            onChange={handleImageUploadChange} />
                        <button type="button" className="btn btn-outline-secondary submitButton" onClick={handleUploadImage}>Upload</button>

                    </div>
                    <label htmlFor='caseimagenotes' className='col-sm-4 col-form-label text-right'>Image Notes</label>
                    <div className='col-sm-8 mb-2'>
                        <textarea
                            rows='3'
                            className='form-control'
                            name='imageNotes'
                            id='caseimagenotes'
                            placeholder='Image notes'
                            value={form.imageNotes}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className='row' style={{ width: '100%' }}>
                        <div className='col-sm-12 d-flex p-0'>
                            <button className='btn btn-outline-secondary float-right ml-auto mr-2' onClick={() => setisModalOpen(false)}>Close</button>
                            <button disabled={!form} className='btn btn-outline-secondary submitButton float-right' type='submit'>Submit</button>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default AddCase

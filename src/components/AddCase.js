import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'
import '../styles/addCase.css'
import { v4 as uuidv4 } from 'uuid';

Modal.setAppElement('#root');
function AddCase() {

    const [isModalOpen, setisModalOpen] = useState(false);
    const [cases, setCases] = useState(null);
    const [form, setForm] = useState({ name: '', notes: '', imageNotes: ''});

    const url = '/cases';
    useEffect(()=> {
        fetchCases();
    }, [])

    const fetchCases = async() => {
        const res = await fetch(url);
        const data = await res.json();
        console.log('fetch cases --', data);
        setCases(data);
    }

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleCloseModal = () => {
        setisModalOpen(false);
    }

    const postFormData = async(data) => {
        await fetch(url, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, 
            body: JSON.stringify(data.form)            
        })
        console.log('post form data --', data.form);
        handleCloseModal();
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        await postFormData({form});
        console.log('form value on handle change --', form);
        setForm( { name: '', notes: '', imageNotes: ''} );
        fetchCases();
    }


    return (
        <div className='container-fluid'>
            <button className='btn btn-warning add-case m-0 p-0' onClick={() => setisModalOpen(true)}>Add Case</button>
            <Modal isOpen={isModalOpen}>
                <h2 className='text-center addCaseHeading'>Add a new case</h2>
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
                    <div className='col-sm-8 mb-2'>
                        <div className='input-group'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text' id='uploadFile'>Upload</span>
                            </div>
                            <div className='custom-file'>
                                <input
                                    type='file'
                                    className='custom-file-input'
                                    id='uploadImage'
                                    name='image'
                                    value={form.image}
                                    // onChange={handleChange}
                                    aria-describedby='uploadFile' />
                                <label className='custom-file-label' htmlFor='uploadImage'>Choose image</label>
                            </div>
                        </div>
                    </div>
                    <label htmlFor='caseimagenotes' className='col-sm-4 col-form-label text-right'>Image Notes</label>
                    <div className='col-sm-8 mb-2'>
                        <textarea
                            rows='3'
                            className='form-control'
                            name='imageNotes'
                            id='caseimagenotes'
                            placeholder='Image notes'
                            value = {form.imageNotes}
                            onChange={handleChange}
                            ></textarea>
                    </div>
                    <div className='row' style={{ width: '100%' }}>
                        <div className='col-sm-12 d-flex p-0'>
                            <button className='btn btn-outline-secondary float-right ml-auto mr-2' onClick={() => setisModalOpen(false)}>Close</button>
                            <button className='btn btn-outline-secondary submitButton float-right' type='submit'>Submit</button>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default AddCase

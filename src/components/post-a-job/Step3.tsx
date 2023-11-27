import React, { useState, useEffect } from 'react';
import Footer from '../Footer';
import "../../styles/modal.css";
import ReactModal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { saveAs } from 'file-saver';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 20,
        width: '50%',
        height: "300px"
    },
};

const Step3: React.FC = () => {
    const taskTitle = sessionStorage.getItem('taskTitle');
    const selectedCategories = sessionStorage.getItem('selectedCategories');

    function DownloadXlsx() {
        const keyword = 'Realtors';
        const country = 'NY';
        const cityname = 'New York';

        const apiUrl = `https://dash.d7leadfinder.com/app/api/search/?keyword=${keyword}&country=${country}&location=${cityname}&key=3fa8f43258cb8d844f5af3f58b392300_MTE5NjUx`;

        // Set mode to "no-cors"
        fetch(apiUrl, {
            method: 'GET',
            mode: 'cors',
        })
            .then(response => {
                // Since mode is "no-cors", response.ok will always be false
                if (!response.ok) {
                    throw new Error(`Network response was not ok. Status: ${response.status}`);
                }
                return response.blob();
            })
            .then(blob => {
                // Use FileSaver to save the blob as a file
                saveAs(blob, 'downloaded_file.xlsx');
            })
            .catch(error => {
                console.error('Error downloading .xlsx file:', error.message);
            });
    }

    function DownloadCsv() {

    }
    return (
        <div className='w-full bg-gray-100 min-h-screen'>
            <div className='w-full bg-white flex items-center flex-col md:flex-row py-8 px-8'>
                <img onClick={() => { window.location.href = "/" }} src={require('../../logo/SwingLeads.png')} alt='logo' width={230} className='absolute cursor-pointer' />
                <div className='flex items-center justify-center w-full text-white md:mt-0 mt-20'>
                    <div className='bg-gray-500 w-12 h-12 rounded-xl flex items-center justify-center'>1</div>
                    <div className=' bg-gray-200 w-16 h-0.5'></div>
                    <div className='bg-gray-500 w-12 h-12 rounded-xl flex items-center justify-center'>2</div>
                    <div className=' bg-gray-200 w-16 h-0.5'></div>
                    <div className='bg-purple-500 w-12 h-12 rounded-xl flex items-center justify-center'>3</div>
                </div>
            </div>

            <div className='w-full flex flex-col items-center'>
                <div className='w-10/12 mt-6 rounded-lg'>
                    <p className='flex items-center text-lg font-bold'>Congratulations! Here are your leads <img className='w-5 ml-2' src={require("../../logo/party-popper.png")} alt='congrats' /></p>
                </div>
            </div>

            <div className='w-full flex flex-col items-center text-lg'>
                <div className='bg-white w-10/12 p-8 mt-2 rounded-lg'>
                    <h1 className='text-2xl font-bold'>{taskTitle}</h1>
                    <p className='text-lg'>
                        {JSON.parse(selectedCategories ?? '[]').map((category: string, index: number) => (
                            // Your mapping logic goes here, for example:
                            <span key={index}>{category}</span>
                        ))}
                    </p>
                    <div className='flex justify-between items-center'>
                        <p className='text-lg'>100 Leads</p>
                        <div className='flex items-center'>
                            <p>Export Options :</p>
                            <button onClick={DownloadXlsx} className='bg-purple-500 px-4 py-2 text-white rounded-lg ml-4'>.xlsx</button>
                            <button onClick={DownloadCsv} className='bg-purple-500 px-4 py-2 text-white rounded-lg ml-4'>.csv</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-center w-full mt-4 mb-12'>
                <div className='flex justify-end w-10/12 items-center'>
                    <button className={`bg-purple-500 px-8 py-3 text-white rounded-lg`}>Continue</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Step3;

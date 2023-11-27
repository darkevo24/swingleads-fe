import React, { useState, useEffect } from 'react';
import Footer from '../Footer';
import "../../styles/modal.css";
import ReactModal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

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

const Step2: React.FC = () => {
    const [pin, setPin] = useState('');

    const handlePinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPin(event.target.value);
    };

    const handleContinue = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/check_pin', { pin });

            if (response.data.message === "PIN is valid") {
                window.location.href = "/post-a-job-step-3"; // Redirect to the next step
            }
            else {
                toast.error(response.data.message); // Display error toast
            }

        } catch (err: any) {
            toast.error(err.response.data.message); // Display error toast
        }
    };



    const circleStyle = {
        fill: 'none',
        stroke: 'purple',
        strokeWidth: 2,
    };

    const lineStyle = {
        stroke: 'purple',
        strokeWidth: 2,
    };
    return (
        <div className='w-full bg-gray-100 min-h-screen'>
            <div className='w-full bg-white flex items-center flex-col md:flex-row py-8 px-8'>
                <img onClick={() => { window.location.href = "/" }} src={require('../../logo/SwingLeads.png')} alt='logo' width={230} className='absolute cursor-pointer' />
                <div className='flex items-center justify-center w-full text-white md:mt-0 mt-20'>
                    <div className='bg-gray-500 w-12 h-12 rounded-xl flex items-center justify-center'>1</div>
                    <div className=' bg-gray-200 w-16 h-0.5'></div>
                    <div className='bg-purple-500 w-12 h-12 rounded-xl flex items-center justify-center'>2</div>
                    <div className=' bg-gray-200 w-16 h-0.5'></div>
                    <div className='bg-gray-200 w-12 h-12 rounded-xl flex items-center justify-center'>3</div>
                </div>
            </div>

            <div className='w-full flex flex-col items-center'>
                <div className='bg-white w-10/12 p-8 mt-8 rounded-lg'>
                    <h1 className='text-2xl font-bold'>Enter User PIN*</h1>
                    <input
                        type='text'
                        className='w-full mt-4 px-4 py-3 border border-black rounded-2xl '
                        value={pin}
                        placeholder={`Enter unique code/PIN received via Discord`}
                        onChange={handlePinChange}
                    ></input>
                </div>
            </div>

            <div className='w-full flex flex-col items-center'>
                <div className='bg-white w-10/12 p-8 mt-8 rounded-lg'>
                    <h1 className='text-2xl font-bold'>Disclaimer</h1>
                    <p className='mt-1 text-lg'>*User PIN is generated when activating a plan through the <span className='text-purple-500 underline'>Agency Rocketship</span> Discord community.</p>
                </div>
            </div>

            <div className='flex items-center justify-center w-full mt-4 mb-12'>
                <div className='flex justify-end w-10/12 items-center'>
                    <p className='text-lg mr-10'>Haven't received your code? <span className='text-purple-500 underline'>Open ticket on Discord</span> </p>
                    <button onClick={handleContinue} className={`bg-${pin ? 'purple-500' : 'gray-500'} px-8 py-3 text-white rounded-lg`} disabled={!pin}>Continue</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Step2;

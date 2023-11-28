import React, { useState, useEffect } from 'react';
import Footer from '../Footer';
import "../../styles/modal.css";
import ReactModal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
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

const Step1: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [iconChanged, setIconChanged] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [taskDescription, setTaskDescription] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const [pin, setPin] = useState('');
    const [step1, setStep1] = useState(true);
    const [step2, setStep2] = useState(false);
    const [step3, setStep3] = useState(false);

    const handlePinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPin(event.target.value);
    };

    const handleContinue = async () => {
        try {
            const response = await axios.post('https://swingleads-be.vercel.app/check_pin', { pin });

            if (response.data.message === "PIN is valid") {
                setStep1(false);
                setStep2(false);
                setStep3(true);
            }
            else {
                toast.error(response.data.message); // Display error toast
            }

        } catch (err: any) {
            toast.error(err.response.data.message); // Display error toast
        }
    };

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

    useEffect(() => {
        // Load data from sessionStorage on component mount
        const storedTaskDescription = sessionStorage.getItem('taskDescription');
        const storedSelectedCategories = sessionStorage.getItem('selectedCategories');
        const storedTaskTitle = sessionStorage.getItem('taskTitle');

        if (storedTaskTitle) {
            setTaskTitle(storedTaskTitle);
        }

        if (storedTaskDescription) {
            setTaskDescription(storedTaskDescription);
        }

        if (storedSelectedCategories) {
            setSelectedCategories(JSON.parse(storedSelectedCategories));
        }
    }, []);

    useEffect(() => {
        // Save data to sessionStorage whenever taskDescription or selectedCategories change
        sessionStorage.setItem('taskDescription', taskDescription);
        sessionStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
        sessionStorage.setItem('taskTitle', taskTitle);

    }, [taskDescription, selectedCategories, taskTitle]);

    // Inside the PostAJob component
    // Function to handle textarea input
    const handleTaskDescriptionChange = (event: any) => {
        setTaskDescription(event.target.value);
    };

    const handleTaskDTitleChange = (event: any) => {
        setTaskTitle(event.target.value);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
        setIconChanged(!iconChanged);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // document.body.style.backgroundColor = 'transparent';
    }

    const circleStyle = {
        fill: 'none',
        stroke: 'purple',
        strokeWidth: 2,
    };

    const lineStyle = {
        stroke: 'purple',
        strokeWidth: 2,
    };

    const category = ["Los Angeles, CA", "Miami, FL", "New York City, NY", "Seattle, WA", "Ottawa, ON"];

    const removeCategory = (indexToRemove: number) => {
        const updatedCategories = selectedCategories.filter((_: any, index: number) => index !== indexToRemove);
        setSelectedCategories(updatedCategories);
    };

    return (
        <>
            {step1 &&
                <div className='w-full bg-gray-100 min-h-screen'>
                    <div className='w-full bg-white flex items-center flex-col md:flex-row py-8 px-8'>
                        <img onClick={() => { window.location.href = "/" }} src={require('../../logo/SwingLeads.png')} alt='logo' width={230} className='absolute cursor-pointer' />
                        <div className='flex items-center justify-center w-full text-white md:mt-0 mt-20'>
                            <div className='bg-purple-500 w-12 h-12 rounded-xl flex items-center justify-center'>1</div>
                            <div className=' bg-gray-200 w-16 h-0.5'></div>
                            <div className='bg-gray-200 w-12 h-12 rounded-xl flex items-center justify-center'>2</div>
                            <div className=' bg-gray-200 w-16 h-0.5'></div>
                            <div className='bg-gray-200 w-12 h-12 rounded-xl flex items-center justify-center'>3</div>
                        </div>
                    </div>

                    <div className='w-full flex flex-col items-center'>
                        <div className='bg-white w-10/12 p-8 mt-8 rounded-lg'>
                            <h1 className='text-2xl font-bold'>Enter target keyword</h1>
                            <input
                                type='text'
                                className='w-full mt-4 px-4 py-3 border border-black rounded-2xl '
                                value={taskTitle}
                                placeholder={`Enter keywords (example : "realtors, restaurant, chiropractors")`}
                                onChange={handleTaskDTitleChange}
                            ></input>
                        </div>
                    </div>

                    <div className='w-full flex flex-col items-center'>
                        <div className='bg-white w-10/12 p-8 mt-4 rounded-lg'>
                            <h1 className='text-2xl font-bold'>Choose category</h1>
                            <div className='flex items-center mt-2 flex-col md:flex-row'>
                                {selectedCategories.map((item: any, index: number) => (
                                    <div key={index} className='flex items-center flex-col md:flex-row md:my-0 my-2 justify-center mr-2 text-purple-500 cursor-pointer border-2 border-purple-500 px-2 py-1 rounded-full'>
                                        <p onClick={() => removeCategory(index)}>{item}</p>
                                    </div>
                                ))}
                                <div className='flex items-center text-purple-500 md:ml-4'>
                                    <svg onClick={openModal} className='cursor-pointer' width="20" height="20" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="20" cy="20" r="18" style={circleStyle} />
                                        <line x1="12" y1="20" x2="28" y2="20" style={lineStyle} />
                                        <line x1="20" y1="12" x2="20" y2="28" style={lineStyle} />
                                    </svg>
                                    <p className='ml-2 cursor-pointer' onClick={openModal}>Add a category</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ReactModal
                        isOpen={isModalOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        className="modal-content mx-auto my-40 p-8 bg-white rounded-lg shadow-lg w-10/12 md:w-6/12"
                        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
                    >
                        <div className='w-full'>
                            <p className='font-bold text-xl mb-6'>Choose categories</p>
                            <div className='flex flex-col'>
                                <button
                                    onClick={toggleDropdown}
                                    id="dropdownHoverButton"
                                    data-dropdown-toggle="dropdownHover"
                                    data-dropdown-trigger="hover"
                                    className="relative border border-black w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center text-gray-400"
                                    type="button"
                                >
                                    Enter a city (example: "Los Angeles, CA")
                                    {iconChanged ? (
                                        <svg
                                            className="w-2.5 h-2.5 ms-3 absolute right-5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                        >
                                            {/* Original path for the default icon */}
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-2.5 h-2.5 ms-3 absolute right-5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                        >
                                            {/* Updated path for the arrow aiming to the top */}
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M1 5 5 1 9 5"
                                            />
                                        </svg>
                                    )}
                                </button>

                                {isDropdownOpen && (
                                    <div
                                        id="dropdownHover"
                                        className="overflow-y-auto max-h-40 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 border border-black w-full"
                                    >
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                                            {category.map((item, index) => (
                                                <div className='flex flex-col items-center'>
                                                    <div className='w-11/12'>
                                                        <li key={index}>
                                                            <a
                                                                href="#"
                                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full"
                                                                onClick={() => {
                                                                    if (!selectedCategories.includes(item)) {
                                                                        setSelectedCategories([...selectedCategories, item]);
                                                                        closeModal();
                                                                    }
                                                                }}
                                                            >
                                                                {item}
                                                            </a>

                                                        </li>
                                                    </div>
                                                    {category.length - 1 !== index && (
                                                        <div className='w-11/12 bg-gray-200 h-0.5'></div>
                                                    )}
                                                </div>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </ReactModal>

                    <div className='w-full flex flex-col items-center mt-4 mb-12'>
                        <div className='flex justify-end w-10/12'>
                            <button onClick={() => {
                                setStep1(false);
                                setStep2(true);
                                setStep3(false);
                            }} className={`bg-${taskTitle && selectedCategories.length > 0 ? 'purple-500' : 'gray-500'} px-8 py-3 text-white rounded-lg`} disabled={!taskTitle || selectedCategories.length === 0}>Continue</button>
                        </div>
                    </div>
                </div>
            }
            {
                step2 &&
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
            }
            {
                step3 &&
                < div className='w-full bg-gray-100 min-h-screen'>
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
                                {selectedCategories.map((category: string, index: number) => (
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
                </div >
            }
        </>
    );
};

export default Step1;

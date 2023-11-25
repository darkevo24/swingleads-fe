// components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white p-6">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold">SwingLeads</h3>
                    <p>&copy; {new Date().getFullYear()} SwingLeads. All rights reserved.</p>
                </div>
                <div>
                    <ul className="flex space-x-4">
                        <li className='hover:opacity-80'>
                            <a href="/">Home</a>
                        </li>
                        <li className='hover:opacity-80'>
                            <a href="/tasks">Services</a>
                        </li>
                        {/* <li>
                            <a href="/contact">Contact</a>
                        </li> */}
                        {/* Add more links as needed */}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

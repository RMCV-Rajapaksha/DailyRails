import React from 'react';

import  { useState } from 'react';
function SubmitItem() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');

  return (
    <>
    
      <div className='mt-20 mb-20 font-body'>
        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm text-primary font-body">Name</label>
            <input onChange={(e)=>setName(e.target.value)} type="text" id="name" className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5" placeholder="name@flowbite.com" required />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input  id="lost" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
              <label htmlFor="lost" className="text-sm font-medium ms-2 text-primary">Lost</label>
            </div>
            <div className="flex items-center h-5 ml-4">
              <input id="found" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
              <label htmlFor="found" className="text-sm font-medium ms-2 text-primary">Found</label>
            </div>
          </div>
          <div className="mb-5">
            <label htmlFor="title" className="block mb-2 text-sm text-primary font-body">Title</label>
            <input onChange={(e)=>setTitle(e.target.value)} type="text" id="title" className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5" required />
          </div>
          <div className="mb-5">
            <label htmlFor="description" className="block mb-2 text-sm text-primary font-body">Description</label>
            <textarea onChange={(e)=>setDescription(e.target.value)} id="description" className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5 h-24" required></textarea>
          </div>
          <div className="mb-5">
            <label htmlFor="contact" className="block mb-2 text-sm text-primary font-body">Contact Number</label>
            <input onChange={(e)=>setContact(e.target.value)} type="text" id="contact" className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5" required />
          </div>
          <button type="submit" className="p-3 text-white rounded-sm bg-primary hover:bg-secondary">Submit</button>
        </form>
      </div>
   
    </>
  );
}

export default SubmitItem;

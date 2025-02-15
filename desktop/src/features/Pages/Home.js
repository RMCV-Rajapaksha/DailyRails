import React from 'react'

const Home = () => {
  return (
          <div className="flex-1 bg-gray-100 p-5 font-sans">
        <h1 className="text-blue-800 text-3xl mb-6">Dashboard</h1>
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 mb-5">
          <h2 className="text-gray-800 text-xl">Welcome Back!</h2>
          <p className="text-gray-600">Manage schedules, routes, notifications, and more from your dashboard.</p>
        </div>
        <div className="flex flex-wrap gap-5">
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 flex-1 min-w-[250px]">
            <h3 className="text-gray-800 text-lg">Statistics Overview</h3>
            <p className="text-gray-600">View analytics and reports of your system.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 flex-1 min-w-[250px]">
            <h3 className="text-gray-800 text-lg">Manage Notifications</h3>
            <p className="text-gray-600">Send updates and alerts to users effortlessly.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 flex-1 min-w-[250px]">
            <h3 className="text-gray-800 text-lg">Admin Settings</h3>
            <p className="text-gray-600">Configure user roles and permissions securely.</p>
          </div>
        </div>
      </div> 
  )
}

export default Home
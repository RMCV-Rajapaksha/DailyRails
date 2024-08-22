import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [nicNo, setNicNo] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [nearestStation, setNearestStation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log({
      name,
      nicNo,
      incidentType,
      problemDescription,
      nearestStation,
    });
  };

  const handleReset = () => {
    setName("");
    setNicNo("");
    setIncidentType("");
    setProblemDescription("");
    setNearestStation("");
  };

  return (
    <div className="mt-20 mb-20 font-body">
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm text-primary font-body"
          >
            Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="nicNo"
            className="block mb-2 text-sm text-primary font-body"
          >
            NIC No
          </label>
          <input
            onChange={(e) => setNicNo(e.target.value)}
            type="text"
            id="nicNo"
            className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="incidentType"
            className="block mb-2 text-sm text-primary font-body"
          >
            Type of Incident Reported
          </label>
          <textarea
            onChange={(e) => setIncidentType(e.target.value)}
            id="incidentType"
            className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5 h-24"
            required
          ></textarea>
        </div>

        <div className="mb-5">
          <label
            htmlFor="problemDescription"
            className="block mb-2 text-sm text-primary font-body"
          >
            Problem Description
          </label>
          <textarea
            onChange={(e) => setProblemDescription(e.target.value)}
            id="problemDescription"
            className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5 h-24"
            required
          ></textarea>
        </div>

        <div className="mb-5">
          <label
            htmlFor="nearestStation"
            className="block mb-2 text-sm text-primary font-body"
          >
            Nearest Railway Station
          </label>
          <input
            onChange={(e) => setNearestStation(e.target.value)}
            id="nearestStation"
            className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5"
            required
          />
        </div>

        <button
          type="submit"
          className="p-3 mr-2 text-white rounded-sm bg-primary hover:bg-secondary"
        >
          Report
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="p-3 text-white rounded-sm bg-primary hover:bg-secondary"
        >
          Reset
        </button>
      </form>
    </div>
  );
}

export default Contact;

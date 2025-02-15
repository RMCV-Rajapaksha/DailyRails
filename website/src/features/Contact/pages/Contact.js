import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../../components/Button";

function Contact() {
  const [name, setName] = useState("");
  const [nicNo, setNicNo] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [nearestStation, setNearestStation] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!/^[A-Za-z\s]{3,}$/.test(name))
      newErrors.name = "Name must be at least 3 characters, letters only";

    if (!nicNo.trim()) newErrors.nicNo = "NIC is required";
    if (!/^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(nicNo))
      newErrors.nicNo = "Invalid NIC format";

    if (!incidentType.trim())
      newErrors.incidentType = "Incident type is required";
    if (incidentType.length < 10)
      newErrors.incidentType = "Please provide more details";

    if (!problemDescription.trim())
      newErrors.problemDescription = "Description is required";
    if (problemDescription.length < 20)
      newErrors.problemDescription =
        "Description must be at least 20 characters";

    if (!nearestStation.trim())
      newErrors.nearestStation = "Station name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix all errors before submitting");
      return;
    }

    try {
      // Generate ReportID
      const date = new Date();
      const randomNum = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
      const reportId = `RPT${date.getFullYear()}${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${randomNum}`;

      const response = await axios.post(
        "http://localhost:4000/api/reports",
        {
          ReportID: reportId,
          Name: name.trim(),
          NIC: nicNo.trim(),
          Type: incidentType.trim(),
          Description: problemDescription.trim(),
          ClosestStation: nearestStation.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Report submitted successfully!");
        handleReset();
      }
    } catch (error) {
      console.error("Submission error:", error.response?.data || error.message);

      if (error.response?.data?.errors) {
        setErrors((prev) => ({
          ...prev,
          ...error.response.data.errors,
        }));
        toast.error("Please check all fields");
      } else {
        toast.error(error.response?.data?.error || "Failed to submit report");
      }
    }
  };

  const handleReset = () => {
    setName("");
    setNicNo("");
    setIncidentType("");
    setProblemDescription("");
    setNearestStation("");
    setErrors({});
  };

  return (
    <div className="mt-20 mb-20 font-body">
      <ToastContainer />
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
            value={name}
            type="text"
            id="name"
            className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5"
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
          )}
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
            value={nicNo}
            type="text"
            id="nicNo"
            className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5"
          />
          {errors.nicNo && (
            <p className="mt-1 text-xs text-red-500">{errors.nicNo}</p>
          )}
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
            value={incidentType}
            id="incidentType"
            className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5 h-24"
          />
          {errors.incidentType && (
            <p className="mt-1 text-xs text-red-500">{errors.incidentType}</p>
          )}
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
            value={problemDescription}
            id="problemDescription"
            className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5 h-24"
          />
          {errors.problemDescription && (
            <p className="mt-1 text-xs text-red-500">
              {errors.problemDescription}
            </p>
          )}
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
            value={nearestStation}
            id="nearestStation"
            className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5"
          />
          {errors.nearestStation && (
            <p className="mt-1 text-xs text-red-500">{errors.nearestStation}</p>
          )}
        </div>

        <Button
          type="submit"
          className="p-3 mr-2 text-white rounded-sm bg-primary hover:bg-secondary"
        >
          Report
        </Button>
        <Button
          type="button"
          onClick={handleReset}
          className="p-3 text-white rounded-sm bg-primary hover:bg-secondary"
        >
          Reset
        </Button>
      </form>
    </div>
  );
}

export default Contact;

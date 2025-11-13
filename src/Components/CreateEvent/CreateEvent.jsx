import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.init";


const CreateEvent = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    status: 'Upcoming',
    theme: 'Blue',
  });

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!user) {
      alert("🔒 Please log in to create an event.");
      navigate("/login");
      return;
    }

    console.log("Event Created:", formData);
    alert("✅ Event Created and Shared!");
    setShowForm(false);
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      status: 'Upcoming',
      theme: 'Blue',
    });
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-start text-center px-4">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 mt-5 font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-orange-800 transition transform hover:scale-[1.02]"
        >
          Host a New Public Event
        </button>
      ) : (
        <div className="mt-6 space-y-4 text-left px-9 py-10 w-full max-w-xl">
          <h1 className="text-red-900 text-5xl py-5 text-center">Community Event</h1>
          <h2 className="text-xl font-semibold text-gray-800">Create New Event</h2>

          <input
            type="text"
            name="title"
            placeholder="e.g., Global Tech Summit 2026"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded text-gray-500"
          />

          <textarea
            name="description"
            placeholder="Briefly describe the event highlights."
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded text-gray-500"
          />

          <div className="flex gap-4">
            <input
              type="text"
              name="date"
              placeholder="mm/dd/yyyy"
              value={formData.date}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded text-gray-500"
            />
            <input
              type="text"
              name="time"
              placeholder="7:00 PM"
              value={formData.time}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded text-gray-500"
            />
          </div>

          <input
            type="text"
            name="location"
            placeholder="e.g., New York, NY or Online"
            value={formData.location}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded text-gray-500"
          />

          <div className="flex gap-4">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Red">Red</option>
              <option value="Purple">Purple</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full px-6 py-3 font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-green-700 transition transform hover:scale-[1.02]"
          >
            + Create and Share Event
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateEvent;
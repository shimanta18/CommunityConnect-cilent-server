import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Components/firebase/firebase.init";


const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    status: 'Upcoming',
    theme: 'Blue',
    category: 'Cleanup',
    image: ''
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    
    if (!user) {
      alert("Please log in to create an event.");
      navigate("/login");
      return;
    }

    // Validate required fields
    if (!formData.title || !formData.description || !formData.date || !formData.time || !formData.location) {
      alert("Please fill in all required fields!");
      return;
    }

    setLoading(true);

    try {
      // Create event object
      const newEvent = {
        ...formData,
        image: formData.image || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop",
        userId: user.uid,
        userEmail: user.email
      };

      // Send to MongoDB via API
      const response = await fetch('http://localhost:3000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent)
      });

      const result = await response.json();

      if (response.ok) {
        alert(" Event Created and Shared!");
        navigate("/upcoming-events");
      } else {
        throw new Error('Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert(" Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/upcoming-events");
  };

  return (
    <div className="bg-[#f1ecea] min-h-screen text-white py-20 px-4">
      <div className="flex justify-center">
        <div className="mt-6 space-y-4 text-left px-9 py-10 w-full max-w-xl bg-white rounded-lg shadow-2xl">
          <h1 className="text-red-900 text-5xl py-5 text-center font-bold">Community Event</h1>
          <h2 className="text-xl font-semibold text-gray-800">Create New Event</h2>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Event Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g., Global Tech Summit 2026"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              placeholder="Briefly describe the event highlights."
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[120px]"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="date"
                placeholder="mm/dd/yyyy"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Time <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="time"
                placeholder="7:00 PM"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              placeholder="e.g., New York, NY or Online"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Image URL (optional)
            </label>
            <input
              type="text"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Cleanup">Cleanup</option>
                <option value="Plantation">Plantation</option>
                <option value="Donation">Donation</option>
                <option value="Awareness">Awareness</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block text-gray-700 text-sm font-medium mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Theme Color</label>
            <select
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Red">Red</option>
              <option value="Purple">Purple</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleCancel}
              type="button"
              disabled={loading}
              className="w-full px-6 py-3 font-medium rounded-full shadow-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              type="button"
              disabled={loading}
              className="w-full px-6 py-3 font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-green-700 transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                '+ Create and Share Event'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
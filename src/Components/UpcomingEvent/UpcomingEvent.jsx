import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpcomingEvent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const categories = ["All", "Cleanup", "Plantation", "Donation", "Awareness", "Other"];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching events from: http://localhost:3000/events');
      
      const response = await fetch('http://localhost:3000/events');
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Events received:', data);
      console.log('Number of events:', data.length);
      
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = () => {
    navigate("/createEvent");
  };

  const filteredEvents = events.filter(event => {
  // Use optional chaining and default empty strings to prevent crashes
  const title = (event?.title || "").toLowerCase();
  const description = (event?.description || "").toLowerCase();
  const search = searchQuery.toLowerCase();

  const matchesSearch = title.includes(search) || description.includes(search);
  
  // Ensure the category match is case-insensitive or handles missing categories
  const eventCategory = event?.category || "Other";
  const matchesCategory = selectedCategory === "All" || 
                          eventCategory.toLowerCase() === selectedCategory.toLowerCase();
  
  return matchesSearch && matchesCategory;
});
  const getCategoryColor = (category) => {
    const colors = {
      Cleanup: "bg-blue-600",
      Plantation: "bg-green-600",
      Donation: "bg-purple-600",
      Awareness: "bg-orange-600",
      Other: "bg-gray-600"
    };
    return colors[category] || "bg-gray-600";
  };

  return (
    <div className="bg-white min-h-screen pb-10">
      <div className="text-center pt-20 text-black pb-8">
        <h1 className="font-bold text-3xl mb-2">Upcoming Events</h1>
        <p className="mb-8 text-gray-600">
          Discover social development events in your community. Join hands with <br />
          fellow volunteers to create positive change.
        </p>

        {/* Search Bar and Filter */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center px-4 mb-8 max-w-4xl mx-auto">
          {/* Search Input */}
          <div className="relative w-full md:flex-1">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search events by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Filter Button */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-3 bg-gray-50 border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 min-w-[120px]"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Host Event Button */}
        <button
          onClick={handleCreateEvent}
          className="px-6 py-3 mt-5 font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition transform hover:scale-[1.02]"
        >
          Host a New Public Event
        </button>
      </div>

      {/* Debug Info */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
            <p className="mt-2 text-sm">
              Please check:
              <br />• Is your backend running on http://localhost:3000?
              <br />• Check browser console (F12) for more details
              <br />• Try opening http://localhost:3000/events in a new tab
            </p>
          </div>
        </div>
      )}

      {/* Events Grid */}
      <div className="px-4 max-w-7xl mx-auto mt-10">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            <p className="text-gray-600 text-lg mt-4">Loading events...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <svg className="w-24 h-24 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Unable to Load Events</h2>
            <p className="text-gray-500 mb-6">There was a problem connecting to the server</p>
            <button
              onClick={fetchEvents}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
            >
              Try Again
            </button>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No Events Found</h2>
            <p className="text-gray-500 mb-2">
              {searchQuery || selectedCategory !== "All" 
                ? "Try adjusting your search or filter" 
                : "Be the first to create an event!"}
            </p>
            <p className="text-sm text-gray-400 mb-6">
              Total events in database: {events.length}
            </p>
            <button
              onClick={handleCreateEvent}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
            >
              Create First Event
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-lg overflow-hidden border-2 border-gray-200 hover:border-indigo-400 hover:shadow-xl transition-all duration-300"
              >
                {/* Event Image */}
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={event.image || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Category Badge */}
                  <div className={`absolute top-3 right-3 ${getCategoryColor(event.category)} text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg`}>
                    {event.category}
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                  {/* Location */}
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <svg className="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </div>

                  {/* Date */}
                  <div className="flex items-center text-gray-600 text-sm mb-6">
                    <svg className="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date}
                  </div>

                  {/* View Event Button */}
                  <button 
                    onClick={() => navigate(`/event/${event._id}`)}
                    className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center group"
                  >
                    View Event
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvent;
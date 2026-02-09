import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Components/firebase/firebase.init";

const JoinedEvent = () => {
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJoinedEvents();
  }, []);

  const fetchJoinedEvents = async () => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/joined-events/user/${user.uid}`);
      const data = await response.json();
      
      // Sort by event date
      const sortedEvents = data.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
      setJoinedEvents(sortedEvents);
    } catch (error) {
      console.error('Error fetching joined events:', error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="text-gray-600 text-lg mt-4">Loading your events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Joined Events</h1>
          <p className="text-gray-600">Events you have registered to attend</p>
        </div>

        {joinedEvents.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No Events Joined Yet</h2>
            <p className="text-gray-500 mb-6">Start joining events to make a difference in your community!</p>
            <button
              onClick={() => navigate('/upcoming-events')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
            >
              Browse Events
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <div className={`absolute top-3 right-3 ${getCategoryColor(event.eventCategory)} text-white px-3 py-1 rounded-full text-sm font-medium z-10`}>
                    {event.eventCategory}
                  </div>
                  <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                    Joined
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{event.eventTitle}</h3>

                  {/* Location */}
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.eventLocation}
                  </div>

                  {/* Event Date */}
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.eventDate}
                  </div>

                  {/* Joined Date */}
                  <div className="border-t pt-4 mt-4">
                    <p className="text-xs text-gray-500">
                      Joined on: {new Date(event.joinedAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => navigate(`/event/${event.eventId}`)}
                    className="w-full mt-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    View Details
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

export default JoinedEvent;
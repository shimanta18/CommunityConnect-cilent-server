
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../../Components/firebase/firebase.init";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    fetchEventDetails();
    checkIfJoined();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/events/${id}`);
      const data = await response.json();
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event details:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkIfJoined = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const response = await fetch(`http://localhost:3000/joined-events/check/${id}/${user.uid}`);
      const data = await response.json();
      setHasJoined(data.hasJoined);
    } catch (error) {
      console.error('Error checking joined status:', error);
    }
  };

  const handleJoinEvent = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in to join this event.");
      navigate("/login");
      return;
    }

    setJoining(true);

    try {
      const joinData = {
        eventId: event._id,
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName || "Anonymous",
        eventTitle: event.title,
        eventDate: event.date,
        eventLocation: event.location,
        eventCategory: event.category,
        joinedAt: new Date().toISOString()
      };

      const response = await fetch('http://localhost:3000/joined-events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(joinData)
      });

      if (response.ok) {
        alert(" Successfully joined the event!");
        setHasJoined(true);
      } else {
        throw new Error('Failed to join event');
      }
    } catch (error) {
      console.error('Error joining event:', error);
      alert(" Failed to join event. Please try again.");
    } finally {
      setJoining(false);
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
          <p className="text-gray-600 text-lg mt-4">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Event not found</h2>
          <button
            onClick={() => navigate('/upcoming-events')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/upcoming-events')}
          className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Events
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Event Image */}
          <div className="relative h-96">
            <img
              src={event.image || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=400&fit=crop"}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute top-4 right-4 ${getCategoryColor(event.category)} text-white px-4 py-2 rounded-full font-medium`}>
              {event.category}
            </div>
          </div>

          {/* Event Details */}
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>

            {/* Event Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Date */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-indigo-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="text-lg text-gray-900">{event.date}</p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-indigo-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Time</p>
                  <p className="text-lg text-gray-900">{event.time}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-indigo-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="text-lg text-gray-900">{event.location}</p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-indigo-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p className="text-lg text-gray-900">{event.status}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{event.description}</p>
            </div>

            {/* Join Button */}
            <div className="border-t pt-6">
              {hasJoined ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                  <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-green-800 font-medium">You have already joined this event!</span>
                </div>
              ) : (
                <button
                  onClick={handleJoinEvent}
                  disabled={joining}
                  className="w-full md:w-auto px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {joining ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Joining...
                    </span>
                  ) : (
                    'Join This Event'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
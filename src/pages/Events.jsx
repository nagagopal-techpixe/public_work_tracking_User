import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Loader } from "lucide-react";
import { getAllEvents } from "../api/eventsApi";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await getAllEvents();
      if (res?.success) {
        setEvents(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Loader className="animate-spin text-orange-600" size={32} />
      </div>
    );
  }

  return (
    <div className="py-12 bg-white container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-slate-800">
       Works
      </h2>

      {events.length === 0 ? (
        <p className="text-center text-slate-500">No events available</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              {/* Event Image */}
              <img
                src={event.images?.[0] || "https://via.placeholder.com/400"}
                alt={event.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-bold text-orange-600 mb-2">
                  {event.title}
                </h3>

                <div className="flex items-center gap-2 text-slate-600 mb-2">
                  <Calendar size={16} />
                  Status: <span className="capitalize">{event.status}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-600 mb-3">
                  <MapPin size={16} />
                  {event.verified ? "Verified Event" : "Not Verified"}
                </div>

                <p className="text-slate-700 text-sm line-clamp-3">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;

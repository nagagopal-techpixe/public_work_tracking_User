import { Calendar, Loader } from "lucide-react";
// import { useNavigate } from "react-router-dom";

import useEvents from "./useEvents";
import Filters from "./Filters";

const Events = ({ navigate, setSelectedEventId }) => {


  const eventsData = useEvents();
  // const navigate = useNavigate();


  return (

    <div className="py-12 bg-white container mx-auto px-4">

      <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">
        Works
      </h2>


      {/* Filters */}
      <Filters {...eventsData} />


      {/* Loading */}
      {eventsData.loading && (

        <div className="flex justify-center py-20">
          <Loader size={32} className="animate-spin text-orange-600" />
        </div>
      )}


      {/* No Data */}
      {!eventsData.loading && eventsData.events.length === 0 && (

        <p className="text-center text-slate-500">
          No works found
        </p>
      )}


      {/* Cards */}
      {!eventsData.loading && eventsData.events.length > 0 && (

        <>

          <div className="grid md:grid-cols-3 gap-8">

            {eventsData.events.map((event) => (

              <div
                key={event._id}
                className="border rounded-xl shadow hover:shadow-lg flex flex-col"
              >

                <img
                  src={event.images?.[0] || "https://via.placeholder.com/400"}
                  alt={event.title}
                  className="h-48 w-full object-cover"
                />


                <div className="p-5 flex flex-col flex-grow">

                  <h3 className="text-lg font-bold text-orange-600 mb-2">
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                    <Calendar size={15} />
                    {event.status}
                  </div>

                  <p className="text-sm text-slate-700 line-clamp-3 flex-grow">
                    {event.description}
                  </p>


                  {/* ✅ View Button */}
                  <button
                    onClick={() => {
  setSelectedEventId(event._id);
  navigate('viewdetail');
}}

                    className="mt-4 w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition"
                  >
                    View
                  </button>

                </div>

              </div>
            ))}

          </div>


          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-10">

            <button
              disabled={eventsData.page === 1}
              onClick={() => eventsData.setPage(eventsData.page - 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span>
              Page {eventsData.page} / {eventsData.totalPages}
            </span>

            <button
              disabled={eventsData.page === eventsData.totalPages}
              onClick={() => eventsData.setPage(eventsData.page + 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>

          </div>

        </>
      )}

    </div>
  );
};

export default Events;

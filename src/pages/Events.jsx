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
  className="group border rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden bg-white flex flex-col"
>

  {/* Image */}
  <div className="relative overflow-hidden">
    <img
      src={event.images?.[0] || "https://via.placeholder.com/400"}
      alt={event.title}
      className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
    />

    {/* Status Badge */}
    <span className="absolute top-3 right-3 bg-orange-600 text-white text-xs px-3 py-1 rounded-full shadow">
      {event.status}
    </span>
  </div>


  {/* Content */}
  <div className="p-5 flex flex-col flex-grow">

    {/* Title */}
    <h3 className="text-lg font-semibold text-slate-800 mb-1 line-clamp-1">
      {event.title}
    </h3>


    {/* Description */}
    <p className="text-sm text-slate-600 line-clamp-2 mb-3">
      {event.description}
    </p>


    {/* Location Box */}
 <div className="bg-slate-50 rounded-xl p-5 mb-5 border border-slate-200">

  <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-slate-700">
<p className="flex gap-1">
      <span className="font-semibold">State:</span>
      <span>{event.constituencydata?.[0]?.state || "N/A"}</span>
    </p>
   

    <p className="flex gap-1">
      <span className="font-semibold">Mandal:</span>
      <span>{event.mandaldata?.[0]?.mandal_name || "N/A"}</span>
    </p>

    
<p className="flex gap-1">
      <span className="font-semibold">parliament:</span>
      <span>{event.constituencydata?.[0]?.district || "N/A"}</span>
    </p>
    <p className="flex gap-1">
      <span className="font-semibold">Village:</span>
      <span>{event.villagedata?.[0]?.village_name || "N/A"}</span>
    </p>

    

     <p className="flex gap-1">
      <span className="font-semibold">Constituency:</span>
      <span>{event.constituencydata?.[0]?.constituency_name || "N/A"}</span>
    </p>

    <p className="flex gap-1">
      <span className="font-semibold">Habitation:</span>
      <span>{event.habitationdata?.[0]?.habitation_name || "N/A"}</span>
    </p>

  </div>

</div>



    {/* Button */}
    <button
      onClick={() => {
        setSelectedEventId(event._id);
        navigate("viewdetail");
      }}
      className="mt-auto w-full bg-orange-600 text-white py-2.5 rounded-lg font-medium hover:bg-orange-700 active:scale-95 transition"
    >
      View Details
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

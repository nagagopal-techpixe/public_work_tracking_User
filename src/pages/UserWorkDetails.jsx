import React, { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Loader } from "lucide-react";
import { getWorkById } from "../api/eventsApi";
import { useNavigate } from "react-router-dom";

const ViewDetail = ({ eventId, navigate }) => {

  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!eventId) return;

    const fetchWork = async () => {
      try {
        setLoading(true);

        const res = await getWorkById(eventId);

        // ✅ Your API returns data inside array
        if (res?.success && res?.data?.length > 0) {
          setWork(res.data[0]);
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWork();

  }, [eventId]);

  // ---------------- Loading ----------------
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader className="animate-spin text-orange-600" />
      </div>
    );
  }

  // ---------------- No ID ----------------
  if (!eventId) {
    return (
      <div className="text-center py-20 text-slate-600">
        No work selected
      </div>
    );
  }

  // ---------------- No Data ----------------
  if (!work) {
    return (
      <div className="text-center py-20 text-slate-600">
        Work not found
      </div>
    );
  }

  return (
    <div className="py-12 container mx-auto px-4 max-w-5xl">

      {/* Back */}
      <button
        onClick={() => navigate("events")}
        className="flex items-center gap-2 mb-6 text-orange-600 hover:underline"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Image */}
      <img
        src={work.images?.[0]}
        alt={work.title}
        className="w-full h-96 object-cover rounded-xl mb-6"
      />

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">
        {work.title}
      </h1>

      {/* Status */}
      <div className="flex items-center gap-2 text-slate-600 mb-4">
        <Calendar size={16} />
        {work.status}
      </div>

      {/* Description */}
      <p className="text-slate-700 mb-6">
        {work.description}
      </p>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl">

        <div><b>Department:</b> {work.responsibleDepartment}</div>
        <div><b>Budget:</b> ₹{work.budgetAmount}</div>
        <div><b>Fund Source:</b> {work.fundSource}</div>
        <div><b>Verified:</b> {work.verified ? "Yes" : "No"}</div>

        <div>
          <b>Constituency:</b>{" "}
          {work.constituencydata?.[0]?.constituency_name}
        </div>

        <div>
          <b>Mandal:</b>{" "}
          {work.mandaldata?.[0]?.mandal_name}
        </div>

        <div>
          <b>Village:</b>{" "}
          {work.villagedata?.[0]?.village_name}
        </div>

        <div>
          <b>Habitation:</b>{" "}
          {work.habitationdata?.[0]?.habitation_name}
        </div>

      </div>

      {/* Gallery */}
      {work.images?.length > 1 && (
        <div className="mt-8">

          <h3 className="text-xl font-bold mb-4">
            Gallery
          </h3>

          <div className="grid md:grid-cols-4 gap-4">

            {work.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="work"
                className="h-40 w-full object-cover rounded-lg"
              />
            ))}

          </div>

        </div>
      )}

      {/* Videos */}
{work.videos?.length > 0 && (

  <div className="mt-10">

    <h3 className="text-xl font-bold mb-4">
      Videos
    </h3>

    <div className="grid md:grid-cols-2 gap-6">

      {work.videos.map((video, i) => (

        <video
          key={i}
          src={video}
          controls
          className="w-full rounded-xl shadow"
        />

      ))}

    </div>

  </div>
)}
{/* Documents */}
{/* {work.documents?.length > 0 && (

  <div className="mt-10">

    <h3 className="text-xl font-bold mb-4">
      Documents
    </h3>

    <div className="space-y-3">

      {work.documents.map((doc, i) => (

        <a
          key={i}
          href={doc}
          target="_blank"
          rel="noreferrer"
          className="block text-orange-600 hover:underline"
        >
          📄 Document {i + 1}
        </a>

      ))}

    </div>

  </div>
)} */}
    </div>
  );
};

export default ViewDetail;

const Filters = ({
  title,
  setTitle,

  status,
  setStatus,

  constituencies,
  constituencyId,
  setConstituencyId,

  mandals,
  mandalId,
  setMandalId,

  villages,
  villageId,
  setVillageId,

  habitations,
  habitationId,
  setHabitationId,

  resetFilters,
}) => {

  return (

    <div className="flex flex-wrap justify-center items-center gap-4 mb-8">

      {/* Search */}
      <input
        type="text"
        placeholder="Search title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-3 py-2 rounded-md w-52"
      />


      {/* Status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border px-3 py-2 rounded-md"
      >
        <option value="">All Status</option>
        <option value="planned">Planned</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>


      {/* Constituency */}
      <select
        value={constituencyId}
        onChange={(e) => setConstituencyId(e.target.value)}
        className="border px-3 py-2 rounded-md"
      >
        <option value="">All Constituencies</option>

        {constituencies.map((c) => (
          <option key={c._id} value={c._id}>
            {c.constituency_name}
          </option>
        ))}
      </select>


      {/* Mandal */}
      <select
        value={mandalId}
        onChange={(e) => setMandalId(e.target.value)}
        disabled={!constituencyId}
        className="border px-3 py-2 rounded-md disabled:bg-gray-100"
      >
        <option value="">All Mandals</option>

        {mandals.map((m) => (
          <option key={m._id} value={m._id}>
            {m.mandal_name}
          </option>
        ))}
      </select>


      {/* Village */}
      <select
        value={villageId}
        onChange={(e) => setVillageId(e.target.value)}
        disabled={!mandalId}
        className="border px-3 py-2 rounded-md disabled:bg-gray-100"
      >
        <option value="">All Villages</option>

        {villages.map((v) => (
          <option key={v._id} value={v._id}>
            {v.village_name}
          </option>
        ))}
      </select>


      {/* Habitation */}
      <select
        value={habitationId}
        onChange={(e) => setHabitationId(e.target.value)}
        disabled={!villageId}
        className="border px-3 py-2 rounded-md disabled:bg-gray-100"
      >
        <option value="">All Habitations</option>

        {habitations.map((h) => (
          <option key={h._id} value={h._id}>
            {h.habitation_name}
          </option>
        ))}
      </select>


      {/* Reset */}
      <button
        onClick={resetFilters}
        className="px-5 py-2 rounded-md border border-red-500 text-red-600 hover:bg-red-50"
      >
        Reset Filters
      </button>

    </div>
  );
};

export default Filters;

import { useEffect, useState } from "react";

import {
  getAllEvents,
  getAllConstituencies,
  GetAllMandalsByConstituencyId,
  GetAllVillagesByMandalId,
  GetAllHabitationsByVillageId,
} from "../api/eventsApi";

export default function useEvents() {

  /* ================= STATES ================= */

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 6;
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  const [constituencies, setConstituencies] = useState([]);
  const [constituencyId, setConstituencyId] = useState("");

  const [mandals, setMandals] = useState([]);
  const [mandalId, setMandalId] = useState("");

  const [villages, setVillages] = useState([]);
  const [villageId, setVillageId] = useState("");

  const [habitations, setHabitations] = useState([]);
  const [habitationId, setHabitationId] = useState("");



  /* ================= LOAD CONSTITUENCIES ================= */

  useEffect(() => {
    fetchConstituencies();
  }, []);

  const fetchConstituencies = async () => {
    try {
      const res = await getAllConstituencies();

      if (res?.success) {
        setConstituencies(res.data || []);
      }
    } catch (err) {
      console.error(err);
    }
  };



  /* ================= CASCADING ================= */

  // Constituency → Mandal
  useEffect(() => {

    if (constituencyId) {
      fetchMandals(constituencyId);
    }

    setMandals([]);
    setMandalId("");

    setVillages([]);
    setVillageId("");

    setHabitations([]);
    setHabitationId("");

  }, [constituencyId]);


  // Mandal → Village
  useEffect(() => {

    if (mandalId) {
      fetchVillages(mandalId);
    }

    setVillages([]);
    setVillageId("");

    setHabitations([]);
    setHabitationId("");

  }, [mandalId]);


  // Village → Habitation
  useEffect(() => {

    if (villageId) {
      fetchHabitations(villageId);
    }

    setHabitations([]);
    setHabitationId("");

  }, [villageId]);



  /* ================= FETCHERS ================= */

  const fetchMandals = async (id) => {
    try {
      const res = await GetAllMandalsByConstituencyId(id);

      if (res?.success) setMandals(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };


  const fetchVillages = async (id) => {
    try {
      const res = await GetAllVillagesByMandalId(id);

      if (res?.success) setVillages(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };


  const fetchHabitations = async (id) => {
    try {
      const res = await GetAllHabitationsByVillageId(id);

      if (res?.success) setHabitations(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };



  /* ================= FETCH EVENTS ================= */

  const fetchEvents = async () => {

    setLoading(true);

    try {

      const res = await getAllEvents({
        page,
        limit,
        title,
        status,

        constituency_id: constituencyId,
        mandal_id: mandalId,
        village_id: villageId,
        habitation_id: habitationId,
      });

      if (res?.success) {
        setEvents(res.data || []);
        setTotalPages(res.totalPages || 1);
      }

    } catch (err) {
      console.error(err);

    } finally {
      setLoading(false);
    }
  };



  /* ================= DEBOUNCE ================= */

  useEffect(() => {

    const timer = setTimeout(() => {
      fetchEvents();
    }, 400);

    return () => clearTimeout(timer);

  }, [
    title,
    status,
    page,
    constituencyId,
    mandalId,
    villageId,
    habitationId,
  ]);



  /* ================= RESET PAGE ================= */

  useEffect(() => {
    setPage(1);
  }, [
    title,
    status,
    constituencyId,
    mandalId,
    villageId,
    habitationId,
  ]);



  /* ================= RESET ================= */

  const resetFilters = () => {

    setTitle("");
    setStatus("");

    setConstituencyId("");
    setMandalId("");
    setVillageId("");
    setHabitationId("");

    setMandals([]);
    setVillages([]);
    setHabitations([]);

    setPage(1);

    fetchEvents();
  };



  /* ================= EXPORT ================= */

  return {

    events,
    loading,

    page,
    totalPages,
    setPage,

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
  };
}

import axios from "axios";

const EVENTS_BASE_URL = "http://localhost:8189/canban_core/api/v1/events";

class EventService {

    getEvents() {
        return axios.get(EVENTS_BASE_URL);
    }

    createEvent(Event) {
        return axios.post(EVENTS_BASE_URL, Event);
    }

    getEventById(EventId) {
        return axios.get(EVENTS_BASE_URL + '/' + EventId);
    }

    updateEvent(Event, EventId) {
        return axios.put(EVENTS_BASE_URL + '/' + EventId, Event)
    }

    deleteEvent(EventId) {
        return axios.delete(EVENTS_BASE_URL + '/' + EventId);
    }
}

export default new EventService()
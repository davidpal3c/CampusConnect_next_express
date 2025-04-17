export const useGoogleCalendar = () => {
  const accessToken = localStorage.getItem("googleAccessToken");

  const addEvent = async (eventData: any) => {
    if (!accessToken) {
      console.error("No Google access token found.");
      throw new Error("Please sign in with Google first.");
    }

    const res = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Google Calendar API Error:", data);
      throw new Error(data.error?.message || "Failed to add event.");
    }

    return data;
  };

  return { addEvent };
};

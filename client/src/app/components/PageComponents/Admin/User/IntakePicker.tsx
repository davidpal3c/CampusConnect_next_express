import { useState, useEffect } from "react";

const seasons = ["Winter", "Spring/Summer", "Fall"];
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const years = Array.from({ length: 7 }, (_, i) => currentYear - 4 + i);

// Determine current season based on scholar system
export const getCurrentSeason = () => {
  if (currentMonth < 4) return "Winter"; // Jan - Apr
  if (currentMonth < 8) return "Spring/Summer"; // May - Aug
  return "Fall"; // Sep - Dec
};

export default function IntakePicker({ onIntakeChange }: { onIntakeChange: (year: number, season: string, status: string) => void }) {
  const [intake, setIntake] = useState({
    year: currentYear,
    season: getCurrentSeason(),
    status: "Active",
  });

  // Function to update the intake state
  const updateIntake = (newYear: number, newSeason: string) => {
    const isFuture =
      newYear > currentYear ||
      (newYear === currentYear && seasons.indexOf(newSeason) > seasons.indexOf(getCurrentSeason()));

    setIntake({
      year: newYear,
      season: newSeason,
      status: isFuture ? "Prospective" : "Active",
    });
  };

  // Effect to call `onIntakeChange` whenever intake state changes
  useEffect(() => {
    onIntakeChange(intake.year, intake.season, intake.status);
  }, [intake, onIntakeChange]);

  return (
    <div className="flex flex-wrap gap-6 w-full">
      {/* Year Picker */}
      <div className="flex-1 min-w-[100px] sm:w-full md:w-1/3">
        <label className="text-sm font-light text-saitBlack" htmlFor="yearPicker">
          Select Year *
        </label>
        <select
          id="yearPicker"
          className="font-light w-full p-2 mb-3 border border-gray-300 mt-1 rounded-md focus:outline-none focus:ring-1 focus:ring-saitBlue focus:border-transparent"
          value={intake.year}
          onChange={(e) => updateIntake(Number(e.target.value), intake.season)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Season Picker */}
      <div className="flex-1 min-w-[100px] sm:w-full md:w-1/3">
        <label className="text-sm font-light text-saitBlack" htmlFor="seasonPicker">
          Select Season *
        </label>
        <select
          id="seasonPicker"
          className="font-light w-full p-2 mb-3 border border-gray-300 mt-1 rounded-md focus:outline-none focus:ring-1 focus:ring-saitBlue focus:border-transparent"
          value={intake.season}
          onChange={(e) => updateIntake(intake.year, e.target.value)}
        >
          {seasons.map((season) => (
            <option key={season} value={season}>
              {season}
            </option>
          ))}
        </select>
      </div>

      {/* Status Display */}
      <div className="flex-1 min-w-[100px] sm:w-full md:w-1/3">
        <label className="text-sm font-light text-saitBlack" htmlFor="status">
          Status
        </label>
        <select
          id="status"
          className="font-light w-full p-2 mb-3 border border-gray-300 mt-1 rounded-md focus:outline-none focus:ring-1 focus:ring-saitBlue focus:border-transparent"
          value={intake.status}
          onChange={(e) => setIntake({ ...intake, status: e.target.value })} 
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Prospective">Prospective</option>
        </select>
      </div>
    </div>
  );
}

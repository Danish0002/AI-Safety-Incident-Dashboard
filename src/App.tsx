import { useState } from "react";
import { IncidentList } from "./components/IncidentList";
import { IncidentForm } from "./components/IncidentForm";
import { Incident } from "./types";

const initialIncidents: Incident[] = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics...",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z",
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description: "LLM provided incorrect safety procedure information...",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z",
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description: "Chatbot inadvertently exposed non-sensitive user metadata...",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z",
  },
];

export default function App() {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [filter, setFilter] = useState<"All" | "Low" | "Medium" | "High">("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const handleAddIncident = (incident: Incident) => {
    setIncidents((prev) => [incident, ...prev]);
  };

  const filteredIncidents = incidents
    .filter((incident) => filter === "All" || incident.severity === filter)
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime();
      } else {
        return new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime();
      }
    });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 
              
              transform hover:scale-103 transition duration-300 ease-in-out">
  AI Safety Incident Dashboard
</h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dashboard Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-all duration-500 ease-in-out">
            <div className="flex justify-between items-center mb-6">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as "All" | "Low" | "Medium" | "High")}
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
              >
                <option value="All">All Severities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            <IncidentList incidents={filteredIncidents} />
          </div>

          {/* Form Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-all duration-500 ease-in-out">
            <IncidentForm onAddIncident={handleAddIncident} />
          </div>
        </div>
      </div>
    </div>
  );
}

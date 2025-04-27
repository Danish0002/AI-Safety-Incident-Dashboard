import { useState } from "react";
import { Incident } from "../types";

type Props = {
  onAddIncident: (incident: Incident) => void;
};

export const IncidentForm = ({ onAddIncident }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<"Low" | "Medium" | "High">("Low");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please fill all fields!");
      return;
    }

    const newIncident: Incident = {
      id: Date.now(),
      title,
      description,
      severity,
      reported_at: new Date().toISOString(),
    };
    onAddIncident(newIncident);

    // Reset form
    setTitle("");
    setDescription("");
    setSeverity("Low");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4"> Report New Incident</h2>

      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Severity</label>
        <select
          className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          value={severity}
          onChange={(e) => setSeverity(e.target.value as "Low" | "Medium" | "High")}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all duration-300"
      >
        Submit
      </button>
    </form>
  );
};

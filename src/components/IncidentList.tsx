import { useState } from "react";
import { Incident } from "../types";
import { motion } from "framer-motion";

type Props = {
  incidents: Incident[];
};

export const IncidentList = ({ incidents }: Props) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleDescription = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {incidents.map((incident) => (
        <div
          key={incident.id}
          className="border p-4 rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{incident.title}</h2>
              <p className="text-sm text-gray-500">
                {new Date(incident.reported_at).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold transform transition-all duration-300 ease-in-out ${
                  incident.severity === "High"
                    ? "bg-gradient-to-r from-red-400 to-red-600 text-white scale-110"
                    : incident.severity === "Medium"
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white scale-110"
                    : "bg-gradient-to-r from-green-400 to-green-600 text-white scale-110"
                }`}
              >
                {incident.severity}
              </span>
            </div>
          </div>

          <button
            onClick={() => toggleDescription(incident.id)}
            className="text-blue-500 mt-2 hover:underline text-sm"
          >
            {expandedId === incident.id ? "Hide Details" : "View Details"}
          </button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: expandedId === incident.id ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-gray-700"
          >
            {expandedId === incident.id && <p>{incident.description}</p>}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

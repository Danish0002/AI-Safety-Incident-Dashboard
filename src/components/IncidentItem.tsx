import { Incident } from "../types";
import '../App.css';

type Props = {
  incident: Incident;
  expanded: boolean;
  toggleExpand: (id: number) => void;
};

const IncidentItem = ({ incident, expanded, toggleExpand }: Props) => {
  return (
    <li className="border p-4 rounded shadow hover:bg-gray-50 transition">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-lg font-semibold">{incident.title}</h3>
          <p className="text-sm text-gray-600">
            Severity: <span className={`font-bold text-${incident.severity.toLowerCase() === "high" ? "red" : incident.severity.toLowerCase() === "medium" ? "yellow" : "green"}-500`}>
              {incident.severity}
            </span>
          </p>
          <p className="text-sm text-gray-500">Reported: {new Date(incident.reported_at).toLocaleString()}</p>
        </div>
        <button className="text-blue-600 underline" onClick={() => toggleExpand(incident.id)}>
          {expanded ? "Hide Details" : "View Details"}
        </button>
      </div>
      {expanded && <p className="text-gray-700">{incident.description}</p>}
    </li>
  );
};

export default IncidentItem;

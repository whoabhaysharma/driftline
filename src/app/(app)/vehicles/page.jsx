"use client"
import { Switch } from "@/components/ui/switch"; // Import Shadcn Switch component

// Dummy data for vehicles
const vehicles = [
  { id: 1, number: 'ABC-1234', contactEnabled: true },
  { id: 2, number: 'XYZ-5678', contactEnabled: false },
  { id: 3, number: 'LMN-9101', contactEnabled: true },
  { id: 4, number: 'PQR-1121', contactEnabled: false },
];

export default function List() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-4">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between"
          >
            {/* Vehicle Number (Main Focus) */}
            <h2 className="text-xl font-semibold text-gray-800">
              {vehicle.number}
            </h2>

            {/* Toggle Button for Contact Permission */}
            <div className="flex items-center space-x-2">
              <Switch
                id={`contact-toggle-${vehicle.id}`}
                checked={vehicle.contactEnabled}
                onCheckedChange={(checked) => {
                  console.log(`Contact for ${vehicle.number} is now ${checked ? "enabled" : "disabled"}`);
                  // Add your logic to update the state (e.g., API call or state management)
                }}
              />
              <label
                htmlFor={`contact-toggle-${vehicle.id}`}
                className="text-sm text-gray-600"
              >
                {vehicle.contactEnabled ? "Enabled" : "Disabled"}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
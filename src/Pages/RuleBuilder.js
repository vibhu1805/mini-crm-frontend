import React, { useState } from "react";
import axios from "axios";

const fields = ["spend", "visits", "inactiveDays"];
const operators = [">", "<", ">=", "<=", "==", "!="];

const RuleBuilder = ({ onSegmentSaved }) => {
  const [rules, setRules] = useState([{ field: "spend", operator: ">", value: "" }]);
  const [audienceSize, setAudienceSize] = useState(null);

  const handleRuleChange = (index, key, value) => {
    const updated = [...rules];
    updated[index][key] = value;
    setRules(updated);
  };

  const addRule = () => {
    setRules([...rules, { field: "spend", operator: ">", value: "" }]);
  };

  const previewAudience = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/audience/preview", { rules });
      setAudienceSize(res.data.audienceSize);
    } catch (err) {
      alert("Error fetching audience size");
    }
  };

  const saveSegment = async () => {
    try {
      await axios.post("http://localhost:5000/api/campaigns", { rules });
      alert("Segment saved!");
      onSegmentSaved();
    } catch (err) {
      alert("Error saving segment");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Define Audience Segment</h2>
      {rules.map((rule, idx) => (
        <div key={idx} className="flex space-x-2 mb-2">
          <select
            value={rule.field}
            onChange={(e) => handleRuleChange(idx, "field", e.target.value)}
            className="border p-1"
          >
            {fields.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
          <select
            value={rule.operator}
            onChange={(e) => handleRuleChange(idx, "operator", e.target.value)}
            className="border p-1"
          >
            {operators.map((op) => (
              <option key={op} value={op}>{op}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Value"
            value={rule.value}
            onChange={(e) => handleRuleChange(idx, "value", e.target.value)}
            className="border p-1"
          />
        </div>
      ))}
      <button onClick={addRule} className="bg-gray-300 px-3 py-1 rounded mr-2">+ Add Rule</button>
      <button onClick={previewAudience} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Preview Audience</button>
      <button onClick={saveSegment} className="bg-green-600 text-white px-3 py-1 rounded">Save Segment</button>

      {audienceSize !== null && (
        <p className="mt-4 text-lg font-semibold">Audience Size: {audienceSize}</p>
      )}
    </div>
  );
};

export default RuleBuilder;

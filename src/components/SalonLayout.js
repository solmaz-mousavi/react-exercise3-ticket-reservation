import React from "react";
import "./salonLayout.css";

export default function SalonLayout({ chairs, statusHandler }) {
  const sections = ["B", "A", "C", "D"];

  return (
    <div className="salon-layout">
      {sections.map((sect) => (
        <div className="section" key={sect}>
          {chairs
            .filter((item) => item.section === sect)
            .map((chair) => (
              <button
                className={`chair ${chair.state}`}
                title={chair.price}
                onClick={(event) => statusHandler(event, chair.number)}
                key={chair.number}
              >
                {chair.number}
              </button>
            ))}
        </div>
      ))}
    </div>
  );
}

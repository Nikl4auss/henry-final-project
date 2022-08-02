import { useState } from "react";
import { FaStar } from "react-icons/fa";

function Stars({ score, setScore, starstype }) {
  const [hoverValue, setHoverValue] = useState(0);

  const scores = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center justify-start gap-3">
      {scores.map((value, inx) =>
        starstype === "dynamic" ? (
          <FaStar
            key={inx}
            size={14}
            onClick={() => setScore(value)}
            onMouseOver={() => setHoverValue(value)}
            onMouseLeave={() => setHoverValue(0)}
            //   color={(hoverValue || value) > inx ? colors.orange : colors.grey}
            className={`${
              score > inx
                ? "text-orange-300"
                : hoverValue > inx
                ? "text-orange-200"
                : "text-gray-400"
            } cursor-pointer`}
          />
        ) : (
          <FaStar
            key={inx}
            size={14}
            className={`${score > inx ? "text-orange-300" : "text-gray-400"}`}
          />
        )
      )}
    </div>
  );
}

export default Stars;

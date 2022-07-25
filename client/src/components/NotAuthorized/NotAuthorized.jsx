import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotAuthorized() {
  const [timer, setTimer] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timer === 0) {
    navigate("/home");
  }
  return (
    <div>
      You are not authorized to use that page, redirecting to home in {timer}
    </div>
  );
}

export default NotAuthorized;

const WindowResizeExample = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    console.log("Window resize listener added");
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      console.log("Window resize cleanup - removing listener");
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="example-box">
      {" "}
      <h3>Example 2: Window Resize Listener</h3>{" "}
      <p>
        {" "}
        Window size: {windowSize.width} x {windowSize.height}{" "}
      </p>{" "}
      <p className="example-note">
        {" "}
        💡 Try resizing your browser window to see updates. Cleanup removes
        listener on unmount.{" "}
      </p>{" "}
    </div>
  );
};
const EventListenerExample = () => {
  const [keyPress, setKeyPress] = useState("Press any key...");
  useEffect(() => {
    console.log("⌨️ Keyboard listener added");
    const handleKeyPress = (e) => {
      setKeyPress(`You pressed: ${e.key}`);
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      console.log("🧹 Keyboard listener cleanup - removing listener");
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  return (
    <div className="example-box">
      {" "}
      <h3>Example 3: Keyboard Event Listener</h3> <p>{keyPress}</p>{" "}
      <p className="example-note">
        {" "}
        💡 Try pressing keys. Cleanup removes listener to prevent memory leaks.{" "}
      </p>{" "}
    </div>
  );
};
const ApiCallExample = () => {
  const [data, setData] = useState("Loading...");
  const [requestId, setRequestId] = useState(0);
  useEffect(() => {
    console.log("🌐 API call started");
    let isCancelled = false;
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (!isCancelled) {
          setData("Data loaded successfully!");
          console.log("✅ API call completed");
        } else {
          console.log("❌ API call was cancelled");
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Error:", error);
        }
      }
    };
    fetchData();
    return () => {
      console.log("🧹 API cleanup - cancelling request");
      isCancelled = true;
    };
  }, [requestId]);
  return (
    <div className="example-box">
      {" "}
      <h3>Example 4: API Call Cancellation</h3> <p>{data}</p>{" "}
      <button onClick={() => setRequestId(requestId + 1)}>
        {" "}
        Trigger New Request{" "}
      </button>{" "}
      <p className="example-note">
        {" "}
        💡 Click the button before 2 seconds. Cleanup cancels the previous
        request.{" "}
      </p>{" "}
    </div>
  );
};
const IntervalExample = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  useEffect(() => {
    console.log("🔄 Multiple intervals started");
    const interval1 = setInterval(() => {
      setSeconds((prev) => {
        if (prev >= 59) {
          setMinutes((min) => min + 1);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    const interval2 = setInterval(() => {
      console.log("⏳ Second interval running...");
    }, 2000);
    return () => {
      console.log("🧹 Intervals cleanup - clearing all intervals");
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);
  return (
    <div className="example-box">
      {" "}
      <h3>Example 5: Multiple Intervals</h3>{" "}
      <p>
        {" "}
        Time: {minutes}:{seconds.toString().padStart(2, "0")}{" "}
      </p>{" "}
      <p className="example-note">
        {" "}
        Watch console. Cleanup clears both intervals when component unmounts.{" "}
      </p>{" "}
    </div>
  );
};
const ConditionalCleanupExample = ({ count }) => {
  useEffect(() => {
    console.log("Effect runs with count:", count);
    return () => {
      console.log("🧹 Cleanup for count:", count);
    };
  }, [count]);
  return (
    <div className="example-box">
      {" "}
      <h3>Example 6: Cleanup with Dependencies</h3> <p>Count: {count}</p>{" "}
      <p className="example-note">
        {" "}
        💡 Watch console. Cleanup runs BEFORE effect re-runs with new count
        value.{" "}
      </p>{" "}
    </div>
  );
};

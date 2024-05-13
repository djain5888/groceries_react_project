import React, { useRef, useLayoutEffect, useState } from "react";
import TitleBar from "../src/Components/TitleBar/titlebar"; // Import your TitleBar component

const Layout = ({ children }) => {
  // Define a ref to the TitleBar component
  const titleBarRef = useRef(null);
  
  // State variable to store the calculated marginTop value
  const [marginTop, setMarginTop] = useState(0);

  // UseLayoutEffect to calculate the height of the TitleBar component after DOM updates
  useLayoutEffect(() => {
    // Check if the titleBarRef.current value is available
    if (titleBarRef.current) {
      // Get the height of the TitleBar component
      const titleBarHeight = titleBarRef.current.clientHeight;
      // Update the state variable with the calculated height
      setMarginTop(titleBarHeight+5);
      console.log('titleBarHeight',titleBarHeight)
    }
  }, [titleBarRef]); // Depend on titleBarRef to recalculate when it changes

  return (
    <div>
      {/* Attach the ref to the TitleBar component */}
      <TitleBar ref={titleBarRef} /> {/* Display TitleBar component */}
      {/* Apply marginTop to create space below the title bar */}
      <div className="content" style={{ marginTop: `${marginTop}px` }}>
        {children}
      </div> {/* Render child components */}
    </div>
  );
};

export default Layout;

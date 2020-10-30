import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import SidePanel from '../../components/SidePanel/SidePanel';
import ChatRoom from '../../components/ChatRoom/ChatRoom';

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

function Logined(props) {
  const size = useWindowSize();
  const [showLeft, setShowLeft] = useState(true);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (size.width < 600) {
      setShowLeft(false);
      setMobile(true);
    } else {
      setShowLeft(true);
      setMobile(false);
    }
  }, [size]);

  const handleClick = () => {
    setShowLeft(!showLeft);
  }
  return (
    <Router>
      <div className={`panel-container ${mobile ? "noFlex" : ""}`}>
        <div className={`panel-left ${showLeft ? "show" : "hide"} ${mobile ? "panel-left-mobile" : ""}`}>
          <SidePanel user={props.user} mobile={mobile} onClick={handleClick} />
        </div>
        <div className="panel-right">
          <Switch>
            <Route path="/:id" children={<ChatRoom onClick={handleClick} showLeft={showLeft} />} />
            <Redirect to="/general" />
          </Switch>
        </div>
      </div>
    </Router>
  )

}
export default Logined;
import React, { useContext } from "react";
import Welcome from "../partials/WelcomeSection";
import { Store } from "../utils/Store";

const Home = () => {
  const { state, dispatch } = useContext(Store);
  const { myVar } = state;
  return (
    <>
    {/* {myVar} */}
      <Welcome />
    </>
  );
};

export default Home;

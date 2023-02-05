import { Helmet } from "react-helmet";
import { useContext } from "react";
import { AppContext } from "../AppContext";
export const PageInfo = () => {
  const { appTitle } = useContext(AppContext);
  return (
    <div className="page pageInfo">
      <Helmet>
        <title>{appTitle} - Info</title>
      </Helmet>
      <p>This is the info page.</p>
    </div>
  );
};

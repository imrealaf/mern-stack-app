import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

export default (shouldReset: boolean = false) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (shouldReset) {
      history.push({
        pathname: location.pathname,
        search: undefined
      });
    }
  }, []);
};

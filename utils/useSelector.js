import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../utils/contexts";
import shallowEqual from "./shallow-equal";

export default (selector, props) => {
  const { store } = useContext(StoreContext);
  const [selectedState, setSelectedState] = useState(
    selector(store.getState(), props)
  );

  useEffect(() => {
    let isSubscribed = true;

    const updateSelected = () => {
      if (isSubscribed) {
        setSelectedState((selectedState) => {
          const newSelectedState = selector(store.getState(), props);

          if (shallowEqual(selectedState, newSelectedState)) {
            return selectedState;
          }

          return newSelectedState;
        });
      }
    };

    updateSelected();

    const unsubscribe = store.subscribe(updateSelected);

    return () => {
      unsubscribe();

      isSubscribed = false;
    };
  }, [selector, store, props]);

  return selectedState;
};

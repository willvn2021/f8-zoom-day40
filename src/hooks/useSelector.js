import { useEffect, useState } from "react";
import store from "../store/store";

function useSelector(selector) {
    const [state, setState] = useState(() => {
        return selector(store.getState());
    });

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setState(selector(store.getState()));
            console.log(store.getState());
        });

        return unsubscribe;
    }, [selector]);

    return state;
}

export default useSelector;

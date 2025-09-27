import store from "../store/store";

function useDispatch() {
    return store.dispatch;
}

export default useDispatch;

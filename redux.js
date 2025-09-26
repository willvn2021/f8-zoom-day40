const { createStore } = Redux;

// Bước 1: Tạo init State
const initState = 0;

// Bước 2: Tạo Reducer
function reducer(state, action) {
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        case "RESET":
            return 0;
        default:
            return state;
    }
}

// Bước 3: Tạo Store
const store = Redux.createStore(reducer, initState);

//  - store.dispatch(action): Bắn đi action tới reducer
//  - store.getState(): Trả về State hiện tại
//  - store.subscribe(listener): Đăng ký trả về callback biết giá trị State mới

// DOM
const counterValue = document.getElementById("counter-value");
const increase = document.getElementById("increase");
const decrease = document.getElementById("decrease");
const reset = document.getElementById("reset");
const unsubscribe = document.getElementById("unsubscribe");

// Event +  Store dispatch
increase.addEventListener("click", () => {
    store.dispatch({ type: "INCREMENT" });
});

decrease.addEventListener("click", () => {
    store.dispatch({ type: "DECREMENT" });
});

reset.addEventListener("click", () => {
    store.dispatch({ type: "RESET" });
});

unsubscribe.addEventListener("click", () => {
    unsubscribeStore();
});

// Render UI
const render = () => {
    counterValue.innerText = store.getState();
};
render();

// Bước 4: Subscribe lắng nghe thay đổi của State sau đó Re-render giao diện
const unsubscribeStore = store.subscribe(render);

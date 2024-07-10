import { useState } from 'react';

const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);

    const toggle = () => setState((prev) => !prev);

    return [state, toggle];
};

export default useToggle;
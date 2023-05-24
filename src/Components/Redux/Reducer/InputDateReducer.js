const initialState = {
    name: '',
    birthDate: '',
    smallCakes: 0,
    largeCakes: 0,
    tableData: [],
    cakeSize: []
}

const InputDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_NAME':
            return { ...state, name: action.payload }

        case 'UPDATE_BIRTHDATE':
            return { ...state, birthDate: action.payload }

        case 'UPDATE_TABLE':
            return { ...state, tableData: [...state.tableData, action.payload] }

        case 'UPDATE_CAKE_SIZE':
            return { ...state, cakeSize: [...state.cakeSize, action.payload] }

        case 'UPDATE_SMALL_CAKE_COUNT':
            return { ...state, smallCakes: action.payload }

        case 'UPDATE_LARGE_CAKE_COUNT':
            return { ...state, largeCakes: action.payload }

        default:
            return state
    }

}

export default InputDataReducer;
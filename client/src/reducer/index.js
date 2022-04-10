
const initialState = {
    dogs: [],
    allDog: [],
    temp: [],
    allTemp:[],
    params: []
}


function rootReducer(state = initialState, action) {
    switch (action.type) {

        //peticiones

        case 'GET_DOG':            
            return {
                ...state,
                dogs: action.payload,
                allDog: action.payload
            };
        case 'GET_TEMP':
            return {
                ...state,
                temp: action.payload,
                allTemp: action.payload
            };

        case 'GET_PARAMS':
            return {
                ...state,
                params: action.payload
            }

        //filtros
        case 'FILTER_CREATED':
            const createFilter = state.allDog
            const filterCreated = action.payload === 'created' ? createFilter.filter(el => el.createdInDb) : action.payload === "api" ? createFilter.filter(el => !el.createdInDb): createFilter;
            return {
                ...state,
                dogs: filterCreated
            };

        case 'FILTER_TEMP':
            const filterTemp = state.allDog;
            const tempFilter = action.payload === 'All' ? filterTemp : filterTemp.filter(e => {
                if (typeof e.temperament === 'string') return e.temperament.includes(action.payload);
                if (Array.isArray(e.temperament)) {
                    let temps = e.temperament.map((e) => e.name);
                    return temps.includes(action.payload);
                }
                return true
            })
            return {
                ...state,
                dogs: tempFilter
            };
        //ordenamiento
        case 'ORDER_BY_NAME':
            const sortedArr = action.payload === 'asc' ?
                state.dogs.sort(function (a, b) {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                }) : state.dogs.sort(function (a, b) {
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                })
            return {
                ...state,
                dogs: sortedArr

            }


        case 'ORDER_BY_WEIGHT':
            const orden = action.payload === 'weight' ?
                state.dogs.sort(function (a, b) {
                    if (a.weight_min > b.weight_max) return 1;
                    if (a.weight_min < b.weight_max) return -1;
                    return 0;
                }) : state.dogs.sort(function (a, b) {
                    if (a.weight_max > b.weight_max) return -1;
                    if (a.weight_max < b.weight_max) return 1;
                    return 0;
                })

            return {
                ...state,
                dogs: orden

            }
        //BUSCADOR
        case 'GET_SEARCH':
            return {
                ...state,
                dogs: action.payload
            }

        //post

        case 'POST_DOG':
            return {
                ...state,
            }

            case "RESET":
                return {
                    ...state,
                    params:[]
                }               
                
                case 'DELETED':
                    return {
                        ...state,
                        dogs: action.payload
                    }

        default:
            return state
    }
}
export default rootReducer;
import axios from 'axios';


// peticiones
export function getDogs(payload) {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/dogs")
    return dispatch({
      type: "GET_DOG",
      payload: json.data
    })
  };
}


export function getSearch(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/dogs?name=${name}`)
      return dispatch({
        type: "GET_SEARCH",
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }

  }
}

export function getTemp(payload) {
  return async function (dispatch) {
    let jsons = await axios.get('http://localhost:3001/temperaments')
    return dispatch({
      type: "GET_TEMP",
      payload: jsons.data
    })
  }
}

export function postDog(payload) {
  return async function (dispatch) {
    let response = await axios.post('http://localhost:3001/dog', payload);
    return response
  }


}

//filter

export function filterCreated(payload) {
  return {
    type: 'FILTER_CREATED',
    payload
  }
}


export function filterTemp(payload) {
  return {
    type: 'FILTER_TEMP',
    payload
  }
}

//order 

export function orderByName(payload) {
  return {
    type: 'ORDER_BY_NAME',
    payload
  }
}

export function orderByWeight(payload) {
  return {
    type: 'ORDER_BY_WEIGHT',
    payload
  }
}

export function getParams(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/dogs/` + id)
      return dispatch({
        type: "GET_PARAMS",
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

//reset

export function reset(payload){
  return{
    type: 'RESET',
    payload
  }
};

export function deleted(id) {
  return async function (dispatch) {
    try {
      let json = await axios.delete(`http://localhost:3001/dogs/` + id)
      return dispatch({
        type: "DELETED",
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

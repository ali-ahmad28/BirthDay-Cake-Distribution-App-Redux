export const updateName = (name)=>{
    return{
        type:'UPDATE_NAME',
        payload:name
    }
}

export const updateBirthDate = (date)=>{
    return{
        type:'UPDATE_BIRTHDATE',
        payload:date
    }
}

export const updateTable = (data)=>{
    return{
        type:'UPDATE_TABLE',
        payload:data
    }
}

export const updateCakeSize = (data)=>{
    return{
        type:'UPDATE_CAKE_SIZE',
        payload:data
    }
}

export const updateSmallCakeCount = (data)=>{
    return{
        type:'UPDATE_SMALL_CAKE_COUNT',
        payload:data
    }
}

export const updateLargeCakeCount = (data)=>{
    return{
        type:'UPDATE_LARGE_CAKE_COUNT',
        payload:data
    }
}
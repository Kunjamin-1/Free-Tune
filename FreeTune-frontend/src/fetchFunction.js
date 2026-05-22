export const fetchFunction = async (endPoints, methodType = "GET", data = null) => {
    
    let options = {
        method: methodType,
        headers: {
            Authorization:`Bearer ${localStorage.getItem("accessToken")}`
        },
        credentials: "include",
    }

    if (data && methodType !== "GET") {
        if (data instanceof FormData) {
            options.body = data;

        } else {
            options.headers["Content-Type"] = "application/json";
            options.body = JSON.stringify(data);    
        }
    }

    // const request = await fetch(`https://free-tune-backend.onrender.com/api/v1/${endPoints}`, options)
    const request = await fetch(` http://localhost:3000/api/v1/${endPoints}`, options)
  
    const response = await request.json()
    console.log(response)
    return response

}


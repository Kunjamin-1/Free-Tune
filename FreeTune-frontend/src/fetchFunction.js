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

    const request = await fetch(`http://localhost:3000/api/v1/${endPoints}`, options)

    if (!request.ok) {
        console.log(`Error occured${request.message?`:- ${request.message}`:"!"}` )
    }
    const response = await request.json()

    return response

}


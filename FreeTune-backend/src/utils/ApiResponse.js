class ApiResponse {
    constructor(statusCode,body,message="successful",success = true) {
        this.success = success
        this.statusCode=statusCode
        this.body=body
        this.message=message
    }
}

export default ApiResponse
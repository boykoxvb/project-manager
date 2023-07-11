export default class ApiError extends Error {
    public status: number
    public errors: Array<any> | undefined

    public constructor(status: number, message: string, errors?: Array<Error>) {
        super(message)
        this.status = status
        this.errors = errors
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static BadRequrest(message: string, errors?: Array<any>) {
        return new ApiError(400, message, errors)
    }

    static BadUser(message: string, errors?: Array<Error>) {
        return new ApiError(404, message, errors)
    }

    static NotFound(message: string, errors?: Array<Error>) {
        return new ApiError(404, message, errors)
    }
}

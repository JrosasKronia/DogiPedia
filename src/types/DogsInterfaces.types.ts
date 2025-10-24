export interface DogApiResponse {
    image: string;
    breed: string;
}
export interface ApiResponseSingle {
    message: string,
    status: string,
}

export interface ApiResponseMultiple {
    message: string[],
    status: string,
}
import type { ApiResponseMultiple, ApiResponseSingle, DogApiResponse } from "../types";

const API_URL = import.meta.env.VITE_DOG_API_URL;

export class dogApiService {
    static async getRadomDog(): Promise<DogApiResponse> {
        try {
            const response = await fetch(`${API_URL}/breeds/image/random`);
            const data: ApiResponseSingle = await response.json();
            return {
                image: data.message,
                breed: this.extractBreedFromUrl(data.message)
            }
        } catch (error) {
            console.error(error);
        }

        return { image: "", breed: "" };
    }

    static async getRandomDogs(numberOfDogs: number): Promise<DogApiResponse[]> {
        try {
            const response = await fetch(`${API_URL}/breeds/image/random/${numberOfDogs}`);
            const data: ApiResponseMultiple = await response.json();
            return data.message.map((url: string) => ({ image: url, breed: this.extractBreedFromUrl(url) }));
        } catch (error) {
            console.error(error);
        }

        return [];
    }

    static extractBreedFromUrl(url: string): string {
        const parts = url.split("/");
        const breedPart = parts[parts.length - 2];

        return breedPart ? breedPart.replace(/-/g, ' ') : '';
    }
}
export interface ErrorDTO {
    error: string;
}

export interface ValidationErrorDTO {
    [key: string]: {
        message: string;
    };
}

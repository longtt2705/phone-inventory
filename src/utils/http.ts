export const ErrorResponse = (message: string, code: number) => ({
    message,
    code,
    success: false
});

export const SuccessResponse = (data: any, message: string, code: number) => ({
    data,
    message,
    code,
    success: true
});
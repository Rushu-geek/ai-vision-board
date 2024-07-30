export type ServerActionResponse<T> = {
    status: number,
    success: boolean;
    data?: T | null;
    error?: unknown;
    msg?: string
};

export interface IJwtAcesstoken {
    email: string
}

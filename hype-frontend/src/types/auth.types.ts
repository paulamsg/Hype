export interface User {
    id: number
    name: string
    lastName: string
    username: string
    email: string
    location: string
    bio?: string
    avatarUrl?: string
}
export interface AuthResponse {
    message: string
    token: string
    user: User
}

export interface LoginForm {
    email: string
    password: string
}

export interface RegisterForm {
    name: string
    lastName: string
    email: string
    password: string
    location: string
}
export type TSignUpFormError ={
    // undefined, null아닌 경우에만(Optional setting) string배열 타입
    name?: string[];
    email?: string[];
    password?: string[];
}
import { userDTO, createUserDTO} from "../../src/types/user.types.js";
import {createUser} from "../../src/repositories/user.repository.js"
import {createUserService} from "../../src/services/user.service.js";
import {loginService} from "../../src/services/user.service.js"

export const createUserTest = (email: string, password: string): Promise<userDTO | null> =>{
    return createUser({ 
        email,
        password
    })  
} 

export const repoCreateUserToken = async () =>{
    const email = "edwar@gmail.com";
    const password = "123456789";

    await createUserService({ 
        email,
        password
    });
    
    return await loginService({
        email,
        password
    });
} 


export const apiCreateUserToken = async (email: string, password: string ) =>{
    await createUserService({ 
        email,
        password
    });
    
    return await loginService({
        email,
        password
    });
} 

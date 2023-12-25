import { IsNotEmpty, IsString } from "class-validator";
import { GenericResponseClass } from "src/shared/classes/generic-classes";

export class AuthClientsLoginDetailsDto{
    @IsString()
    @IsNotEmpty()
    userName: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class UserDetailsPayLoadDto{
    userId: string;
    username: string;
}
export class AuthTokenDto{
    token: string;
}

export class AuthClientsLoginResponseDto extends GenericResponseClass<AuthTokenDto>{
    constructor(data: AuthTokenDto){
        super(data)
    }
}

import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";
import { User } from "../entities/user.entity";



export const GetUser = createParamDecorator(
    (data:string, ctx:ExecutionContext) => {

        const req = ctx.switchToHttp().getRequest()
        const user:User = req.user

        if(!user)
            throw new InternalServerErrorException("User not found (request)")

        if(!data)
            return user

        return user[data]
    }
)
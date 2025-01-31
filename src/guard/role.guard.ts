/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ForbiddenRoleException } from "src/exception/role.exception";
import { UserService } from "src/user/user.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private userService: UserService) { }
    //A service that allows access to metadata attached to route handlers (such as the roles allowed to access a route)

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        //The roles variable retrieves the roles matadata attached to the route handler (the function that will handle the request).
        //console.log('roles',role);


        const request = context.switchToHttp().getRequest(); //The request object represents the incoming HTTP request. It contains information like headers, the current user, and other request-related data



        if (request?.user) {
            const Headers:Headers=request.headers;
            // eslint-disable-next-line prefer-const
            let user = this.userService.user(Headers);
            //The code fetches the request headers and calls the user.Service.user (headers) method to retrieve the current user's details, such as their role.


            if (!roles.includes((await user).role)) {
                throw new ForbiddenRoleException(roles.join('or'));

            }
            return true; //This line checks if the user's role (retrieved from the userService) is included in the list of roles allowed to access this route.

        }
        return false; 
        //This line checks if the user's role is not in the list, it throws a ForbiddenRoleXception, effectively denying access to the route
    }
}
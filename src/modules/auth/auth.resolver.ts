import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { appLog } from "src/context";

@Resolver()
export class AuthResolver {
	constructor(private readonly jwtService: JwtService) {}

	@Mutation(() => Boolean)
	verifyToken(
		@Args('token', { type: () => String })
		token: string,
	) {
		try {
			const userData = this.jwtService.verify(token);
			appLog.debug("userData", userData);
			return true;
		} catch (error) {
			appLog.error(error);
			return false;
		}
	}
}

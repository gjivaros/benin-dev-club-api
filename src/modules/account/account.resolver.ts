import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { Account } from "./account.entity";
import { AccountService } from "./account.service";

@Resolver()
export class AccountResolver {
	constructor(private readonly accountService: AccountService) {}

	@Query(() => Account)
	async account(@Args('id', { type: () => ID }) id: string) {
		return await this.accountService.account(id);
	}
}

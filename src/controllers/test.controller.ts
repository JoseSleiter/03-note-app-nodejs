import { Get, Route, Controller } from 'tsoa';

@Route('Accounts')
export class AccountsController extends Controller {
    /** Get the current account */
    @Get('Current')
    public async current(): Promise<any> {
        return {
            id: 600,
            name: 'test',
        };
    }

    /** Get a list of users for the account */
    @Get('Users')
    public async getUsers(): Promise<any[]> {
        return [
            {
                createdAt: new Date(),
                email: 'test@test.com',
                id: 1,
            },
            {
                createdAt: new Date(),
                email: 'test2@test2.com',
                id: 2,
            },
        ];
    }
}
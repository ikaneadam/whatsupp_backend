import { User } from '../entity/User'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    public async getUser(Username: string): Promise<User> {
        const user = await this.findOne({ where: { username: Username } })

        return user
    }

    public async insertUser(Username: string): Promise<User> {
        const user = await this.insertUser(Username)

        return user
    }

    public async doesUserExist(Username: string): Promise<Boolean> {
        const user = await this.findOne({ where: { username: Username } })

        return user != undefined
    }

}

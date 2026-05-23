export class CreateUserDto {
    public readonly name: string;
    public readonly surname?: string;
    public readonly nickname?: string;
    public readonly accountId?: string;
}
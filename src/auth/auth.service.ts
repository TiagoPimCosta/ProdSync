import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from '../helpers/dtos/auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(authPayloadDto: AuthPayloadDto) {
    const user = await this.usersService.findOneByUsername(
      authPayloadDto.username,
    );
    if (!user || user.password !== authPayloadDto.password || !user.status)
      throw new UnauthorizedException('Wrong Credentials');
    const { password, ...data } = user;
    return { token: this.jwtService.sign(data) };
  }
}

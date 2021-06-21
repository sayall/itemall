import { Controller, Get } from '@nestjs/common';

@Controller()
export class staticController {
    @Get('static')
    getStatic() {
        return 'Hello, world!';
    }
}
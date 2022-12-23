import { Module } from '@nestjs/common';
import { DatabaseModule } from '@Infra/database/database.module';
import { HttpModule } from '@Infra/http/http.module';

@Module({
  imports: [HttpModule, DatabaseModule],
})
export class AppModule {}

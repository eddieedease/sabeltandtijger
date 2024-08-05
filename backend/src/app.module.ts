import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//
import { UsersController } from './users/users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './users/users.service';

import { TreeNodeController } from './treenode/treenode.controller';
import { TreeNode, TreeNodeSchema } from './schemas/treenode.schema';
import { TreeNodeService } from './treenode/treenode.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: TreeNode.name, schema: TreeNodeSchema }])
  ],
  controllers: [AppController, UsersController, TreeNodeController],
  providers: [AppService, UserService, TreeNodeService],
})
export class AppModule {}
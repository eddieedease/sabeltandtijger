import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TreeNodeService } from '../treenode/treenode.service';
import { TreeNode } from '../schemas/treenode.schema';

@Controller('tree-nodes')
export class TreeNodeController {
  constructor(private readonly treeNodeService: TreeNodeService) {}

  @Post()
  create(@Body() createTreeNodeDto: Partial<TreeNode>): Promise<TreeNode> {
    return this.treeNodeService.create(createTreeNodeDto);
  }

  @Get()
  findAll(): Promise<TreeNode[]> {
    return this.treeNodeService.findAll();
  }

  @Get('tree')
async getTree(): Promise<TreeNode[]> {
  return this.treeNodeService.getTree();
}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TreeNode> {
    return this.treeNodeService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTreeNodeDto: Partial<TreeNode>): Promise<TreeNode> {
    return this.treeNodeService.update(id, updateTreeNodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<TreeNode> {
    return this.treeNodeService.remove(id);
  }

  @Put(':parentId/add-child/:childId')
  addChild(@Param('parentId') parentId: string, @Param('childId') childId: string): Promise<TreeNode> {
    return this.treeNodeService.addChild(parentId, childId);
  }

  @Put(':parentId/remove-child/:childId')
  removeChild(@Param('parentId') parentId: string, @Param('childId') childId: string): Promise<TreeNode> {
    return this.treeNodeService.removeChild(parentId, childId);
  }
}
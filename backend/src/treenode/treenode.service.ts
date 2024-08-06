import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TreeNode } from '../schemas/treenode.schema';

@Injectable()
export class TreeNodeService {
  constructor(@InjectModel(TreeNode.name) private treeNodeModel: Model<TreeNode>) {}

  async create(createTreeNodeDto: Partial<TreeNode>): Promise<TreeNode> {
    const createdNode = new this.treeNodeModel(createTreeNodeDto);
    return createdNode.save();
  }

  async findAll(): Promise<TreeNode[]> {
    return this.treeNodeModel.find().exec();
  }

  async findOne(id: string): Promise<TreeNode> {
    const node = await this.treeNodeModel.findOne({ id }).exec();
    if (!node) {
      throw new NotFoundException(`TreeNode with ID "${id}" not found`);
    }
    return node;
  }

  async update(id: string, updateTreeNodeDto: Partial<TreeNode>): Promise<TreeNode> {
    const updatedNode = await this.treeNodeModel.findOneAndUpdate(
      { id },
      updateTreeNodeDto,
      { new: true }
    ).exec();
    if (!updatedNode) {
      throw new NotFoundException(`TreeNode with ID "${id}" not found`);
    }
    return updatedNode;
  }

  async remove(id: string): Promise<TreeNode> {
    const deletedNode = await this.treeNodeModel.findOneAndDelete({ id }).exec();
    if (!deletedNode) {
      throw new NotFoundException(`TreeNode with ID "${id}" not found`);
    }
    return deletedNode;
  }

  async addChild(parentId: string, childId: string): Promise<TreeNode> {
    const parent = await this.treeNodeModel.findOne({ id: parentId });
    const child = await this.treeNodeModel.findOne({ id: childId });
    
    if (!parent || !child) {
      throw new NotFoundException('Parent or child not found');
    }
  
    child.parentId = parentId;
    await child.save();
  
    if (!parent.children) {
      parent.children = [];
    }
    parent.children.push(child);
    return parent.save();
  }

  async removeChild(parentId: string, childId: string): Promise<TreeNode> {
    const parent = await this.treeNodeModel.findOne({ id: parentId });
    if (!parent) {
      throw new NotFoundException(`Parent with ID "${parentId}" not found`);
    }

    parent.children = parent.children.filter(child => child.id !== childId);
    return parent.save();
  }

  async getTree(): Promise<TreeNode[]> {
    return this.treeNodeModel.find({ parentId: null }).exec();
  }
}
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TreeNode } from '../schemas/treenode.schema';

@Injectable()
export class TreeNodeService {
  constructor(@InjectModel(TreeNode.name) private treeNodeModel: Model<TreeNode>) {}

  async create(createTreeNodeDto: Partial<TreeNode>): Promise<TreeNode> {
    const createdTreeNode = new this.treeNodeModel(createTreeNodeDto);
    return createdTreeNode.save();
  }

  async findAll(): Promise<TreeNode[]> {
    return this.treeNodeModel.find().exec();
  }

  async findOne(id: string): Promise<TreeNode> {
    return this.treeNodeModel.findOne({ id }).populate('children').exec();
  }

  async update(id: string, updateTreeNodeDto: Partial<TreeNode>): Promise<TreeNode> {
    return this.treeNodeModel.findOneAndUpdate({ id }, updateTreeNodeDto, { new: true }).exec();
  }

  async remove(id: string): Promise<TreeNode> {
    return this.treeNodeModel.findOneAndDelete({ id }).exec();
  }

  async addChild(parentId: string, childId: string): Promise<TreeNode> {
    return this.treeNodeModel.findOneAndUpdate(
      { id: parentId },
      { $push: { children: childId } },
      { new: true }
    ).exec();
  }

  async removeChild(parentId: string, childId: string): Promise<TreeNode> {
    return this.treeNodeModel.findOneAndUpdate(
      { id: parentId },
      { $pull: { children: childId } },
      { new: true }
    ).exec();
  }

  async getTree(): Promise<TreeNode[]> {
    return this.treeNodeModel.find({ parentId: null }).populate({
      path: 'children',
      populate: { path: 'children' }
    }).exec();
  }
}
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class TreeNode extends Document {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true, enum: ['chapter', 'section', 'subsection', 'content'] })
  type: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  content?: string;

  @Prop({ type: [{ type: Object }] })
  children: TreeNode[];

  @Prop({ default: false })
  expanded?: boolean;

  @Prop({ type: String, default: null })
  parentId: string | null;
}

export const TreeNodeSchema = SchemaFactory.createForClass(TreeNode);
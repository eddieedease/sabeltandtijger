import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { MarkdownModule } from 'ngx-markdown';
import { StoreService } from '../store.service';

interface TreeNode {
  id: string;
  type: 'chapter' | 'section' | 'subsection' | 'content';
  title: string;
  content?: string;
  children?: TreeNode[];
  expanded?: boolean;
  parentId?: string | undefined;  // Explicitly allow undefined
}

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [FormsModule, MarkdownModule, CommonModule, DragDropModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  treeData: TreeNode[] = [];
  markdownContent = '# Welcome to the E-learning Editor\n\nStart typing your content here...';
  title = '';
  description = '';
  selectedNode: TreeNode | null = null;

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.loadTree();
  }

  async loadTree() {
    console.log('Loading tree...');
    try {
      this.treeData = await this.storeService.getTree();
      console.log('Tree loaded:', this.treeData);
      if (this.treeData.length === 0) {
        console.log('Tree is empty. You may need to add some initial data.');
      }
    } catch (error) {
      console.error('Error loading tree:', error);
      // Optionally, set some default data for testing
      this.treeData = [
        { id: '1', title: 'Chapter 1', type: 'chapter' },
        { id: '2', title: 'Chapter 2', type: 'chapter' }
      ];
    }
  }

  getSectionLists(): string[] {
    return this.treeData.map((_, i) => `list-${i}`);
  }

  dropChapter(event: CdkDragDrop<TreeNode[]>) {
    moveItemInArray(this.treeData, event.previousIndex, event.currentIndex);
    this.updateTreeStructure();
  }

  dropSection(event: CdkDragDrop<TreeNode[] | undefined>, chapterIndex: number) {
    const chapter = this.treeData[chapterIndex];
    if (!chapter) return;

    if (!chapter.children) {
      chapter.children = [];
    }

    if (event.previousContainer !== event.container) {
      const sourceChapter = this.treeData.find(c => c.children === event.previousContainer.data);
      if (sourceChapter && sourceChapter.children) {
        transferArrayItem(
          sourceChapter.children,
          chapter.children,
          event.previousIndex,
          event.currentIndex
        );
        // Update parentId for the moved item
        const movedItem = chapter.children[event.currentIndex];
        if (movedItem) {
          movedItem.parentId = chapter.id;  // This is fine as chapter.id is a string
        }
      }
    }

    this.updateTreeStructure();
  }

  async updateTreeStructure() {
    for (const node of this.treeData) {
      await this.updateNode(node, undefined);  // Pass undefined for top-level nodes
      if (node.children) {
        for (const child of node.children) {
          await this.updateNode(child, node.id);
        }
      }
    }
  }

  private async updateNode(node: TreeNode, parentId?: string) {
    const updateData: Partial<TreeNode> = {
      title: node.title,
      type: node.type,
      content: node.content,
      parentId: parentId  // This will be undefined for top-level nodes
    };
    
  
    try {
      if (!node.id || node.id.includes('.')) {
        // Generate a new ID if it's invalid
        node.id = this.generateUniqueId();
      }
      const updatedNode = await this.storeService.updateTreeNode(node.id, updateData);
      console.log('Node updated:', updatedNode);
      // Update the node in the tree with the response from the server
      Object.assign(node, updatedNode);
    } catch (error) {
      console.error('Error updating node:', error);
    }
  }

  private generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }

  selectNode(node: TreeNode) {
    this.selectedNode = node;
    this.markdownContent = node.content || '';
    this.title = node.title;
  }

  async onContentChange() {
    if (this.selectedNode) {
      this.selectedNode.content = this.markdownContent;
      try {
        const updatedNode = await this.storeService.updateTreeNode(this.selectedNode.id, { 
          content: this.markdownContent,
          title: this.title
        });
        console.log('Content updated:', updatedNode);
      } catch (error) {
        console.error('Error updating content:', error);
      }
    }
  }

  async onTitleChange() {
    if (this.selectedNode) {
      this.selectedNode.title = this.title;
      try {
        const updatedNode = await this.storeService.updateTreeNode(this.selectedNode.id, { title: this.title });
        console.log('Title updated:', updatedNode);
      } catch (error) {
        console.error('Error updating title:', error);
      }
    }
  }
}
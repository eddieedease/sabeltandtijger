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
  parentId?: string;
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

  loadTree() {
    console.log('Loading tree...');
    this.storeService.getTree().subscribe(
      tree => {
        this.treeData = tree;
        console.log('Tree loaded:', tree);
        if (tree.length === 0) {
          console.log('Tree is empty. You may need to add some initial data.');
        }
      },
      error => {
        console.error('Error loading tree:', error);
        // Optionally, set some default data for testing
        this.treeData = [
          { id: '1', title: 'Chapter 1', type: 'chapter' },
          { id: '2', title: 'Chapter 2', type: 'chapter' }
        ];
      }
    );
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

    const sourceData = event.previousContainer.data || [];
    const targetData = event.container.data || [];

    if (event.previousContainer === event.container) {
      moveItemInArray(targetData, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        sourceData,
        targetData,
        event.previousIndex,
        event.currentIndex,
      );
    }

    chapter.children = targetData;

    if (event.previousContainer !== event.container) {
      const sourceChapterIndex = this.treeData.findIndex(c => c.children === sourceData);
      if (sourceChapterIndex !== -1) {
        this.treeData[sourceChapterIndex].children = sourceData;
      }
    }

    this.updateTreeStructure();
  }

  updateTreeStructure() {
    this.treeData.forEach((node, index) => {
      const updateData: Partial<TreeNode> = {
        title: node.title,
        type: node.type,
        content: node.content
      };
      // For top-level nodes, we don't send parentId at all
      this.storeService.updateTreeNode(node.id, updateData).subscribe(
        updatedNode => console.log('Node updated:', updatedNode),
        error => console.error('Error updating node:', error)
      );
      
      if (node.children) {
        node.children.forEach(child => {
          this.storeService.updateTreeNode(child.id, { 
            parentId: node.id,
            title: child.title,
            type: child.type,
            content: child.content
          }).subscribe(
            updatedChild => console.log('Child node updated:', updatedChild),
            error => console.error('Error updating child node:', error)
          );
        });
      }
    });
  }

  selectNode(node: TreeNode) {
    this.selectedNode = node;
    this.markdownContent = node.content || '';
    this.title = node.title;
  }

  onContentChange() {
    if (this.selectedNode) {
      this.selectedNode.content = this.markdownContent;
      this.storeService.updateTreeNode(this.selectedNode.id, { 
        content: this.markdownContent,
        title: this.title
      }).subscribe(
        updatedNode => console.log('Content updated:', updatedNode),
        error => console.error('Error updating content:', error)
      );
    }
  }

  onTitleChange() {
    if (this.selectedNode) {
      this.selectedNode.title = this.title;
      this.storeService.updateTreeNode(this.selectedNode.id, { title: this.title }).subscribe(
        updatedNode => console.log('Title updated:', updatedNode),
        error => console.error('Error updating title:', error)
      );
    }
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { MarkdownModule } from 'ngx-markdown';

interface TreeNode {
  id: number;
  name: string;
  children?: TreeNode[];
}

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [FormsModule, MarkdownModule,CommonModule, DragDropModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'] // Correct usage
})

export class EditorComponent {
  treeData: TreeNode[] = [
    { id: 1, name: 'Chapter 1', children: [
      { id: 2, name: 'Section 1.1' },
      { id: 3, name: 'Section 1.2' },
    ]},
    { id: 4, name: 'Chapter 2',
      children: [
        { id: 2, name: 'Section 2.1' },
        { id: 3, name: 'Section 2.2' },
      ]
     },
    { id: 5, name: 'Chapter 3' },
  ];

  markdownContent = '# Welcome to the E-learning Editor\n\nStart typing your content here...';
  title = '';
  description = '';

  // TreeNode functions
  // TreeNode functions
  // TreeNode functions
  // TreeNode functions
  getSectionLists(): string[] {
    return this.treeData.map((_, i) => `list-${i}`);
  }

  dropChapter(event: CdkDragDrop<TreeNode[]>) {
    moveItemInArray(this.treeData, event.previousIndex, event.currentIndex);
    this.renumberIds(this.treeData);
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

    // Update the chapter's children array
    chapter.children = targetData;

    // Update the source chapter's children array if it's different
    if (event.previousContainer !== event.container) {
      const sourceChapterIndex = this.treeData.findIndex(c => c.children === sourceData);
      if (sourceChapterIndex !== -1) {
        this.treeData[sourceChapterIndex].children = sourceData;
      }
    }

    this.renumberIds(this.treeData);
  }

  private renumberIds(nodes: TreeNode[], startId: number = 1): number {
    for (const node of nodes) {
      node.id = startId++;
      if (node.children) {
        startId = this.renumberIds(node.children, startId);
      }
    }
    return startId;
  }

  // For the markdown editor
  // For the markdown editor
  // For the markdown editor
  // For the markdown editor
  
  onContentChange() {
    // Handle content changes, e.g., auto-save
    console.log('Content changed');
  }
}

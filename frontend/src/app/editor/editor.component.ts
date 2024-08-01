import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
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
    { id: 4, name: 'Chapter 2' },
    { id: 5, name: 'Chapter 3' },
  ];

  markdownContent = '# Welcome to the E-learning Editor\n\nStart typing your content here...';
  title = '';
  description = '';

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.treeData, event.previousIndex, event.currentIndex);
  }

  onContentChange() {
    // Handle content changes, e.g., auto-save
    console.log('Content changed');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from './config';
import { Observable, lastValueFrom  } from 'rxjs';

interface User {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  age?: number;
}

interface TreeNode {
  id: string;
  type: 'chapter' | 'section' | 'subsection' | 'content';
  title: string;
  content?: string;
  children?: TreeNode[];
  expanded?: boolean;
  parentId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = config.apiUrl;

  constructor(private http: HttpClient) {}

  // User API calls
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/users/${id}`);
  }

  // TreeNode API calls
  createTreeNode(treeNode: Partial<TreeNode>): Observable<TreeNode> {
    return this.http.post<TreeNode>(`${this.apiUrl}/tree-nodes`, treeNode);
  }

  getTreeNodes(): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(`${this.apiUrl}/tree-nodes`);
  }

  async getTree(): Promise<TreeNode[]> {
    return lastValueFrom(this.http.get<TreeNode[]>(`${this.apiUrl}/tree-nodes/tree`));
  }

  getTreeNode(id: string): Observable<TreeNode> {
    return this.http.get<TreeNode>(`${this.apiUrl}/tree-nodes/${id}`);
  }

  async updateTreeNode(id: string, updateData: Partial<TreeNode>): Promise<TreeNode> {
    return lastValueFrom(this.http.put<TreeNode>(`${this.apiUrl}/tree-nodes/${id}`, updateData));
  }

  deleteTreeNode(id: string): Observable<TreeNode> {
    return this.http.delete<TreeNode>(`${this.apiUrl}/tree-nodes/${id}`);
  }

  addChild(parentId: string, childId: string): Observable<TreeNode> {
    return this.http.put<TreeNode>(`${this.apiUrl}/tree-nodes/${parentId}/add-child/${childId}`, {});
  }

  removeChild(parentId: string, childId: string): Observable<TreeNode> {
    return this.http.put<TreeNode>(`${this.apiUrl}/tree-nodes/${parentId}/remove-child/${childId}`, {});
  }
}
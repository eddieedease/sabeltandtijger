// In your services, e.g., src/app/some.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from './config';
import { Observable } from 'rxjs';

// uster interface
interface User {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  age?: number;
}

// Treenode interface
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

  // users API CALLS
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

  // TreeNodes
   // TreeNodes
    // TreeNodes
     // TreeNodes
  createTreeNode(treeNode: Partial<TreeNode>): Observable<TreeNode> {
    return this.http.post<TreeNode>(this.apiUrl, treeNode);
  }

  getTreeNodes(): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(this.apiUrl);
  }

  getTree(): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(`${this.apiUrl}/treenode/tree`);
  }

  getTreeNode(id: string): Observable<TreeNode> {
    return this.http.get<TreeNode>(`${this.apiUrl}/treenode/${id}`);
  }

  updateTreeNode(id: string, treeNode: Partial<TreeNode>): Observable<TreeNode> {
    return this.http.put<TreeNode>(`${this.apiUrl}/treenode/${id}`, treeNode);
  }

  deleteTreeNode(id: string): Observable<TreeNode> {
    return this.http.delete<TreeNode>(`${this.apiUrl}/treenode/${id}`);
  }

  addChild(parentId: string, childId: string): Observable<TreeNode> {
    return this.http.put<TreeNode>(`${this.apiUrl}/treenode/${parentId}/add-child/${childId}`, {});
  }

  removeChild(parentId: string, childId: string): Observable<TreeNode> {
    return this.http.put<TreeNode>(`${this.apiUrl}/treenode/${parentId}/remove-child/${childId}`, {});
  }

}
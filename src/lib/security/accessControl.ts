
import { auditLogger } from '../audit';

// Sample user roles - in a real app these would come from authentication
export type UserRole = 'guest' | 'user' | 'admin' | 'developer';

export interface User {
  id: string;
  role: UserRole;
  permissions?: string[];
}

// Define permissions for each role
const rolePermissions: Record<UserRole, string[]> = {
  guest: ['view:public'],
  user: ['view:public', 'view:user', 'create:post', 'edit:own:post', 'delete:own:post'],
  admin: ['view:public', 'view:user', 'view:admin', 'create:post', 'edit:post', 'delete:post', 'manage:users'],
  developer: ['view:public', 'view:user', 'view:admin', 'view:system', 'create:post', 'edit:post', 'delete:post', 'manage:users', 'manage:system'],
};

// Resource types
export type ResourceType = 'post' | 'user' | 'system' | 'page' | 'file';

// Action types
export type ActionType = 'view' | 'create' | 'edit' | 'delete' | 'manage' | 'approve' | 'reject';

// Permission format: action:resource or action:own:resource
export interface Permission {
  action: ActionType;
  resource: ResourceType;
  owner?: boolean;
}

// Parse a permission string into a Permission object
export function parsePermission(permission: string): Permission {
  const parts = permission.split(':');
  
  if (parts.length === 2) {
    return {
      action: parts[0] as ActionType,
      resource: parts[1] as ResourceType,
    };
  } else if (parts.length === 3 && parts[1] === 'own') {
    return {
      action: parts[0] as ActionType,
      resource: parts[2] as ResourceType,
      owner: true,
    };
  }
  
  throw new Error(`Invalid permission format: ${permission}`);
}

// Check if a user has a specific permission
export function hasPermission(user: User | null, permissionStr: string): boolean {
  if (!user) {
    return false;
  }
  
  // Convert the permission string to a Permission object
  let permission: Permission;
  try {
    permission = parsePermission(permissionStr);
  } catch (error) {
    console.error(error);
    return false;
  }
  
  // Get the permissions for the user's role
  const permissions = user.permissions || rolePermissions[user.role] || [];
  
  // Check if the user has the exact permission
  if (permissions.includes(permissionStr)) {
    return true;
  }
  
  // Check if the user has a broader permission that covers this one
  if (permission.owner) {
    // Check if the user has non-owner-restricted permission
    if (permissions.includes(`${permission.action}:${permission.resource}`)) {
      return true;
    }
  }
  
  // Check for management permissions, which imply all other permissions for the resource
  if (permissions.includes(`manage:${permission.resource}`)) {
    return true;
  }
  
  // Special case for 'admin' role - they can do everything except system management
  if (user.role === 'admin' && permission.resource !== 'system') {
    return true;
  }
  
  // Special case for 'developer' role - they can do everything
  if (user.role === 'developer') {
    return true;
  }
  
  return false;
}

// Check if a user is the owner of a resource
export function isResourceOwner(user: User | null, resource: { userId?: string }): boolean {
  if (!user || !resource.userId) {
    return false;
  }
  
  return user.id === resource.userId;
}

// Authorize an action on a resource
export function authorizeAction(
  user: User | null,
  action: ActionType,
  resourceType: ResourceType,
  resource?: { userId?: string }
): boolean {
  if (!user) {
    return false;
  }
  
  // Check for unrestricted permission
  if (hasPermission(user, `${action}:${resourceType}`)) {
    return true;
  }
  
  // Check for owner-restricted permission
  if (resource && hasPermission(user, `${action}:own:${resourceType}`)) {
    return isResourceOwner(user, resource);
  }
  
  return false;
}

// Create authorization middleware for Express (if using Node.js)
export function authorizationMiddleware(
  action: ActionType,
  resourceType: ResourceType,
  getResource?: (req: any) => Promise<{ userId?: string } | null>
) {
  return async (req: any, res: any, next: any) => {
    const user = req.user as User | null;
    
    if (!user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    let resource: { userId?: string } | null = null;
    
    if (getResource) {
      resource = await getResource(req);
      
      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
    }
    
    if (authorizeAction(user, action, resourceType, resource || undefined)) {
      // Log the authorized action
      auditLogger.log({
        action: 'AUTHORIZATION',
        resource: resourceType,
        details: {
          action,
          userId: user.id,
          userRole: user.role,
        },
        status: 'success',
      });
      
      return next();
    }
    
    // Log the unauthorized attempt
    auditLogger.log({
      action: 'AUTHORIZATION',
      resource: resourceType,
      details: {
        action,
        userId: user.id,
        userRole: user.role,
      },
      status: 'error',
    });
    
    return res.status(403).json({ error: 'Unauthorized' });
  };
}

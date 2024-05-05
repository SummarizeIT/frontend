// This file is auto-generated by @hey-api/openapi-ts

export type UpdateUserRequest = {
  groupIds?: Array<string>;
  roleIds?: Array<string>;
};

export type ErrorResponse = {
  /**
   * Response messages field
   */
  message: string;
};

export type UpdateRoleRequest = {
  /**
   * Name of the role
   */
  name: string;
  /**
   * Array of UUIDs representing users assigned to the role
   */
  users?: Array<string>;
  adminPermissions?: Array<
    'ADMIN_ROLES' | 'ADMIN_USERS' | 'ADMIN_GROUPS' | 'ADMIN_MEDIA'
  >;
};

/**
 * Properties for role group leader
 */
export type RoleLeader = {
  /**
   * UUID of role
   */
  id: string;
  /**
   * Allow leader to change extensions
   */
  changeExtensions: boolean;
};

export type UpdateGroupRequest = {
  /**
   * Color code of the group
   */
  color?: string;
  /**
   * Name of the group
   */
  name: string;
  /**
   * Array of UUIDs representing users in the group
   */
  users?: Array<string>;
  groupLeaders?: Array<RoleLeader>;
};

/**
 * Request body to update
 */
export type UpdateOrganizationRequest = {
  /**
   * Name of the organization
   */
  name: string;
};

export type DetailedErrorResponse = {
  /**
   * Response messages field
   */
  message: string;
  /**
   * Error message
   */
  items: {
    [key: string]: string | null;
  } | null;
};

/**
 * Extension Update object
 */
export type UpdateExtension = {
  /**
   * Identifier of the extension
   */
  identifier: string;
  /**
   * Toggle extension
   */
  isEnabled: boolean;
  /**
   * Toggle extension
   */
  isEnabledByDefault: boolean;
};

/**
 * Update request body
 */
export type UpdateExtensionsRequest = {
  extensions: Array<UpdateExtension>;
};

/**
 * Request body to rename
 */
export type UpdateFolderRequest = {
  /**
   * Name of the folder
   */
  name: string;
};

/**
 * Request body to rename
 */
export type UpdateFolderPermissionsRequest = {
  groups?: Array<string>;
  public?: boolean;
};

/**
 * Request body to move
 */
export type MoveFolderRequest = {
  /**
   * ID of the destination folder where the folder will be copied
   */
  destinationFolderId?: string;
};

/**
 * Extension associated with an entry
 */
export type Extension = {
  /**
   * Identifier of the extension
   */
  identifier: string;
  /**
   * Content of the extension
   */
  content?: {
    [key: string]: unknown;
  };
};

/**
 * Request body to rename
 */
export type UpdateEntryRequest = {
  /**
   * Title of the entry
   */
  title: string;
  /**
   * Body content of the entry
   */
  body: string;
  extensions?: Array<Extension>;
};

/**
 * Request body to move
 */
export type MoveEntryRequest = {
  /**
   * ID of the destination folder where the folder will be copied
   */
  destinationFolderId?: string;
};

export type UpdateMeRequest = {
  /**
   * Name of the user
   */
  firstName: string;
  /**
   * Lastname of the user
   */
  lastName: string;
};

/**
 * Create organization request
 */
export type CreateOrganizationRequest = {
  /**
   * Name of the organization
   */
  name: string;
};

/**
 * Create request body
 */
export type InviteUserRequest = {
  /**
   * email of the user
   */
  email?: string;
};

export type CreateRoleRequest = {
  /**
   * Name of the role
   */
  name: string;
  /**
   * Array of UUIDs representing users assigned to the role
   */
  users?: Array<string>;
  adminPermissions?: Array<
    'ADMIN_ROLES' | 'ADMIN_USERS' | 'ADMIN_GROUPS' | 'ADMIN_MEDIA'
  >;
};

export type CreateGroupRequest = {
  /**
   * Color code of the group
   */
  color?: string;
  /**
   * Name of the group
   */
  name: string;
  /**
   * Array of UUIDs representing users in the group
   */
  users?: Array<string>;
  groupLeaders?: Array<RoleLeader>;
};

/**
 * Folder Details
 */
export type CreateFolderRequest = {
  /**
   * Name of the folder
   */
  name: string;
  /**
   * UUID of the parent directory
   */
  parentId?: string;
};

export type UploadEntryRequest = {
  /**
   * ID of the destination folder where the entry will be uploaded
   */
  parentFolderId?: string;
  /**
   * Lastname of the user
   */
  title: string;
};

/**
 * Request body to password
 */
export type PasswordRequest = {
  /**
   * E-mail of the user
   */
  email: string;
};

export type SuccessResponse = {
  /**
   * Response message field
   */
  message: string;
};

/**
 * Request body to update password
 */
export type ResetPasswordRequest = {
  /**
   * New password of the user
   */
  password: string;
  /**
   * New password confirmation for the user
   */
  passwordConfirm: string;
};

export type PasswordResetResponse = {
  /**
   * UUID
   */
  id: string;
  /**
   * Token
   */
  token: string;
  /**
   * User ID
   */
  userId: string;
  /**
   * Expiration date
   */
  expirationDate: string;
  /**
   * Date time field of user creation
   */
  createdAt: string;
  /**
   * Date time field of user update
   */
  updatedAt: string;
};

/**
 * Request body to register
 */
export type RegisterRequest = {
  /**
   * Email of the user
   */
  email: string;
  /**
   * Password of the user
   */
  password: string;
  /**
   * Password for confirmation
   */
  passwordConfirm: string;
  /**
   * Name of the user
   */
  name: string;
  /**
   * Lastname of the user
   */
  lastName: string;
};

/**
 * Request body to login
 */
export type LoginRequest = {
  /**
   * E-mail of the user
   */
  email: string;
  /**
   * Password of the user
   */
  password: string;
  /**
   * Remember option for refresh token
   */
  rememberMe?: boolean;
};

/**
 * Expires In
 */
export type TokenExpiresInResponse = {
  /**
   * Token expires In
   */
  token: number;
  /**
   * Refresh token expires In
   */
  refreshToken: number;
};

export type TokenResponse = {
  /**
   * Token
   */
  token: string;
  /**
   * Refresh Token
   */
  refreshToken: string;
  expiresIn: TokenExpiresInResponse;
};

/**
 * Query parameters for list endpoints
 */
export type ListQueryRequest = {
  /**
   * Search query
   */
  search?: string;
  /**
   * Page number
   */
  page?: number;
  /**
   * Only show the following ids
   */
  ids?: Array<string>;
};

export type UserPaginationResponse = {
  /**
   * Page
   */
  page: number;
  /**
   * Pages
   */
  pages: number;
  /**
   * size
   */
  size: number;
  /**
   * Total number of pages
   */
  total: number;
  items: Array<UserResponse>;
};

export type UserResponse = {
  /**
   * UUID of the user
   */
  id: string;
  /**
   * URL of the user's image
   */
  imageUrl: string;
  /**
   * First name of the user
   */
  name: string;
  /**
   * Last name of the user
   */
  lastname: string;
  /**
   * Email address of the user
   */
  email: string;
  groupIds: Array<string>;
  roleIds: Array<string>;
};

export type RolePaginationResponse = {
  /**
   * Page
   */
  page: number;
  /**
   * Pages
   */
  pages: number;
  /**
   * size
   */
  size: number;
  /**
   * Total number of pages
   */
  total: number;
  items: Array<RoleResponse>;
};

export type RoleResponse = {
  /**
   * UUID of the role
   */
  parentId: string;
  /**
   * Name of the role
   */
  name: string;
  /**
   * Array of UUIDs representing users assigned to the role
   */
  users: Array<string>;
  adminPermissions: Array<string>;
};

export type GroupPaginationResponse = {
  /**
   * Page
   */
  page: number;
  /**
   * Pages
   */
  pages: number;
  /**
   * size
   */
  size: number;
  /**
   * Total number of pages
   */
  total: number;
  items: Array<GroupResponse>;
};

export type GroupResponse = {
  /**
   * UUID of the group
   */
  parentId: string;
  /**
   * Color code of the group
   */
  color: string;
  /**
   * Name of the group
   */
  name: string;
  /**
   * Array of UUIDs representing users in the group
   */
  users: Array<string>;
  groupLeaders: Array<RoleLeader>;
};

/**
 * Extension information
 */
export type ExtensionInstance = {
  /**
   * Identifier of the extension
   */
  identifier: string;
  /**
   * Name of the extension
   */
  name: string;
  /**
   * Description of the extension
   */
  description: string;
  /**
   * Version of the extension
   */
  version: string;
  /**
   * Toggle extension
   */
  isEnabled: boolean;
  /**
   * Toggle extension
   */
  isEnabledByDefault: boolean;
};

export type ExtensionsResponse = {
  extensions: Array<ExtensionInstance>;
};

/**
 * Audio file in the file system
 */
export type Audio = {
  /**
   * UUID of the object
   */
  id: string;
  /**
   * Name of the object
   */
  name: string;
};

export type DirectoryBreadcrumbsResponse = {
  /**
   * UUID of the directory
   */
  id: string;
  /**
   * Name of the directory
   */
  name: string;
};

/**
 * Directory or File in the file system
 */
export type FileSystemObject =
  | FolderObjectResponse
  | Audio
  | {
      /**
       * UUID of the object
       */
      id: string;
      /**
       * Name of the object
       */
      name: string;
    };

export type FolderObjectResponse = {
  /**
   * UUID of the object
   */
  id: string;
  /**
   * Name of the object
   */
  name: string;
  /**
   * Indicates if the object is a directory
   */
  isDir: boolean;
};

/**
 * Folder in the file system
 */
export type Video = {
  pathFromRoot: Array<DirectoryBreadcrumbsResponse>;
  list: Array<FileSystemObject>;
  /**
   * Array of UUIDs representing groups assigned to the folder
   */
  groups: Array<string>;
};

export type EntryResponse = {
  /**
   * Title of the entry
   */
  title: string;
  /**
   * Date when the entry was created
   */
  createdOn: string;
  /**
   * Body content of the entry
   */
  body: string;
  extensions: Array<Extension>;
  /**
   * Type of the entry
   */
  mediaType: string;
  /**
   * URL of the media
   */
  url: string;
  processing?: boolean;
};

/**
 * User invites to organizations
 */
export type Invites = {
  /**
   * Organization UUID
   */
  id: string;
  /**
   * Name of the organization
   */
  name: string;
  /**
   * URL of the organization's profile image
   */
  avatar: string;
};

export type MeResponse = {
  /**
   * UUID
   */
  id: string;
  /**
   * E-mail of the user
   */
  email: string;
  /**
   * Name of the user
   */
  firstName: string;
  /**
   * Lastname of the user
   */
  lastName: string;
  /**
   * UUID for the user's root folder
   */
  rootFolder: string;
  /**
   * URL of the user's profile image
   */
  avatar: string;
  organizations: Array<UserOrganizations>;
  invites: Array<Invites>;
};

/**
 * User Organizations
 */
export type UserOrganizations = {
  /**
   * Organization UUID
   */
  id: string;
  /**
   * Name of the organization
   */
  name: string;
  /**
   * URL of the organization's profile image
   */
  avatar: string;
  /**
   * UUID for the organization's root folder
   */
  rootFolder: string;
  adminPermissions: Array<
    'ADMIN_ROLES' | 'ADMIN_USERS' | 'ADMIN_GROUPS' | 'ADMIN_MEDIA'
  >;
};

export type $OpenApiTs = {
  '/organization/{organizationId}/user/{id}': {
    get: {
      req: {
        /**
         * User ID
         */
        id: string;
        /**
         * Organization ID
         */
        organizationId: string;
      };
      res: {
        /**
         * Success operation
         */
        200: UserResponse;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
    put: {
      req: {
        /**
         * User ID
         */
        id: string;
        /**
         * Organization ID
         */
        organizationId: string;
        requestBody: UpdateUserRequest;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
    delete: {
      req: {
        /**
         * User ID
         */
        id: string;
        /**
         * Organization ID
         */
        organizationId: string;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
  };
  '/organization/{organizationId}/user': {
    get: {
      req: {
        /**
         * Organization ID
         */
        organizationId: string;
        /**
         * Query
         */
        queryRequest: ListQueryRequest;
      };
      res: {
        /**
         * Success operation
         */
        200: UserPaginationResponse;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
    post: {
      req: {
        /**
         * Organization ID
         */
        organizationId: string;
        requestBody: InviteUserRequest;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
  };
  '/organization/{organizationId}/role/{id}': {
    get: {
      req: {
        /**
         * Role ID
         */
        id: string;
        /**
         * Organization ID
         */
        organizationId: string;
      };
      res: {
        /**
         * Success operation
         */
        200: RoleResponse;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
    put: {
      req: {
        /**
         * Role ID
         */
        id: string;
        /**
         * Organization ID
         */
        organizationId: string;
        requestBody: UpdateRoleRequest;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
    delete: {
      req: {
        /**
         * Role ID
         */
        id: string;
        /**
         * Organization ID
         */
        organizationId: string;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
  };
  '/organization/{organizationId}/role': {
    get: {
      req: {
        /**
         * Organization ID
         */
        organizationId: string;
        /**
         * Role query
         */
        queryRequest: ListQueryRequest;
      };
      res: {
        /**
         * Success operation
         */
        200: RolePaginationResponse;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
    post: {
      req: {
        /**
         * Organization ID
         */
        organizationId: string;
        requestBody: CreateRoleRequest;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
  };
  '/organization/{organizationId}/group/{id}': {
    get: {
      req: {
        /**
         * Group ID
         */
        id: string;
        /**
         * Organization ID
         */
        organizationId: string;
      };
      res: {
        /**
         * Success operation
         */
        200: GroupResponse;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
    put: {
      req: {
        /**
         * Group ID
         */
        id: string;
        /**
         * Organization ID
         */
        organizationId: string;
        requestBody: UpdateGroupRequest;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
    delete: {
      req: {
        /**
         * Group ID
         */
        id: string;
        /**
         * Organization ID
         */
        organizationId: string;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
  };
  '/organization/{organizationId}/group': {
    get: {
      req: {
        /**
         * Organization ID
         */
        organizationId: string;
        /**
         * Query
         */
        queryRequest: ListQueryRequest;
      };
      res: {
        /**
         * Success operation
         */
        200: GroupPaginationResponse;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
    post: {
      req: {
        /**
         * Organization ID
         */
        organizationId: string;
        requestBody: CreateGroupRequest;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
  };
  '/organization/{id}': {
    put: {
      req: {
        /**
         * ID of organization to update
         */
        id: string;
        requestBody: UpdateOrganizationRequest;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
        /**
         * Validation Failed
         */
        422: DetailedErrorResponse;
      };
    };
    delete: {
      req: {
        /**
         * Organization ID
         */
        id: string;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
  };
  '/organization/{id}/extensions': {
    get: {
      req: {
        /**
         * Organization ID
         */
        id: string;
      };
      res: {
        /**
         * Successful operation
         */
        200: ExtensionsResponse;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
    put: {
      req: {
        /**
         * Organization ID
         */
        id: string;
        requestBody: UpdateExtensionsRequest;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
  };
  '/organization/{id}/avatar': {
    put: {
      req: {
        formData: {
          avatar?: Blob | File;
        };
        /**
         * ID of organization to update
         */
        id: string;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
        /**
         * Validation Failed
         */
        422: DetailedErrorResponse;
      };
    };
    delete: {
      req: {
        /**
         * Organization ID
         */
        id: string;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
  };
  '/organization': {
    post: {
      req: {
        requestBody: CreateOrganizationRequest;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Validation Failed
         */
        422: DetailedErrorResponse;
      };
    };
  };
  '/folder/{id}': {
    get: {
      req: {
        /**
         * Folder ID
         */
        id: string;
      };
      res: {
        /**
         * Success operation
         */
        200: Video;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
    put: {
      req: {
        /**
         * ID of folder to update
         */
        id: string;
        requestBody: UpdateFolderRequest;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
        /**
         * Validation Failed
         */
        422: DetailedErrorResponse;
      };
    };
    delete: {
      req: {
        /**
         * Entry ID
         */
        id: string;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
  };
  '/folder/{id}/permissions': {
    put: {
      req: {
        /**
         * ID of folder to update
         */
        id: string;
        requestBody: UpdateFolderPermissionsRequest;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
        /**
         * Validation Failed
         */
        422: DetailedErrorResponse;
      };
    };
  };
  '/folder/{id}/move': {
    put: {
      req: {
        /**
         * ID of folder to update
         */
        id: string;
        requestBody: MoveFolderRequest;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
        /**
         * Validation Failed
         */
        422: DetailedErrorResponse;
      };
    };
  };
  '/folder': {
    post: {
      req: {
        requestBody: CreateFolderRequest;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
        /**
         * Validation Failed
         */
        422: DetailedErrorResponse;
      };
    };
  };
  '/entry/{id}': {
    get: {
      req: {
        /**
         * Entry ID
         */
        id: string;
      };
      res: {
        /**
         * Success operation
         */
        200: EntryResponse;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
    put: {
      req: {
        /**
         * ID of entry to update
         */
        id: string;
        requestBody: UpdateEntryRequest;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
        /**
         * Validation Failed
         */
        422: DetailedErrorResponse;
      };
    };
    delete: {
      req: {
        /**
         * Entry ID
         */
        id: string;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
  };
  '/entry/{id}/move': {
    put: {
      req: {
        /**
         * ID of entry to update
         */
        id: string;
        requestBody: MoveEntryRequest;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
        /**
         * Validation Failed
         */
        422: DetailedErrorResponse;
      };
    };
  };
  '/entry': {
    post: {
      req: {
        formData: {
          mediaFile?: Blob | File;
        };
        /**
         * Entry Details
         */
        uploadRequest: UploadEntryRequest;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Validation Failed
         */
        422: DetailedErrorResponse;
      };
    };
  };
  '/account': {
    get: {
      res: {
        /**
         * Successful operation
         */
        200: MeResponse;
        /**
         * Bad credentials
         */
        401: ErrorResponse;
      };
    };
    put: {
      req: {
        requestBody: UpdateMeRequest;
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
        /**
         * Validation Failed
         */
        422: DetailedErrorResponse;
      };
    };
  };
  '/account/avatar': {
    put: {
      req: {
        formData: {
          avatar?: Blob | File;
        };
      };
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
        /**
         * Validation Failed
         */
        422: DetailedErrorResponse;
      };
    };
    delete: {
      res: {
        /**
         * Success operation
         */
        200: unknown;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
        /**
         * Not Found
         */
        404: ErrorResponse;
      };
    };
  };
  '/account/invite/{organizationId}': {
    post: {
      req: {
        /**
         * ID of the invite
         */
        organizationId: string;
      };
      res: {
        /**
         * Successful operation
         */
        200: SuccessResponse;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
      };
    };
    delete: {
      req: {
        /**
         * ID of the invite
         */
        organizationId: string;
      };
      res: {
        /**
         * Successful operation
         */
        200: SuccessResponse;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
      };
    };
  };
  '/account/organization/{organizationId}': {
    delete: {
      req: {
        /**
         * ID of the organization
         */
        organizationId: string;
      };
      res: {
        /**
         * Successful operation
         */
        200: SuccessResponse;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Full authentication is required to access this resource
         */
        401: ErrorResponse;
      };
    };
  };
  '/auth/reset-password': {
    post: {
      req: {
        requestBody: PasswordRequest;
      };
      res: {
        /**
         * Successful operation
         */
        200: SuccessResponse;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Bad credentials
         */
        401: ErrorResponse;
      };
    };
  };
  '/auth/reset-password/{token}': {
    get: {
      req: {
        /**
         * Password reset token
         */
        token: string;
      };
      res: {
        /**
         * Successful operation
         */
        200: PasswordResetResponse;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Bad credentials
         */
        401: ErrorResponse;
      };
    };
    post: {
      req: {
        requestBody: ResetPasswordRequest;
        /**
         * Password reset token
         */
        token: string;
      };
      res: {
        /**
         * Successful operation
         */
        200: PasswordResetResponse;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Bad credentials
         */
        401: ErrorResponse;
      };
    };
  };
  '/auth/register': {
    post: {
      req: {
        requestBody: RegisterRequest;
      };
      res: {
        /**
         * Successful operation
         */
        200: SuccessResponse;
        /**
         * Validation failed
         */
        422: DetailedErrorResponse;
      };
    };
  };
  '/auth/login': {
    post: {
      req: {
        requestBody: LoginRequest;
      };
      res: {
        /**
         * Successful operation
         */
        200: TokenResponse;
        /**
         * Bad credentials
         */
        401: ErrorResponse;
        /**
         * Validation failed
         */
        422: DetailedErrorResponse;
      };
    };
  };
  '/auth/refresh': {
    get: {
      req: {
        refresh: string;
      };
      res: {
        /**
         * Successful operation
         */
        200: TokenResponse;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Bad credentials
         */
        401: ErrorResponse;
      };
    };
  };
  '/auth/logout': {
    get: {
      res: {
        /**
         * Successful operation
         */
        200: SuccessResponse;
        /**
         * Bad request
         */
        400: ErrorResponse;
        /**
         * Bad request
         */
        401: ErrorResponse;
      };
    };
  };
};
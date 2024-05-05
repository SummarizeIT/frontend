// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';
import type { $OpenApiTs } from './types.gen';

export class UserService {
  /**
   * Get organization user details by ID
   * @param data The data for the request.
   * @param data.id User ID
   * @param data.organizationId Organization ID
   * @returns UserResponse Success operation
   * @throws ApiError
   */
  public static getUserById(
    data: $OpenApiTs['/organization/{organizationId}/user/{id}']['get']['req'],
  ): CancelablePromise<
    $OpenApiTs['/organization/{organizationId}/user/{id}']['get']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/organization/{organizationId}/user/{id}',
      path: {
        id: data.id,
        organizationId: data.organizationId,
      },
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }

  /**
   * Update organization user
   * @param data The data for the request.
   * @param data.id User ID
   * @param data.organizationId Organization ID
   * @param data.requestBody
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static updateUser(
    data: $OpenApiTs['/organization/{organizationId}/user/{id}']['put']['req'],
  ): CancelablePromise<
    $OpenApiTs['/organization/{organizationId}/user/{id}']['put']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/organization/{organizationId}/user/{id}',
      path: {
        id: data.id,
        organizationId: data.organizationId,
      },
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }

  /**
   * Kick user
   * @param data The data for the request.
   * @param data.id User ID
   * @param data.organizationId Organization ID
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static deleteUser(
    data: $OpenApiTs['/organization/{organizationId}/user/{id}']['delete']['req'],
  ): CancelablePromise<
    $OpenApiTs['/organization/{organizationId}/user/{id}']['delete']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/organization/{organizationId}/user/{id}',
      path: {
        id: data.id,
        organizationId: data.organizationId,
      },
      errors: {
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }

  /**
   * Get organization users
   * @param data The data for the request.
   * @param data.organizationId Organization ID
   * @param data.queryRequest Query
   * @returns UserPaginationResponse Success operation
   * @throws ApiError
   */
  public static getUsers(
    data: $OpenApiTs['/organization/{organizationId}/user']['get']['req'],
  ): CancelablePromise<
    $OpenApiTs['/organization/{organizationId}/user']['get']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/organization/{organizationId}/user',
      path: {
        organizationId: data.organizationId,
      },
      query: {
        queryRequest: data.queryRequest,
      },
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }

  /**
   * Invite user
   * @param data The data for the request.
   * @param data.organizationId Organization ID
   * @param data.requestBody
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static inviteUser(
    data: $OpenApiTs['/organization/{organizationId}/user']['post']['req'],
  ): CancelablePromise<
    $OpenApiTs['/organization/{organizationId}/user']['post']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/organization/{organizationId}/user',
      path: {
        organizationId: data.organizationId,
      },
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }
}

export class RoleService {
  /**
   * Get organization role details by ID
   * @param data The data for the request.
   * @param data.organizationId Organization ID
   * @param data.id Role ID
   * @returns RoleResponse Success operation
   * @throws ApiError
   */
  public static getOrganizationRoleById(
    data: $OpenApiTs['/organization/{organizationId}/role/{id}']['get']['req'],
  ): CancelablePromise<
    $OpenApiTs['/organization/{organizationId}/role/{id}']['get']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/organization/{organizationId}/role/{id}',
      path: {
        organizationId: data.organizationId,
        id: data.id,
      },
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }

  /**
   * Update organization role
   * @param data The data for the request.
   * @param data.organizationId Organization ID
   * @param data.id Role ID
   * @param data.requestBody
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static updateOrganizationRole(
    data: $OpenApiTs['/organization/{organizationId}/role/{id}']['put']['req'],
  ): CancelablePromise<
    $OpenApiTs['/organization/{organizationId}/role/{id}']['put']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/organization/{organizationId}/role/{id}',
      path: {
        organizationId: data.organizationId,
        id: data.id,
      },
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }

  /**
   * Delete organization role
   * @param data The data for the request.
   * @param data.organizationId Organization ID
   * @param data.id Role ID
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static deleteOrganizationRole(
    data: $OpenApiTs['/organization/{organizationId}/role/{id}']['delete']['req'],
  ): CancelablePromise<
    $OpenApiTs['/organization/{organizationId}/role/{id}']['delete']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/organization/{organizationId}/role/{id}',
      path: {
        organizationId: data.organizationId,
        id: data.id,
      },
      errors: {
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }

  /**
   * Get organization role details by ID
   * @param data The data for the request.
   * @param data.organizationId Organization ID
   * @param data.queryRequest Role query
   * @returns RolePaginationResponse Success operation
   * @throws ApiError
   */
  public static getOrganizationRoles(
    data: $OpenApiTs['/organization/{organizationId}/role']['get']['req'],
  ): CancelablePromise<
    $OpenApiTs['/organization/{organizationId}/role']['get']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/organization/{organizationId}/role',
      path: {
        organizationId: data.organizationId,
      },
      query: {
        queryRequest: data.queryRequest,
      },
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }

  /**
   * Create organization role
   * @param data The data for the request.
   * @param data.organizationId Organization ID
   * @param data.requestBody
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static createOrganizationRole(
    data: $OpenApiTs['/organization/{organizationId}/role']['post']['req'],
  ): CancelablePromise<
    $OpenApiTs['/organization/{organizationId}/role']['post']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/organization/{organizationId}/role',
      path: {
        organizationId: data.organizationId,
      },
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }
}

export class GroupService {
  /**
   * Get organization group details by ID
   * @param data The data for the request.
   * @param data.id Group ID
   * @param data.organizationId Organization ID
   * @returns GroupResponse Success operation
   * @throws ApiError
   */
  public static getGroupById(
    data: $OpenApiTs['/organization/{organizationId}/group/{id}']['get']['req'],
  ): CancelablePromise<
    $OpenApiTs['/organization/{organizationId}/group/{id}']['get']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/organization/{organizationId}/group/{id}',
      path: {
        id: data.id,
        organizationId: data.organizationId,
      },
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }

  /**
   * Update organization group
   * @param data The data for the request.
   * @param data.id Group ID
   * @param data.organizationId Organization ID
   * @param data.requestBody
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static updateGroup(
    data: $OpenApiTs['/organization/{organizationId}/group/{id}']['put']['req'],
  ): CancelablePromise<
    $OpenApiTs['/organization/{organizationId}/group/{id}']['put']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/organization/{organizationId}/group/{id}',
      path: {
        id: data.id,
        organizationId: data.organizationId,
      },
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }

  /**
   * Delete organization group
   * @param data The data for the request.
   * @param data.id Group ID
   * @param data.organizationId Organization ID
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static deleteGroup(
    data: $OpenApiTs['/organization/{organizationId}/group/{id}']['delete']['req'],
  ): CancelablePromise<
    $OpenApiTs['/organization/{organizationId}/group/{id}']['delete']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/organization/{organizationId}/group/{id}',
      path: {
        id: data.id,
        organizationId: data.organizationId,
      },
      errors: {
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }

  /**
   * Get organization groups
   * @param data The data for the request.
   * @param data.organizationId Organization ID
   * @param data.queryRequest Query
   * @returns GroupPaginationResponse Success operation
   * @throws ApiError
   */
  public static getUsers1(
    data: $OpenApiTs['/organization/{organizationId}/group']['get']['req'],
  ): CancelablePromise<
    $OpenApiTs['/organization/{organizationId}/group']['get']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/organization/{organizationId}/group',
      path: {
        organizationId: data.organizationId,
      },
      query: {
        queryRequest: data.queryRequest,
      },
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }

  /**
   * Create organization group
   * @param data The data for the request.
   * @param data.organizationId Organization ID
   * @param data.requestBody
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static createGroup(
    data: $OpenApiTs['/organization/{organizationId}/group']['post']['req'],
  ): CancelablePromise<
    $OpenApiTs['/organization/{organizationId}/group']['post']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/organization/{organizationId}/group',
      path: {
        organizationId: data.organizationId,
      },
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }
}

export class OrganizationService {
  /**
   * Update an organization
   * @param data The data for the request.
   * @param data.id ID of organization to update
   * @param data.requestBody
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static updateOrganization(
    data: $OpenApiTs['/organization/{id}']['put']['req'],
  ): CancelablePromise<$OpenApiTs['/organization/{id}']['put']['res'][200]> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/organization/{id}',
      path: {
        id: data.id,
      },
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
        422: 'Validation Failed',
      },
    });
  }

  /**
   * Delete organization
   * @param data The data for the request.
   * @param data.id Organization ID
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static deleteOrganization(
    data: $OpenApiTs['/organization/{id}']['delete']['req'],
  ): CancelablePromise<$OpenApiTs['/organization/{id}']['delete']['res'][200]> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/organization/{id}',
      path: {
        id: data.id,
      },
      errors: {
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }

  /**
   * Extensions
   * @param data The data for the request.
   * @param data.id Organization ID
   * @returns ExtensionsResponse Successful operation
   * @throws ApiError
   */
  public static extensions(
    data: $OpenApiTs['/organization/{id}/extensions']['get']['req'],
  ): CancelablePromise<
    $OpenApiTs['/organization/{id}/extensions']['get']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/organization/{id}/extensions',
      path: {
        id: data.id,
      },
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }

  /**
   * Update organization extensions
   * @param data The data for the request.
   * @param data.id Organization ID
   * @param data.requestBody
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static updateExtensions(
    data: $OpenApiTs['/organization/{id}/extensions']['put']['req'],
  ): CancelablePromise<
    $OpenApiTs['/organization/{id}/extensions']['put']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/organization/{id}/extensions',
      path: {
        id: data.id,
      },
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }

  /**
   * Update an organization avatar
   * @param data The data for the request.
   * @param data.id ID of organization to update
   * @param data.formData
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static updateOrganizationPicture(
    data: $OpenApiTs['/organization/{id}/avatar']['put']['req'],
  ): CancelablePromise<
    $OpenApiTs['/organization/{id}/avatar']['put']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/organization/{id}/avatar',
      path: {
        id: data.id,
      },
      formData: data.formData,
      mediaType: 'multipart/form-data',
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
        422: 'Validation Failed',
      },
    });
  }

  /**
   * Clear organization avatar
   * @param data The data for the request.
   * @param data.id Organization ID
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static deleteOrganizationAvatar(
    data: $OpenApiTs['/organization/{id}/avatar']['delete']['req'],
  ): CancelablePromise<
    $OpenApiTs['/organization/{id}/avatar']['delete']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/organization/{id}/avatar',
      path: {
        id: data.id,
      },
      errors: {
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }

  /**
   * Create organization
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static createOrganization(
    data: $OpenApiTs['/organization']['post']['req'],
  ): CancelablePromise<$OpenApiTs['/organization']['post']['res'][200]> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/organization',
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        422: 'Validation Failed',
      },
    });
  }
}

export class FolderService {
  /**
   * Get folder details by ID
   * @param data The data for the request.
   * @param data.id Folder ID
   * @returns Video Success operation
   * @throws ApiError
   */
  public static getFolderById(
    data: $OpenApiTs['/folder/{id}']['get']['req'],
  ): CancelablePromise<$OpenApiTs['/folder/{id}']['get']['res'][200]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/folder/{id}',
      path: {
        id: data.id,
      },
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }

  /**
   * Update a folder
   * @param data The data for the request.
   * @param data.id ID of folder to update
   * @param data.requestBody
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static updateFolder(
    data: $OpenApiTs['/folder/{id}']['put']['req'],
  ): CancelablePromise<$OpenApiTs['/folder/{id}']['put']['res'][200]> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/folder/{id}',
      path: {
        id: data.id,
      },
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
        422: 'Validation Failed',
      },
    });
  }

  /**
   * Delete folder and its contents
   * @param data The data for the request.
   * @param data.id Entry ID
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static deleteFolder(
    data: $OpenApiTs['/folder/{id}']['delete']['req'],
  ): CancelablePromise<$OpenApiTs['/folder/{id}']['delete']['res'][200]> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/folder/{id}',
      path: {
        id: data.id,
      },
      errors: {
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }

  /**
   * Update a folder's permissions
   * @param data The data for the request.
   * @param data.id ID of folder to update
   * @param data.requestBody
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static updateFolderGroups(
    data: $OpenApiTs['/folder/{id}/permissions']['put']['req'],
  ): CancelablePromise<
    $OpenApiTs['/folder/{id}/permissions']['put']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/folder/{id}/permissions',
      path: {
        id: data.id,
      },
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
        422: 'Validation Failed',
      },
    });
  }

  /**
   * Move a folder
   * @param data The data for the request.
   * @param data.id ID of folder to update
   * @param data.requestBody
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static moveFolder(
    data: $OpenApiTs['/folder/{id}/move']['put']['req'],
  ): CancelablePromise<$OpenApiTs['/folder/{id}/move']['put']['res'][200]> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/folder/{id}/move',
      path: {
        id: data.id,
      },
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
        422: 'Validation Failed',
      },
    });
  }

  /**
   * Create a new folder
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static createFolder(
    data: $OpenApiTs['/folder']['post']['req'],
  ): CancelablePromise<$OpenApiTs['/folder']['post']['res'][200]> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/folder',
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
        422: 'Validation Failed',
      },
    });
  }
}

export class EntryService {
  /**
   * Get Entry details by ID
   * @param data The data for the request.
   * @param data.id Entry ID
   * @returns EntryResponse Success operation
   * @throws ApiError
   */
  public static getEntryById(
    data: $OpenApiTs['/entry/{id}']['get']['req'],
  ): CancelablePromise<$OpenApiTs['/entry/{id}']['get']['res'][200]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/entry/{id}',
      path: {
        id: data.id,
      },
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }

  /**
   * Update an entry
   * @param data The data for the request.
   * @param data.id ID of entry to update
   * @param data.requestBody
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static updateEntry(
    data: $OpenApiTs['/entry/{id}']['put']['req'],
  ): CancelablePromise<$OpenApiTs['/entry/{id}']['put']['res'][200]> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/entry/{id}',
      path: {
        id: data.id,
      },
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
        422: 'Validation Failed',
      },
    });
  }

  /**
   * Delete entry and its data
   * @param data The data for the request.
   * @param data.id Entry ID
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static deleteEntry(
    data: $OpenApiTs['/entry/{id}']['delete']['req'],
  ): CancelablePromise<$OpenApiTs['/entry/{id}']['delete']['res'][200]> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/entry/{id}',
      path: {
        id: data.id,
      },
      errors: {
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }

  /**
   * Move an entry
   * @param data The data for the request.
   * @param data.id ID of entry to update
   * @param data.requestBody
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static moveEntry(
    data: $OpenApiTs['/entry/{id}/move']['put']['req'],
  ): CancelablePromise<$OpenApiTs['/entry/{id}/move']['put']['res'][200]> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/entry/{id}/move',
      path: {
        id: data.id,
      },
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
        422: 'Validation Failed',
      },
    });
  }

  /**
   * Upload a new entry
   * @param data The data for the request.
   * @param data.uploadRequest Entry Details
   * @param data.formData
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static uploadEntry(
    data: $OpenApiTs['/entry']['post']['req'],
  ): CancelablePromise<$OpenApiTs['/entry']['post']['res'][200]> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/entry',
      query: {
        uploadRequest: data.uploadRequest,
      },
      formData: data.formData,
      mediaType: 'multipart/form-data',
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        422: 'Validation Failed',
      },
    });
  }
}

export class AccountService {
  /**
   * Me
   * @returns MeResponse Successful operation
   * @throws ApiError
   */
  public static me(): CancelablePromise<
    $OpenApiTs['/account']['get']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/account',
      errors: {
        401: 'Bad credentials',
      },
    });
  }

  /**
   * Update me
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static updateMe(
    data: $OpenApiTs['/account']['put']['req'],
  ): CancelablePromise<$OpenApiTs['/account']['put']['res'][200]> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/account',
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
        422: 'Validation Failed',
      },
    });
  }

  /**
   * Update my avatar
   * @param data The data for the request.
   * @param data.formData
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static updateMyAvatar(
    data: $OpenApiTs['/account/avatar']['put']['req'],
  ): CancelablePromise<$OpenApiTs['/account/avatar']['put']['res'][200]> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/account/avatar',
      formData: data.formData,
      mediaType: 'multipart/form-data',
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
        422: 'Validation Failed',
      },
    });
  }

  /**
   * Clear my avatar
   * @returns unknown Success operation
   * @throws ApiError
   */
  public static clearMyAvatar(): CancelablePromise<
    $OpenApiTs['/account/avatar']['delete']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/account/avatar',
      errors: {
        401: 'Full authentication is required to access this resource',
        404: 'Not Found',
      },
    });
  }

  /**
   * Accept invite
   * @param data The data for the request.
   * @param data.organizationId ID of the invite
   * @returns SuccessResponse Successful operation
   * @throws ApiError
   */
  public static acceptInvite(
    data: $OpenApiTs['/account/invite/{organizationId}']['post']['req'],
  ): CancelablePromise<
    $OpenApiTs['/account/invite/{organizationId}']['post']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/account/invite/{organizationId}',
      path: {
        organizationId: data.organizationId,
      },
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
      },
    });
  }

  /**
   * Decline invite
   * @param data The data for the request.
   * @param data.organizationId ID of the invite
   * @returns SuccessResponse Successful operation
   * @throws ApiError
   */
  public static declineInvite(
    data: $OpenApiTs['/account/invite/{organizationId}']['delete']['req'],
  ): CancelablePromise<
    $OpenApiTs['/account/invite/{organizationId}']['delete']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/account/invite/{organizationId}',
      path: {
        organizationId: data.organizationId,
      },
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
      },
    });
  }

  /**
   * Leave organization
   * @param data The data for the request.
   * @param data.organizationId ID of the organization
   * @returns SuccessResponse Successful operation
   * @throws ApiError
   */
  public static leaveOrganization(
    data: $OpenApiTs['/account/organization/{organizationId}']['delete']['req'],
  ): CancelablePromise<
    $OpenApiTs['/account/organization/{organizationId}']['delete']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/account/organization/{organizationId}',
      path: {
        organizationId: data.organizationId,
      },
      errors: {
        400: 'Bad request',
        401: 'Full authentication is required to access this resource',
      },
    });
  }
}

export class AuthService {
  /**
   * Reset password
   * @param data The data for the request.
   * @param data.requestBody
   * @returns SuccessResponse Successful operation
   * @throws ApiError
   */
  public static resetPassword(
    data: $OpenApiTs['/auth/reset-password']['post']['req'],
  ): CancelablePromise<$OpenApiTs['/auth/reset-password']['post']['res'][200]> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/reset-password',
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        400: 'Bad request',
        401: 'Bad credentials',
      },
    });
  }

  /**
   * Reset password check token
   * @param data The data for the request.
   * @param data.token Password reset token
   * @returns PasswordResetResponse Successful operation
   * @throws ApiError
   */
  public static resetPassword2(
    data: $OpenApiTs['/auth/reset-password/{token}']['get']['req'],
  ): CancelablePromise<
    $OpenApiTs['/auth/reset-password/{token}']['get']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/auth/reset-password/{token}',
      path: {
        token: data.token,
      },
      errors: {
        400: 'Bad request',
        401: 'Bad credentials',
      },
    });
  }

  /**
   * Reset password with token
   * @param data The data for the request.
   * @param data.token Password reset token
   * @param data.requestBody
   * @returns PasswordResetResponse Successful operation
   * @throws ApiError
   */
  public static resetPassword1(
    data: $OpenApiTs['/auth/reset-password/{token}']['post']['req'],
  ): CancelablePromise<
    $OpenApiTs['/auth/reset-password/{token}']['post']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/reset-password/{token}',
      path: {
        token: data.token,
      },
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        400: 'Bad request',
        401: 'Bad credentials',
      },
    });
  }

  /**
   * Register
   * @param data The data for the request.
   * @param data.requestBody
   * @returns SuccessResponse Successful operation
   * @throws ApiError
   */
  public static register(
    data: $OpenApiTs['/auth/register']['post']['req'],
  ): CancelablePromise<$OpenApiTs['/auth/register']['post']['res'][200]> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/register',
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        422: 'Validation failed',
      },
    });
  }

  /**
   * Login
   * @param data The data for the request.
   * @param data.requestBody
   * @returns TokenResponse Successful operation
   * @throws ApiError
   */
  public static login(
    data: $OpenApiTs['/auth/login']['post']['req'],
  ): CancelablePromise<$OpenApiTs['/auth/login']['post']['res'][200]> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/login',
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        401: 'Bad credentials',
        422: 'Validation failed',
      },
    });
  }

  /**
   * Refresh
   * @param data The data for the request.
   * @param data.refresh
   * @returns TokenResponse Successful operation
   * @throws ApiError
   */
  public static refresh(
    data: $OpenApiTs['/auth/refresh']['get']['req'],
  ): CancelablePromise<$OpenApiTs['/auth/refresh']['get']['res'][200]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/auth/refresh',
      headers: {
        Refresh: data.refresh,
      },
      errors: {
        400: 'Bad request',
        401: 'Bad credentials',
      },
    });
  }

  /**
   * Logout
   * @returns SuccessResponse Successful operation
   * @throws ApiError
   */
  public static logout(): CancelablePromise<
    $OpenApiTs['/auth/logout']['get']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/auth/logout',
      errors: {
        400: 'Bad request',
        401: 'Bad request',
      },
    });
  }
}

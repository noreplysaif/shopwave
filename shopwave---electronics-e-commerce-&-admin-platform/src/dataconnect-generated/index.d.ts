import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddUserSkillData {
  userSkill_insert: UserSkill_Key;
}

export interface AddUserSkillVariables {
  skillId: UUIDString;
  level: number;
}

export interface CreateLearningGoalData {
  learningGoal_insert: LearningGoal_Key;
}

export interface CreateLearningGoalVariables {
  title: string;
  description: string;
}

export interface CreateMentorshipSessionData {
  mentorshipSession_insert: MentorshipSession_Key;
}

export interface CreateMentorshipSessionVariables {
  scheduledAt: TimestampString;
  mentorId: UUIDString;
}

export interface CreateResourceData {
  resource_insert: Resource_Key;
}

export interface CreateResourceVariables {
  title: string;
  url: string;
  type: string;
}

export interface CreateSkillData {
  skill_insert: Skill_Key;
}

export interface CreateSkillVariables {
  name: string;
  category: string;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  displayName: string;
  email: string;
  role: string;
  bio: string;
}

export interface DeleteLearningGoalData {
  learningGoal_delete?: LearningGoal_Key | null;
}

export interface DeleteLearningGoalVariables {
  id: UUIDString;
}

export interface DeleteMentorshipSessionData {
  mentorshipSession_delete?: MentorshipSession_Key | null;
}

export interface DeleteMentorshipSessionVariables {
  id: UUIDString;
}

export interface DeleteResourceData {
  resource_delete?: Resource_Key | null;
}

export interface DeleteResourceVariables {
  id: UUIDString;
}

export interface DeleteSkillData {
  skill_delete?: Skill_Key | null;
}

export interface DeleteSkillVariables {
  id: UUIDString;
}

export interface DeleteUserData {
  user_delete?: User_Key | null;
}

export interface GetCurrentUserData {
  user?: {
    displayName: string;
    email: string;
    role: string;
    bio: string;
  };
}

export interface GetLearningGoalData {
  learningGoal?: {
    title: string;
    isCompleted: boolean;
  };
}

export interface GetLearningGoalVariables {
  id: UUIDString;
}

export interface GetMentorshipSessionData {
  mentorshipSession?: {
    scheduledAt: TimestampString;
    status: string;
    mentee: {
      displayName: string;
    };
    mentor: {
      displayName: string;
    };
  };
}

export interface GetMentorshipSessionVariables {
  id: UUIDString;
}

export interface GetResourceData {
  resource?: {
    title: string;
    url: string;
  };
}

export interface GetResourceVariables {
  id: UUIDString;
}

export interface GetSkillData {
  skill?: {
    name: string;
    category: string;
  };
}

export interface GetSkillVariables {
  id: UUIDString;
}

export interface GetUserSkillData {
  userSkill?: {
    level: number;
    skill: {
      name: string;
    };
  };
}

export interface GetUserSkillVariables {
  id: UUIDString;
}

export interface LearningGoal_Key {
  id: UUIDString;
  __typename?: 'LearningGoal_Key';
}

export interface ListMyGoalsData {
  learningGoals: ({
    title: string;
    isCompleted: boolean;
  })[];
}

export interface ListMySessionsData {
  mentorshipSessions: ({
    scheduledAt: TimestampString;
    status: string;
  })[];
}

export interface ListMySkillsData {
  userSkills: ({
    level: number;
    skill: {
      name: string;
    };
  })[];
}

export interface ListResourcesData {
  resources: ({
    title: string;
    type: string;
  })[];
}

export interface ListSkillsData {
  skills: ({
    name: string;
    category: string;
  })[];
}

export interface ListUsersData {
  users: ({
    displayName: string;
    role: string;
    industryFocus?: string | null;
  })[];
}

export interface MentorshipSession_Key {
  id: UUIDString;
  __typename?: 'MentorshipSession_Key';
}

export interface RemoveUserSkillData {
  userSkill_delete?: UserSkill_Key | null;
}

export interface RemoveUserSkillVariables {
  id: UUIDString;
}

export interface Resource_Key {
  id: UUIDString;
  __typename?: 'Resource_Key';
}

export interface Skill_Key {
  id: UUIDString;
  __typename?: 'Skill_Key';
}

export interface UpdateLearningGoalData {
  learningGoal_update?: LearningGoal_Key | null;
}

export interface UpdateLearningGoalVariables {
  id: UUIDString;
  isCompleted: boolean;
}

export interface UpdateResourceData {
  resource_update?: Resource_Key | null;
}

export interface UpdateResourceVariables {
  id: UUIDString;
  description?: string | null;
}

export interface UpdateSessionStatusData {
  mentorshipSession_update?: MentorshipSession_Key | null;
}

export interface UpdateSessionStatusVariables {
  id: UUIDString;
  status: string;
}

export interface UpdateSkillData {
  skill_update?: Skill_Key | null;
}

export interface UpdateSkillVariables {
  id: UUIDString;
  category: string;
}

export interface UpdateUserData {
  user_update?: User_Key | null;
}

export interface UpdateUserSkillLevelData {
  userSkill_update?: UserSkill_Key | null;
}

export interface UpdateUserSkillLevelVariables {
  id: UUIDString;
  level: number;
}

export interface UpdateUserVariables {
  displayName?: string | null;
  bio?: string | null;
}

export interface UserSkill_Key {
  id: UUIDString;
  __typename?: 'UserSkill_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;
export function updateUser(dc: DataConnect, vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface DeleteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
  operationName: string;
}
export const deleteUserRef: DeleteUserRef;

export function deleteUser(): MutationPromise<DeleteUserData, undefined>;
export function deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface GetCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
  operationName: string;
}
export const getCurrentUserRef: GetCurrentUserRef;

export function getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;
export function getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface CreateSkillRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSkillVariables): MutationRef<CreateSkillData, CreateSkillVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateSkillVariables): MutationRef<CreateSkillData, CreateSkillVariables>;
  operationName: string;
}
export const createSkillRef: CreateSkillRef;

export function createSkill(vars: CreateSkillVariables): MutationPromise<CreateSkillData, CreateSkillVariables>;
export function createSkill(dc: DataConnect, vars: CreateSkillVariables): MutationPromise<CreateSkillData, CreateSkillVariables>;

interface UpdateSkillRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSkillVariables): MutationRef<UpdateSkillData, UpdateSkillVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateSkillVariables): MutationRef<UpdateSkillData, UpdateSkillVariables>;
  operationName: string;
}
export const updateSkillRef: UpdateSkillRef;

export function updateSkill(vars: UpdateSkillVariables): MutationPromise<UpdateSkillData, UpdateSkillVariables>;
export function updateSkill(dc: DataConnect, vars: UpdateSkillVariables): MutationPromise<UpdateSkillData, UpdateSkillVariables>;

interface DeleteSkillRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSkillVariables): MutationRef<DeleteSkillData, DeleteSkillVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteSkillVariables): MutationRef<DeleteSkillData, DeleteSkillVariables>;
  operationName: string;
}
export const deleteSkillRef: DeleteSkillRef;

export function deleteSkill(vars: DeleteSkillVariables): MutationPromise<DeleteSkillData, DeleteSkillVariables>;
export function deleteSkill(dc: DataConnect, vars: DeleteSkillVariables): MutationPromise<DeleteSkillData, DeleteSkillVariables>;

interface GetSkillRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSkillVariables): QueryRef<GetSkillData, GetSkillVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetSkillVariables): QueryRef<GetSkillData, GetSkillVariables>;
  operationName: string;
}
export const getSkillRef: GetSkillRef;

export function getSkill(vars: GetSkillVariables, options?: ExecuteQueryOptions): QueryPromise<GetSkillData, GetSkillVariables>;
export function getSkill(dc: DataConnect, vars: GetSkillVariables, options?: ExecuteQueryOptions): QueryPromise<GetSkillData, GetSkillVariables>;

interface ListSkillsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSkillsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListSkillsData, undefined>;
  operationName: string;
}
export const listSkillsRef: ListSkillsRef;

export function listSkills(options?: ExecuteQueryOptions): QueryPromise<ListSkillsData, undefined>;
export function listSkills(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListSkillsData, undefined>;

interface CreateMentorshipSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMentorshipSessionVariables): MutationRef<CreateMentorshipSessionData, CreateMentorshipSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMentorshipSessionVariables): MutationRef<CreateMentorshipSessionData, CreateMentorshipSessionVariables>;
  operationName: string;
}
export const createMentorshipSessionRef: CreateMentorshipSessionRef;

export function createMentorshipSession(vars: CreateMentorshipSessionVariables): MutationPromise<CreateMentorshipSessionData, CreateMentorshipSessionVariables>;
export function createMentorshipSession(dc: DataConnect, vars: CreateMentorshipSessionVariables): MutationPromise<CreateMentorshipSessionData, CreateMentorshipSessionVariables>;

interface UpdateSessionStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSessionStatusVariables): MutationRef<UpdateSessionStatusData, UpdateSessionStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateSessionStatusVariables): MutationRef<UpdateSessionStatusData, UpdateSessionStatusVariables>;
  operationName: string;
}
export const updateSessionStatusRef: UpdateSessionStatusRef;

export function updateSessionStatus(vars: UpdateSessionStatusVariables): MutationPromise<UpdateSessionStatusData, UpdateSessionStatusVariables>;
export function updateSessionStatus(dc: DataConnect, vars: UpdateSessionStatusVariables): MutationPromise<UpdateSessionStatusData, UpdateSessionStatusVariables>;

interface DeleteMentorshipSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMentorshipSessionVariables): MutationRef<DeleteMentorshipSessionData, DeleteMentorshipSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteMentorshipSessionVariables): MutationRef<DeleteMentorshipSessionData, DeleteMentorshipSessionVariables>;
  operationName: string;
}
export const deleteMentorshipSessionRef: DeleteMentorshipSessionRef;

export function deleteMentorshipSession(vars: DeleteMentorshipSessionVariables): MutationPromise<DeleteMentorshipSessionData, DeleteMentorshipSessionVariables>;
export function deleteMentorshipSession(dc: DataConnect, vars: DeleteMentorshipSessionVariables): MutationPromise<DeleteMentorshipSessionData, DeleteMentorshipSessionVariables>;

interface GetMentorshipSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMentorshipSessionVariables): QueryRef<GetMentorshipSessionData, GetMentorshipSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMentorshipSessionVariables): QueryRef<GetMentorshipSessionData, GetMentorshipSessionVariables>;
  operationName: string;
}
export const getMentorshipSessionRef: GetMentorshipSessionRef;

export function getMentorshipSession(vars: GetMentorshipSessionVariables, options?: ExecuteQueryOptions): QueryPromise<GetMentorshipSessionData, GetMentorshipSessionVariables>;
export function getMentorshipSession(dc: DataConnect, vars: GetMentorshipSessionVariables, options?: ExecuteQueryOptions): QueryPromise<GetMentorshipSessionData, GetMentorshipSessionVariables>;

interface ListMySessionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMySessionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMySessionsData, undefined>;
  operationName: string;
}
export const listMySessionsRef: ListMySessionsRef;

export function listMySessions(options?: ExecuteQueryOptions): QueryPromise<ListMySessionsData, undefined>;
export function listMySessions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMySessionsData, undefined>;

interface CreateLearningGoalRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLearningGoalVariables): MutationRef<CreateLearningGoalData, CreateLearningGoalVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateLearningGoalVariables): MutationRef<CreateLearningGoalData, CreateLearningGoalVariables>;
  operationName: string;
}
export const createLearningGoalRef: CreateLearningGoalRef;

export function createLearningGoal(vars: CreateLearningGoalVariables): MutationPromise<CreateLearningGoalData, CreateLearningGoalVariables>;
export function createLearningGoal(dc: DataConnect, vars: CreateLearningGoalVariables): MutationPromise<CreateLearningGoalData, CreateLearningGoalVariables>;

interface UpdateLearningGoalRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateLearningGoalVariables): MutationRef<UpdateLearningGoalData, UpdateLearningGoalVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateLearningGoalVariables): MutationRef<UpdateLearningGoalData, UpdateLearningGoalVariables>;
  operationName: string;
}
export const updateLearningGoalRef: UpdateLearningGoalRef;

export function updateLearningGoal(vars: UpdateLearningGoalVariables): MutationPromise<UpdateLearningGoalData, UpdateLearningGoalVariables>;
export function updateLearningGoal(dc: DataConnect, vars: UpdateLearningGoalVariables): MutationPromise<UpdateLearningGoalData, UpdateLearningGoalVariables>;

interface DeleteLearningGoalRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteLearningGoalVariables): MutationRef<DeleteLearningGoalData, DeleteLearningGoalVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteLearningGoalVariables): MutationRef<DeleteLearningGoalData, DeleteLearningGoalVariables>;
  operationName: string;
}
export const deleteLearningGoalRef: DeleteLearningGoalRef;

export function deleteLearningGoal(vars: DeleteLearningGoalVariables): MutationPromise<DeleteLearningGoalData, DeleteLearningGoalVariables>;
export function deleteLearningGoal(dc: DataConnect, vars: DeleteLearningGoalVariables): MutationPromise<DeleteLearningGoalData, DeleteLearningGoalVariables>;

interface GetLearningGoalRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLearningGoalVariables): QueryRef<GetLearningGoalData, GetLearningGoalVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetLearningGoalVariables): QueryRef<GetLearningGoalData, GetLearningGoalVariables>;
  operationName: string;
}
export const getLearningGoalRef: GetLearningGoalRef;

export function getLearningGoal(vars: GetLearningGoalVariables, options?: ExecuteQueryOptions): QueryPromise<GetLearningGoalData, GetLearningGoalVariables>;
export function getLearningGoal(dc: DataConnect, vars: GetLearningGoalVariables, options?: ExecuteQueryOptions): QueryPromise<GetLearningGoalData, GetLearningGoalVariables>;

interface ListMyGoalsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyGoalsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyGoalsData, undefined>;
  operationName: string;
}
export const listMyGoalsRef: ListMyGoalsRef;

export function listMyGoals(options?: ExecuteQueryOptions): QueryPromise<ListMyGoalsData, undefined>;
export function listMyGoals(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyGoalsData, undefined>;

interface CreateResourceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateResourceVariables): MutationRef<CreateResourceData, CreateResourceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateResourceVariables): MutationRef<CreateResourceData, CreateResourceVariables>;
  operationName: string;
}
export const createResourceRef: CreateResourceRef;

export function createResource(vars: CreateResourceVariables): MutationPromise<CreateResourceData, CreateResourceVariables>;
export function createResource(dc: DataConnect, vars: CreateResourceVariables): MutationPromise<CreateResourceData, CreateResourceVariables>;

interface UpdateResourceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateResourceVariables): MutationRef<UpdateResourceData, UpdateResourceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateResourceVariables): MutationRef<UpdateResourceData, UpdateResourceVariables>;
  operationName: string;
}
export const updateResourceRef: UpdateResourceRef;

export function updateResource(vars: UpdateResourceVariables): MutationPromise<UpdateResourceData, UpdateResourceVariables>;
export function updateResource(dc: DataConnect, vars: UpdateResourceVariables): MutationPromise<UpdateResourceData, UpdateResourceVariables>;

interface DeleteResourceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteResourceVariables): MutationRef<DeleteResourceData, DeleteResourceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteResourceVariables): MutationRef<DeleteResourceData, DeleteResourceVariables>;
  operationName: string;
}
export const deleteResourceRef: DeleteResourceRef;

export function deleteResource(vars: DeleteResourceVariables): MutationPromise<DeleteResourceData, DeleteResourceVariables>;
export function deleteResource(dc: DataConnect, vars: DeleteResourceVariables): MutationPromise<DeleteResourceData, DeleteResourceVariables>;

interface GetResourceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetResourceVariables): QueryRef<GetResourceData, GetResourceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetResourceVariables): QueryRef<GetResourceData, GetResourceVariables>;
  operationName: string;
}
export const getResourceRef: GetResourceRef;

export function getResource(vars: GetResourceVariables, options?: ExecuteQueryOptions): QueryPromise<GetResourceData, GetResourceVariables>;
export function getResource(dc: DataConnect, vars: GetResourceVariables, options?: ExecuteQueryOptions): QueryPromise<GetResourceData, GetResourceVariables>;

interface ListResourcesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListResourcesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListResourcesData, undefined>;
  operationName: string;
}
export const listResourcesRef: ListResourcesRef;

export function listResources(options?: ExecuteQueryOptions): QueryPromise<ListResourcesData, undefined>;
export function listResources(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListResourcesData, undefined>;

interface AddUserSkillRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddUserSkillVariables): MutationRef<AddUserSkillData, AddUserSkillVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddUserSkillVariables): MutationRef<AddUserSkillData, AddUserSkillVariables>;
  operationName: string;
}
export const addUserSkillRef: AddUserSkillRef;

export function addUserSkill(vars: AddUserSkillVariables): MutationPromise<AddUserSkillData, AddUserSkillVariables>;
export function addUserSkill(dc: DataConnect, vars: AddUserSkillVariables): MutationPromise<AddUserSkillData, AddUserSkillVariables>;

interface UpdateUserSkillLevelRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserSkillLevelVariables): MutationRef<UpdateUserSkillLevelData, UpdateUserSkillLevelVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserSkillLevelVariables): MutationRef<UpdateUserSkillLevelData, UpdateUserSkillLevelVariables>;
  operationName: string;
}
export const updateUserSkillLevelRef: UpdateUserSkillLevelRef;

export function updateUserSkillLevel(vars: UpdateUserSkillLevelVariables): MutationPromise<UpdateUserSkillLevelData, UpdateUserSkillLevelVariables>;
export function updateUserSkillLevel(dc: DataConnect, vars: UpdateUserSkillLevelVariables): MutationPromise<UpdateUserSkillLevelData, UpdateUserSkillLevelVariables>;

interface RemoveUserSkillRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveUserSkillVariables): MutationRef<RemoveUserSkillData, RemoveUserSkillVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RemoveUserSkillVariables): MutationRef<RemoveUserSkillData, RemoveUserSkillVariables>;
  operationName: string;
}
export const removeUserSkillRef: RemoveUserSkillRef;

export function removeUserSkill(vars: RemoveUserSkillVariables): MutationPromise<RemoveUserSkillData, RemoveUserSkillVariables>;
export function removeUserSkill(dc: DataConnect, vars: RemoveUserSkillVariables): MutationPromise<RemoveUserSkillData, RemoveUserSkillVariables>;

interface GetUserSkillRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserSkillVariables): QueryRef<GetUserSkillData, GetUserSkillVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserSkillVariables): QueryRef<GetUserSkillData, GetUserSkillVariables>;
  operationName: string;
}
export const getUserSkillRef: GetUserSkillRef;

export function getUserSkill(vars: GetUserSkillVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserSkillData, GetUserSkillVariables>;
export function getUserSkill(dc: DataConnect, vars: GetUserSkillVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserSkillData, GetUserSkillVariables>;

interface ListMySkillsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMySkillsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMySkillsData, undefined>;
  operationName: string;
}
export const listMySkillsRef: ListMySkillsRef;

export function listMySkills(options?: ExecuteQueryOptions): QueryPromise<ListMySkillsData, undefined>;
export function listMySkills(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMySkillsData, undefined>;


import { CreateUserData, CreateUserVariables, UpdateUserData, UpdateUserVariables, DeleteUserData, GetCurrentUserData, ListUsersData, CreateSkillData, CreateSkillVariables, UpdateSkillData, UpdateSkillVariables, DeleteSkillData, DeleteSkillVariables, GetSkillData, GetSkillVariables, ListSkillsData, CreateMentorshipSessionData, CreateMentorshipSessionVariables, UpdateSessionStatusData, UpdateSessionStatusVariables, DeleteMentorshipSessionData, DeleteMentorshipSessionVariables, GetMentorshipSessionData, GetMentorshipSessionVariables, ListMySessionsData, CreateLearningGoalData, CreateLearningGoalVariables, UpdateLearningGoalData, UpdateLearningGoalVariables, DeleteLearningGoalData, DeleteLearningGoalVariables, GetLearningGoalData, GetLearningGoalVariables, ListMyGoalsData, CreateResourceData, CreateResourceVariables, UpdateResourceData, UpdateResourceVariables, DeleteResourceData, DeleteResourceVariables, GetResourceData, GetResourceVariables, ListResourcesData, AddUserSkillData, AddUserSkillVariables, UpdateUserSkillLevelData, UpdateUserSkillLevelVariables, RemoveUserSkillData, RemoveUserSkillVariables, GetUserSkillData, GetUserSkillVariables, ListMySkillsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useUpdateUser(options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables | void>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;
export function useUpdateUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables | void>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;

export function useDeleteUser(options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;
export function useDeleteUser(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;

export function useGetCurrentUser(options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;
export function useGetCurrentUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;

export function useListUsers(options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;
export function useListUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;

export function useCreateSkill(options?: useDataConnectMutationOptions<CreateSkillData, FirebaseError, CreateSkillVariables>): UseDataConnectMutationResult<CreateSkillData, CreateSkillVariables>;
export function useCreateSkill(dc: DataConnect, options?: useDataConnectMutationOptions<CreateSkillData, FirebaseError, CreateSkillVariables>): UseDataConnectMutationResult<CreateSkillData, CreateSkillVariables>;

export function useUpdateSkill(options?: useDataConnectMutationOptions<UpdateSkillData, FirebaseError, UpdateSkillVariables>): UseDataConnectMutationResult<UpdateSkillData, UpdateSkillVariables>;
export function useUpdateSkill(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateSkillData, FirebaseError, UpdateSkillVariables>): UseDataConnectMutationResult<UpdateSkillData, UpdateSkillVariables>;

export function useDeleteSkill(options?: useDataConnectMutationOptions<DeleteSkillData, FirebaseError, DeleteSkillVariables>): UseDataConnectMutationResult<DeleteSkillData, DeleteSkillVariables>;
export function useDeleteSkill(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteSkillData, FirebaseError, DeleteSkillVariables>): UseDataConnectMutationResult<DeleteSkillData, DeleteSkillVariables>;

export function useGetSkill(vars: GetSkillVariables, options?: useDataConnectQueryOptions<GetSkillData>): UseDataConnectQueryResult<GetSkillData, GetSkillVariables>;
export function useGetSkill(dc: DataConnect, vars: GetSkillVariables, options?: useDataConnectQueryOptions<GetSkillData>): UseDataConnectQueryResult<GetSkillData, GetSkillVariables>;

export function useListSkills(options?: useDataConnectQueryOptions<ListSkillsData>): UseDataConnectQueryResult<ListSkillsData, undefined>;
export function useListSkills(dc: DataConnect, options?: useDataConnectQueryOptions<ListSkillsData>): UseDataConnectQueryResult<ListSkillsData, undefined>;

export function useCreateMentorshipSession(options?: useDataConnectMutationOptions<CreateMentorshipSessionData, FirebaseError, CreateMentorshipSessionVariables>): UseDataConnectMutationResult<CreateMentorshipSessionData, CreateMentorshipSessionVariables>;
export function useCreateMentorshipSession(dc: DataConnect, options?: useDataConnectMutationOptions<CreateMentorshipSessionData, FirebaseError, CreateMentorshipSessionVariables>): UseDataConnectMutationResult<CreateMentorshipSessionData, CreateMentorshipSessionVariables>;

export function useUpdateSessionStatus(options?: useDataConnectMutationOptions<UpdateSessionStatusData, FirebaseError, UpdateSessionStatusVariables>): UseDataConnectMutationResult<UpdateSessionStatusData, UpdateSessionStatusVariables>;
export function useUpdateSessionStatus(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateSessionStatusData, FirebaseError, UpdateSessionStatusVariables>): UseDataConnectMutationResult<UpdateSessionStatusData, UpdateSessionStatusVariables>;

export function useDeleteMentorshipSession(options?: useDataConnectMutationOptions<DeleteMentorshipSessionData, FirebaseError, DeleteMentorshipSessionVariables>): UseDataConnectMutationResult<DeleteMentorshipSessionData, DeleteMentorshipSessionVariables>;
export function useDeleteMentorshipSession(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteMentorshipSessionData, FirebaseError, DeleteMentorshipSessionVariables>): UseDataConnectMutationResult<DeleteMentorshipSessionData, DeleteMentorshipSessionVariables>;

export function useGetMentorshipSession(vars: GetMentorshipSessionVariables, options?: useDataConnectQueryOptions<GetMentorshipSessionData>): UseDataConnectQueryResult<GetMentorshipSessionData, GetMentorshipSessionVariables>;
export function useGetMentorshipSession(dc: DataConnect, vars: GetMentorshipSessionVariables, options?: useDataConnectQueryOptions<GetMentorshipSessionData>): UseDataConnectQueryResult<GetMentorshipSessionData, GetMentorshipSessionVariables>;

export function useListMySessions(options?: useDataConnectQueryOptions<ListMySessionsData>): UseDataConnectQueryResult<ListMySessionsData, undefined>;
export function useListMySessions(dc: DataConnect, options?: useDataConnectQueryOptions<ListMySessionsData>): UseDataConnectQueryResult<ListMySessionsData, undefined>;

export function useCreateLearningGoal(options?: useDataConnectMutationOptions<CreateLearningGoalData, FirebaseError, CreateLearningGoalVariables>): UseDataConnectMutationResult<CreateLearningGoalData, CreateLearningGoalVariables>;
export function useCreateLearningGoal(dc: DataConnect, options?: useDataConnectMutationOptions<CreateLearningGoalData, FirebaseError, CreateLearningGoalVariables>): UseDataConnectMutationResult<CreateLearningGoalData, CreateLearningGoalVariables>;

export function useUpdateLearningGoal(options?: useDataConnectMutationOptions<UpdateLearningGoalData, FirebaseError, UpdateLearningGoalVariables>): UseDataConnectMutationResult<UpdateLearningGoalData, UpdateLearningGoalVariables>;
export function useUpdateLearningGoal(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateLearningGoalData, FirebaseError, UpdateLearningGoalVariables>): UseDataConnectMutationResult<UpdateLearningGoalData, UpdateLearningGoalVariables>;

export function useDeleteLearningGoal(options?: useDataConnectMutationOptions<DeleteLearningGoalData, FirebaseError, DeleteLearningGoalVariables>): UseDataConnectMutationResult<DeleteLearningGoalData, DeleteLearningGoalVariables>;
export function useDeleteLearningGoal(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteLearningGoalData, FirebaseError, DeleteLearningGoalVariables>): UseDataConnectMutationResult<DeleteLearningGoalData, DeleteLearningGoalVariables>;

export function useGetLearningGoal(vars: GetLearningGoalVariables, options?: useDataConnectQueryOptions<GetLearningGoalData>): UseDataConnectQueryResult<GetLearningGoalData, GetLearningGoalVariables>;
export function useGetLearningGoal(dc: DataConnect, vars: GetLearningGoalVariables, options?: useDataConnectQueryOptions<GetLearningGoalData>): UseDataConnectQueryResult<GetLearningGoalData, GetLearningGoalVariables>;

export function useListMyGoals(options?: useDataConnectQueryOptions<ListMyGoalsData>): UseDataConnectQueryResult<ListMyGoalsData, undefined>;
export function useListMyGoals(dc: DataConnect, options?: useDataConnectQueryOptions<ListMyGoalsData>): UseDataConnectQueryResult<ListMyGoalsData, undefined>;

export function useCreateResource(options?: useDataConnectMutationOptions<CreateResourceData, FirebaseError, CreateResourceVariables>): UseDataConnectMutationResult<CreateResourceData, CreateResourceVariables>;
export function useCreateResource(dc: DataConnect, options?: useDataConnectMutationOptions<CreateResourceData, FirebaseError, CreateResourceVariables>): UseDataConnectMutationResult<CreateResourceData, CreateResourceVariables>;

export function useUpdateResource(options?: useDataConnectMutationOptions<UpdateResourceData, FirebaseError, UpdateResourceVariables>): UseDataConnectMutationResult<UpdateResourceData, UpdateResourceVariables>;
export function useUpdateResource(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateResourceData, FirebaseError, UpdateResourceVariables>): UseDataConnectMutationResult<UpdateResourceData, UpdateResourceVariables>;

export function useDeleteResource(options?: useDataConnectMutationOptions<DeleteResourceData, FirebaseError, DeleteResourceVariables>): UseDataConnectMutationResult<DeleteResourceData, DeleteResourceVariables>;
export function useDeleteResource(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteResourceData, FirebaseError, DeleteResourceVariables>): UseDataConnectMutationResult<DeleteResourceData, DeleteResourceVariables>;

export function useGetResource(vars: GetResourceVariables, options?: useDataConnectQueryOptions<GetResourceData>): UseDataConnectQueryResult<GetResourceData, GetResourceVariables>;
export function useGetResource(dc: DataConnect, vars: GetResourceVariables, options?: useDataConnectQueryOptions<GetResourceData>): UseDataConnectQueryResult<GetResourceData, GetResourceVariables>;

export function useListResources(options?: useDataConnectQueryOptions<ListResourcesData>): UseDataConnectQueryResult<ListResourcesData, undefined>;
export function useListResources(dc: DataConnect, options?: useDataConnectQueryOptions<ListResourcesData>): UseDataConnectQueryResult<ListResourcesData, undefined>;

export function useAddUserSkill(options?: useDataConnectMutationOptions<AddUserSkillData, FirebaseError, AddUserSkillVariables>): UseDataConnectMutationResult<AddUserSkillData, AddUserSkillVariables>;
export function useAddUserSkill(dc: DataConnect, options?: useDataConnectMutationOptions<AddUserSkillData, FirebaseError, AddUserSkillVariables>): UseDataConnectMutationResult<AddUserSkillData, AddUserSkillVariables>;

export function useUpdateUserSkillLevel(options?: useDataConnectMutationOptions<UpdateUserSkillLevelData, FirebaseError, UpdateUserSkillLevelVariables>): UseDataConnectMutationResult<UpdateUserSkillLevelData, UpdateUserSkillLevelVariables>;
export function useUpdateUserSkillLevel(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserSkillLevelData, FirebaseError, UpdateUserSkillLevelVariables>): UseDataConnectMutationResult<UpdateUserSkillLevelData, UpdateUserSkillLevelVariables>;

export function useRemoveUserSkill(options?: useDataConnectMutationOptions<RemoveUserSkillData, FirebaseError, RemoveUserSkillVariables>): UseDataConnectMutationResult<RemoveUserSkillData, RemoveUserSkillVariables>;
export function useRemoveUserSkill(dc: DataConnect, options?: useDataConnectMutationOptions<RemoveUserSkillData, FirebaseError, RemoveUserSkillVariables>): UseDataConnectMutationResult<RemoveUserSkillData, RemoveUserSkillVariables>;

export function useGetUserSkill(vars: GetUserSkillVariables, options?: useDataConnectQueryOptions<GetUserSkillData>): UseDataConnectQueryResult<GetUserSkillData, GetUserSkillVariables>;
export function useGetUserSkill(dc: DataConnect, vars: GetUserSkillVariables, options?: useDataConnectQueryOptions<GetUserSkillData>): UseDataConnectQueryResult<GetUserSkillData, GetUserSkillVariables>;

export function useListMySkills(options?: useDataConnectQueryOptions<ListMySkillsData>): UseDataConnectQueryResult<ListMySkillsData, undefined>;
export function useListMySkills(dc: DataConnect, options?: useDataConnectQueryOptions<ListMySkillsData>): UseDataConnectQueryResult<ListMySkillsData, undefined>;

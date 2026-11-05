# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCurrentUser*](#getcurrentuser)
  - [*ListUsers*](#listusers)
  - [*GetSkill*](#getskill)
  - [*ListSkills*](#listskills)
  - [*GetMentorshipSession*](#getmentorshipsession)
  - [*ListMySessions*](#listmysessions)
  - [*GetLearningGoal*](#getlearninggoal)
  - [*ListMyGoals*](#listmygoals)
  - [*GetResource*](#getresource)
  - [*ListResources*](#listresources)
  - [*GetUserSkill*](#getuserskill)
  - [*ListMySkills*](#listmyskills)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateUser*](#updateuser)
  - [*DeleteUser*](#deleteuser)
  - [*CreateSkill*](#createskill)
  - [*UpdateSkill*](#updateskill)
  - [*DeleteSkill*](#deleteskill)
  - [*CreateMentorshipSession*](#creatementorshipsession)
  - [*UpdateSessionStatus*](#updatesessionstatus)
  - [*DeleteMentorshipSession*](#deletementorshipsession)
  - [*CreateLearningGoal*](#createlearninggoal)
  - [*UpdateLearningGoal*](#updatelearninggoal)
  - [*DeleteLearningGoal*](#deletelearninggoal)
  - [*CreateResource*](#createresource)
  - [*UpdateResource*](#updateresource)
  - [*DeleteResource*](#deleteresource)
  - [*AddUserSkill*](#adduserskill)
  - [*UpdateUserSkillLevel*](#updateuserskilllevel)
  - [*RemoveUserSkill*](#removeuserskill)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetCurrentUser
You can execute the `GetCurrentUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCurrentUserRef:
```typescript
const name = getCurrentUserRef.operationName;
console.log(name);
```

### Variables
The `GetCurrentUser` query has no variables.
### Return Type
Recall that executing the `GetCurrentUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCurrentUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCurrentUserData {
  user?: {
    displayName: string;
    email: string;
    role: string;
    bio: string;
  };
}
```
### Using `GetCurrentUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentUser } from '@dataconnect/generated';


// Call the `getCurrentUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getCurrentUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetCurrentUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserRef } from '@dataconnect/generated';


// Call the `getCurrentUserRef()` function to get a reference to the query.
const ref = getCurrentUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCurrentUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersRef:
```typescript
const name = listUsersRef.operationName;
console.log(name);
```

### Variables
The `ListUsers` query has no variables.
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersData {
  users: ({
    displayName: string;
    role: string;
    industryFocus?: string | null;
  })[];
}
```
### Using `ListUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@dataconnect/generated';


// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef } from '@dataconnect/generated';


// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetSkill
You can execute the `GetSkill` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getSkill(vars: GetSkillVariables, options?: ExecuteQueryOptions): QueryPromise<GetSkillData, GetSkillVariables>;

interface GetSkillRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSkillVariables): QueryRef<GetSkillData, GetSkillVariables>;
}
export const getSkillRef: GetSkillRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getSkill(dc: DataConnect, vars: GetSkillVariables, options?: ExecuteQueryOptions): QueryPromise<GetSkillData, GetSkillVariables>;

interface GetSkillRef {
  ...
  (dc: DataConnect, vars: GetSkillVariables): QueryRef<GetSkillData, GetSkillVariables>;
}
export const getSkillRef: GetSkillRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getSkillRef:
```typescript
const name = getSkillRef.operationName;
console.log(name);
```

### Variables
The `GetSkill` query requires an argument of type `GetSkillVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetSkillVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetSkill` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetSkillData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetSkillData {
  skill?: {
    name: string;
    category: string;
  };
}
```
### Using `GetSkill`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getSkill, GetSkillVariables } from '@dataconnect/generated';

// The `GetSkill` query requires an argument of type `GetSkillVariables`:
const getSkillVars: GetSkillVariables = {
  id: ..., 
};

// Call the `getSkill()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getSkill(getSkillVars);
// Variables can be defined inline as well.
const { data } = await getSkill({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getSkill(dataConnect, getSkillVars);

console.log(data.skill);

// Or, you can use the `Promise` API.
getSkill(getSkillVars).then((response) => {
  const data = response.data;
  console.log(data.skill);
});
```

### Using `GetSkill`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getSkillRef, GetSkillVariables } from '@dataconnect/generated';

// The `GetSkill` query requires an argument of type `GetSkillVariables`:
const getSkillVars: GetSkillVariables = {
  id: ..., 
};

// Call the `getSkillRef()` function to get a reference to the query.
const ref = getSkillRef(getSkillVars);
// Variables can be defined inline as well.
const ref = getSkillRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getSkillRef(dataConnect, getSkillVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.skill);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.skill);
});
```

## ListSkills
You can execute the `ListSkills` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listSkills(options?: ExecuteQueryOptions): QueryPromise<ListSkillsData, undefined>;

interface ListSkillsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSkillsData, undefined>;
}
export const listSkillsRef: ListSkillsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listSkills(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListSkillsData, undefined>;

interface ListSkillsRef {
  ...
  (dc: DataConnect): QueryRef<ListSkillsData, undefined>;
}
export const listSkillsRef: ListSkillsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listSkillsRef:
```typescript
const name = listSkillsRef.operationName;
console.log(name);
```

### Variables
The `ListSkills` query has no variables.
### Return Type
Recall that executing the `ListSkills` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListSkillsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListSkillsData {
  skills: ({
    name: string;
    category: string;
  })[];
}
```
### Using `ListSkills`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listSkills } from '@dataconnect/generated';


// Call the `listSkills()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listSkills();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listSkills(dataConnect);

console.log(data.skills);

// Or, you can use the `Promise` API.
listSkills().then((response) => {
  const data = response.data;
  console.log(data.skills);
});
```

### Using `ListSkills`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listSkillsRef } from '@dataconnect/generated';


// Call the `listSkillsRef()` function to get a reference to the query.
const ref = listSkillsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listSkillsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.skills);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.skills);
});
```

## GetMentorshipSession
You can execute the `GetMentorshipSession` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMentorshipSession(vars: GetMentorshipSessionVariables, options?: ExecuteQueryOptions): QueryPromise<GetMentorshipSessionData, GetMentorshipSessionVariables>;

interface GetMentorshipSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMentorshipSessionVariables): QueryRef<GetMentorshipSessionData, GetMentorshipSessionVariables>;
}
export const getMentorshipSessionRef: GetMentorshipSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMentorshipSession(dc: DataConnect, vars: GetMentorshipSessionVariables, options?: ExecuteQueryOptions): QueryPromise<GetMentorshipSessionData, GetMentorshipSessionVariables>;

interface GetMentorshipSessionRef {
  ...
  (dc: DataConnect, vars: GetMentorshipSessionVariables): QueryRef<GetMentorshipSessionData, GetMentorshipSessionVariables>;
}
export const getMentorshipSessionRef: GetMentorshipSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMentorshipSessionRef:
```typescript
const name = getMentorshipSessionRef.operationName;
console.log(name);
```

### Variables
The `GetMentorshipSession` query requires an argument of type `GetMentorshipSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMentorshipSessionVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetMentorshipSession` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMentorshipSessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMentorshipSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMentorshipSession, GetMentorshipSessionVariables } from '@dataconnect/generated';

// The `GetMentorshipSession` query requires an argument of type `GetMentorshipSessionVariables`:
const getMentorshipSessionVars: GetMentorshipSessionVariables = {
  id: ..., 
};

// Call the `getMentorshipSession()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMentorshipSession(getMentorshipSessionVars);
// Variables can be defined inline as well.
const { data } = await getMentorshipSession({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMentorshipSession(dataConnect, getMentorshipSessionVars);

console.log(data.mentorshipSession);

// Or, you can use the `Promise` API.
getMentorshipSession(getMentorshipSessionVars).then((response) => {
  const data = response.data;
  console.log(data.mentorshipSession);
});
```

### Using `GetMentorshipSession`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMentorshipSessionRef, GetMentorshipSessionVariables } from '@dataconnect/generated';

// The `GetMentorshipSession` query requires an argument of type `GetMentorshipSessionVariables`:
const getMentorshipSessionVars: GetMentorshipSessionVariables = {
  id: ..., 
};

// Call the `getMentorshipSessionRef()` function to get a reference to the query.
const ref = getMentorshipSessionRef(getMentorshipSessionVars);
// Variables can be defined inline as well.
const ref = getMentorshipSessionRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMentorshipSessionRef(dataConnect, getMentorshipSessionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.mentorshipSession);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.mentorshipSession);
});
```

## ListMySessions
You can execute the `ListMySessions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMySessions(options?: ExecuteQueryOptions): QueryPromise<ListMySessionsData, undefined>;

interface ListMySessionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMySessionsData, undefined>;
}
export const listMySessionsRef: ListMySessionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMySessions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMySessionsData, undefined>;

interface ListMySessionsRef {
  ...
  (dc: DataConnect): QueryRef<ListMySessionsData, undefined>;
}
export const listMySessionsRef: ListMySessionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMySessionsRef:
```typescript
const name = listMySessionsRef.operationName;
console.log(name);
```

### Variables
The `ListMySessions` query has no variables.
### Return Type
Recall that executing the `ListMySessions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMySessionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMySessionsData {
  mentorshipSessions: ({
    scheduledAt: TimestampString;
    status: string;
  })[];
}
```
### Using `ListMySessions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMySessions } from '@dataconnect/generated';


// Call the `listMySessions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMySessions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMySessions(dataConnect);

console.log(data.mentorshipSessions);

// Or, you can use the `Promise` API.
listMySessions().then((response) => {
  const data = response.data;
  console.log(data.mentorshipSessions);
});
```

### Using `ListMySessions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMySessionsRef } from '@dataconnect/generated';


// Call the `listMySessionsRef()` function to get a reference to the query.
const ref = listMySessionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMySessionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.mentorshipSessions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.mentorshipSessions);
});
```

## GetLearningGoal
You can execute the `GetLearningGoal` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getLearningGoal(vars: GetLearningGoalVariables, options?: ExecuteQueryOptions): QueryPromise<GetLearningGoalData, GetLearningGoalVariables>;

interface GetLearningGoalRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLearningGoalVariables): QueryRef<GetLearningGoalData, GetLearningGoalVariables>;
}
export const getLearningGoalRef: GetLearningGoalRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLearningGoal(dc: DataConnect, vars: GetLearningGoalVariables, options?: ExecuteQueryOptions): QueryPromise<GetLearningGoalData, GetLearningGoalVariables>;

interface GetLearningGoalRef {
  ...
  (dc: DataConnect, vars: GetLearningGoalVariables): QueryRef<GetLearningGoalData, GetLearningGoalVariables>;
}
export const getLearningGoalRef: GetLearningGoalRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLearningGoalRef:
```typescript
const name = getLearningGoalRef.operationName;
console.log(name);
```

### Variables
The `GetLearningGoal` query requires an argument of type `GetLearningGoalVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetLearningGoalVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetLearningGoal` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLearningGoalData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetLearningGoalData {
  learningGoal?: {
    title: string;
    isCompleted: boolean;
  };
}
```
### Using `GetLearningGoal`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLearningGoal, GetLearningGoalVariables } from '@dataconnect/generated';

// The `GetLearningGoal` query requires an argument of type `GetLearningGoalVariables`:
const getLearningGoalVars: GetLearningGoalVariables = {
  id: ..., 
};

// Call the `getLearningGoal()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLearningGoal(getLearningGoalVars);
// Variables can be defined inline as well.
const { data } = await getLearningGoal({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLearningGoal(dataConnect, getLearningGoalVars);

console.log(data.learningGoal);

// Or, you can use the `Promise` API.
getLearningGoal(getLearningGoalVars).then((response) => {
  const data = response.data;
  console.log(data.learningGoal);
});
```

### Using `GetLearningGoal`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLearningGoalRef, GetLearningGoalVariables } from '@dataconnect/generated';

// The `GetLearningGoal` query requires an argument of type `GetLearningGoalVariables`:
const getLearningGoalVars: GetLearningGoalVariables = {
  id: ..., 
};

// Call the `getLearningGoalRef()` function to get a reference to the query.
const ref = getLearningGoalRef(getLearningGoalVars);
// Variables can be defined inline as well.
const ref = getLearningGoalRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLearningGoalRef(dataConnect, getLearningGoalVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.learningGoal);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.learningGoal);
});
```

## ListMyGoals
You can execute the `ListMyGoals` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyGoals(options?: ExecuteQueryOptions): QueryPromise<ListMyGoalsData, undefined>;

interface ListMyGoalsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyGoalsData, undefined>;
}
export const listMyGoalsRef: ListMyGoalsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyGoals(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyGoalsData, undefined>;

interface ListMyGoalsRef {
  ...
  (dc: DataConnect): QueryRef<ListMyGoalsData, undefined>;
}
export const listMyGoalsRef: ListMyGoalsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyGoalsRef:
```typescript
const name = listMyGoalsRef.operationName;
console.log(name);
```

### Variables
The `ListMyGoals` query has no variables.
### Return Type
Recall that executing the `ListMyGoals` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyGoalsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMyGoalsData {
  learningGoals: ({
    title: string;
    isCompleted: boolean;
  })[];
}
```
### Using `ListMyGoals`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyGoals } from '@dataconnect/generated';


// Call the `listMyGoals()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyGoals();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyGoals(dataConnect);

console.log(data.learningGoals);

// Or, you can use the `Promise` API.
listMyGoals().then((response) => {
  const data = response.data;
  console.log(data.learningGoals);
});
```

### Using `ListMyGoals`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyGoalsRef } from '@dataconnect/generated';


// Call the `listMyGoalsRef()` function to get a reference to the query.
const ref = listMyGoalsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyGoalsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.learningGoals);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.learningGoals);
});
```

## GetResource
You can execute the `GetResource` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getResource(vars: GetResourceVariables, options?: ExecuteQueryOptions): QueryPromise<GetResourceData, GetResourceVariables>;

interface GetResourceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetResourceVariables): QueryRef<GetResourceData, GetResourceVariables>;
}
export const getResourceRef: GetResourceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getResource(dc: DataConnect, vars: GetResourceVariables, options?: ExecuteQueryOptions): QueryPromise<GetResourceData, GetResourceVariables>;

interface GetResourceRef {
  ...
  (dc: DataConnect, vars: GetResourceVariables): QueryRef<GetResourceData, GetResourceVariables>;
}
export const getResourceRef: GetResourceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getResourceRef:
```typescript
const name = getResourceRef.operationName;
console.log(name);
```

### Variables
The `GetResource` query requires an argument of type `GetResourceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetResourceVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetResource` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetResourceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetResourceData {
  resource?: {
    title: string;
    url: string;
  };
}
```
### Using `GetResource`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getResource, GetResourceVariables } from '@dataconnect/generated';

// The `GetResource` query requires an argument of type `GetResourceVariables`:
const getResourceVars: GetResourceVariables = {
  id: ..., 
};

// Call the `getResource()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getResource(getResourceVars);
// Variables can be defined inline as well.
const { data } = await getResource({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getResource(dataConnect, getResourceVars);

console.log(data.resource);

// Or, you can use the `Promise` API.
getResource(getResourceVars).then((response) => {
  const data = response.data;
  console.log(data.resource);
});
```

### Using `GetResource`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getResourceRef, GetResourceVariables } from '@dataconnect/generated';

// The `GetResource` query requires an argument of type `GetResourceVariables`:
const getResourceVars: GetResourceVariables = {
  id: ..., 
};

// Call the `getResourceRef()` function to get a reference to the query.
const ref = getResourceRef(getResourceVars);
// Variables can be defined inline as well.
const ref = getResourceRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getResourceRef(dataConnect, getResourceVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.resource);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.resource);
});
```

## ListResources
You can execute the `ListResources` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listResources(options?: ExecuteQueryOptions): QueryPromise<ListResourcesData, undefined>;

interface ListResourcesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListResourcesData, undefined>;
}
export const listResourcesRef: ListResourcesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listResources(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListResourcesData, undefined>;

interface ListResourcesRef {
  ...
  (dc: DataConnect): QueryRef<ListResourcesData, undefined>;
}
export const listResourcesRef: ListResourcesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listResourcesRef:
```typescript
const name = listResourcesRef.operationName;
console.log(name);
```

### Variables
The `ListResources` query has no variables.
### Return Type
Recall that executing the `ListResources` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListResourcesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListResourcesData {
  resources: ({
    title: string;
    type: string;
  })[];
}
```
### Using `ListResources`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listResources } from '@dataconnect/generated';


// Call the `listResources()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listResources();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listResources(dataConnect);

console.log(data.resources);

// Or, you can use the `Promise` API.
listResources().then((response) => {
  const data = response.data;
  console.log(data.resources);
});
```

### Using `ListResources`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listResourcesRef } from '@dataconnect/generated';


// Call the `listResourcesRef()` function to get a reference to the query.
const ref = listResourcesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listResourcesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.resources);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.resources);
});
```

## GetUserSkill
You can execute the `GetUserSkill` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserSkill(vars: GetUserSkillVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserSkillData, GetUserSkillVariables>;

interface GetUserSkillRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserSkillVariables): QueryRef<GetUserSkillData, GetUserSkillVariables>;
}
export const getUserSkillRef: GetUserSkillRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserSkill(dc: DataConnect, vars: GetUserSkillVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserSkillData, GetUserSkillVariables>;

interface GetUserSkillRef {
  ...
  (dc: DataConnect, vars: GetUserSkillVariables): QueryRef<GetUserSkillData, GetUserSkillVariables>;
}
export const getUserSkillRef: GetUserSkillRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserSkillRef:
```typescript
const name = getUserSkillRef.operationName;
console.log(name);
```

### Variables
The `GetUserSkill` query requires an argument of type `GetUserSkillVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserSkillVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetUserSkill` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserSkillData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserSkillData {
  userSkill?: {
    level: number;
    skill: {
      name: string;
    };
  };
}
```
### Using `GetUserSkill`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserSkill, GetUserSkillVariables } from '@dataconnect/generated';

// The `GetUserSkill` query requires an argument of type `GetUserSkillVariables`:
const getUserSkillVars: GetUserSkillVariables = {
  id: ..., 
};

// Call the `getUserSkill()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserSkill(getUserSkillVars);
// Variables can be defined inline as well.
const { data } = await getUserSkill({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserSkill(dataConnect, getUserSkillVars);

console.log(data.userSkill);

// Or, you can use the `Promise` API.
getUserSkill(getUserSkillVars).then((response) => {
  const data = response.data;
  console.log(data.userSkill);
});
```

### Using `GetUserSkill`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserSkillRef, GetUserSkillVariables } from '@dataconnect/generated';

// The `GetUserSkill` query requires an argument of type `GetUserSkillVariables`:
const getUserSkillVars: GetUserSkillVariables = {
  id: ..., 
};

// Call the `getUserSkillRef()` function to get a reference to the query.
const ref = getUserSkillRef(getUserSkillVars);
// Variables can be defined inline as well.
const ref = getUserSkillRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserSkillRef(dataConnect, getUserSkillVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.userSkill);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.userSkill);
});
```

## ListMySkills
You can execute the `ListMySkills` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMySkills(options?: ExecuteQueryOptions): QueryPromise<ListMySkillsData, undefined>;

interface ListMySkillsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMySkillsData, undefined>;
}
export const listMySkillsRef: ListMySkillsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMySkills(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMySkillsData, undefined>;

interface ListMySkillsRef {
  ...
  (dc: DataConnect): QueryRef<ListMySkillsData, undefined>;
}
export const listMySkillsRef: ListMySkillsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMySkillsRef:
```typescript
const name = listMySkillsRef.operationName;
console.log(name);
```

### Variables
The `ListMySkills` query has no variables.
### Return Type
Recall that executing the `ListMySkills` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMySkillsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMySkillsData {
  userSkills: ({
    level: number;
    skill: {
      name: string;
    };
  })[];
}
```
### Using `ListMySkills`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMySkills } from '@dataconnect/generated';


// Call the `listMySkills()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMySkills();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMySkills(dataConnect);

console.log(data.userSkills);

// Or, you can use the `Promise` API.
listMySkills().then((response) => {
  const data = response.data;
  console.log(data.userSkills);
});
```

### Using `ListMySkills`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMySkillsRef } from '@dataconnect/generated';


// Call the `listMySkillsRef()` function to get a reference to the query.
const ref = listMySkillsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMySkillsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.userSkills);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.userSkills);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  displayName: string;
  email: string;
  role: string;
  bio: string;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  displayName: ..., 
  email: ..., 
  role: ..., 
  bio: ..., 
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ displayName: ..., email: ..., role: ..., bio: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  displayName: ..., 
  email: ..., 
  role: ..., 
  bio: ..., 
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ displayName: ..., email: ..., role: ..., bio: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUser
You can execute the `UpdateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUser(vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUser(dc: DataConnect, vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  (dc: DataConnect, vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRef:
```typescript
const name = updateUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserVariables {
  displayName?: string | null;
  bio?: string | null;
}
```
### Return Type
Recall that executing the `UpdateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUser, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  displayName: ..., // optional
  bio: ..., // optional
};

// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser(updateUserVars);
// Variables can be defined inline as well.
const { data } = await updateUser({ displayName: ..., bio: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateUserVariables` argument.
const { data } = await updateUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUser(dataConnect, updateUserVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUser(updateUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRef, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  displayName: ..., // optional
  bio: ..., // optional
};

// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef(updateUserVars);
// Variables can be defined inline as well.
const ref = updateUserRef({ displayName: ..., bio: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateUserVariables` argument.
const ref = updateUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRef(dataConnect, updateUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DeleteUser
You can execute the `DeleteUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteUser(): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteUserRef:
```typescript
const name = deleteUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteUser` mutation has no variables.
### Return Type
Recall that executing the `DeleteUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```
### Using `DeleteUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteUser } from '@dataconnect/generated';


// Call the `deleteUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteUser(dataConnect);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
deleteUser().then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

### Using `DeleteUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteUserRef } from '@dataconnect/generated';


// Call the `deleteUserRef()` function to get a reference to the mutation.
const ref = deleteUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

## CreateSkill
You can execute the `CreateSkill` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createSkill(vars: CreateSkillVariables): MutationPromise<CreateSkillData, CreateSkillVariables>;

interface CreateSkillRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSkillVariables): MutationRef<CreateSkillData, CreateSkillVariables>;
}
export const createSkillRef: CreateSkillRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createSkill(dc: DataConnect, vars: CreateSkillVariables): MutationPromise<CreateSkillData, CreateSkillVariables>;

interface CreateSkillRef {
  ...
  (dc: DataConnect, vars: CreateSkillVariables): MutationRef<CreateSkillData, CreateSkillVariables>;
}
export const createSkillRef: CreateSkillRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createSkillRef:
```typescript
const name = createSkillRef.operationName;
console.log(name);
```

### Variables
The `CreateSkill` mutation requires an argument of type `CreateSkillVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateSkillVariables {
  name: string;
  category: string;
}
```
### Return Type
Recall that executing the `CreateSkill` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateSkillData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateSkillData {
  skill_insert: Skill_Key;
}
```
### Using `CreateSkill`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSkill, CreateSkillVariables } from '@dataconnect/generated';

// The `CreateSkill` mutation requires an argument of type `CreateSkillVariables`:
const createSkillVars: CreateSkillVariables = {
  name: ..., 
  category: ..., 
};

// Call the `createSkill()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSkill(createSkillVars);
// Variables can be defined inline as well.
const { data } = await createSkill({ name: ..., category: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createSkill(dataConnect, createSkillVars);

console.log(data.skill_insert);

// Or, you can use the `Promise` API.
createSkill(createSkillVars).then((response) => {
  const data = response.data;
  console.log(data.skill_insert);
});
```

### Using `CreateSkill`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createSkillRef, CreateSkillVariables } from '@dataconnect/generated';

// The `CreateSkill` mutation requires an argument of type `CreateSkillVariables`:
const createSkillVars: CreateSkillVariables = {
  name: ..., 
  category: ..., 
};

// Call the `createSkillRef()` function to get a reference to the mutation.
const ref = createSkillRef(createSkillVars);
// Variables can be defined inline as well.
const ref = createSkillRef({ name: ..., category: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createSkillRef(dataConnect, createSkillVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.skill_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.skill_insert);
});
```

## UpdateSkill
You can execute the `UpdateSkill` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateSkill(vars: UpdateSkillVariables): MutationPromise<UpdateSkillData, UpdateSkillVariables>;

interface UpdateSkillRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSkillVariables): MutationRef<UpdateSkillData, UpdateSkillVariables>;
}
export const updateSkillRef: UpdateSkillRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateSkill(dc: DataConnect, vars: UpdateSkillVariables): MutationPromise<UpdateSkillData, UpdateSkillVariables>;

interface UpdateSkillRef {
  ...
  (dc: DataConnect, vars: UpdateSkillVariables): MutationRef<UpdateSkillData, UpdateSkillVariables>;
}
export const updateSkillRef: UpdateSkillRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateSkillRef:
```typescript
const name = updateSkillRef.operationName;
console.log(name);
```

### Variables
The `UpdateSkill` mutation requires an argument of type `UpdateSkillVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateSkillVariables {
  id: UUIDString;
  category: string;
}
```
### Return Type
Recall that executing the `UpdateSkill` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateSkillData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateSkillData {
  skill_update?: Skill_Key | null;
}
```
### Using `UpdateSkill`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateSkill, UpdateSkillVariables } from '@dataconnect/generated';

// The `UpdateSkill` mutation requires an argument of type `UpdateSkillVariables`:
const updateSkillVars: UpdateSkillVariables = {
  id: ..., 
  category: ..., 
};

// Call the `updateSkill()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateSkill(updateSkillVars);
// Variables can be defined inline as well.
const { data } = await updateSkill({ id: ..., category: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateSkill(dataConnect, updateSkillVars);

console.log(data.skill_update);

// Or, you can use the `Promise` API.
updateSkill(updateSkillVars).then((response) => {
  const data = response.data;
  console.log(data.skill_update);
});
```

### Using `UpdateSkill`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateSkillRef, UpdateSkillVariables } from '@dataconnect/generated';

// The `UpdateSkill` mutation requires an argument of type `UpdateSkillVariables`:
const updateSkillVars: UpdateSkillVariables = {
  id: ..., 
  category: ..., 
};

// Call the `updateSkillRef()` function to get a reference to the mutation.
const ref = updateSkillRef(updateSkillVars);
// Variables can be defined inline as well.
const ref = updateSkillRef({ id: ..., category: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateSkillRef(dataConnect, updateSkillVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.skill_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.skill_update);
});
```

## DeleteSkill
You can execute the `DeleteSkill` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteSkill(vars: DeleteSkillVariables): MutationPromise<DeleteSkillData, DeleteSkillVariables>;

interface DeleteSkillRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSkillVariables): MutationRef<DeleteSkillData, DeleteSkillVariables>;
}
export const deleteSkillRef: DeleteSkillRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteSkill(dc: DataConnect, vars: DeleteSkillVariables): MutationPromise<DeleteSkillData, DeleteSkillVariables>;

interface DeleteSkillRef {
  ...
  (dc: DataConnect, vars: DeleteSkillVariables): MutationRef<DeleteSkillData, DeleteSkillVariables>;
}
export const deleteSkillRef: DeleteSkillRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteSkillRef:
```typescript
const name = deleteSkillRef.operationName;
console.log(name);
```

### Variables
The `DeleteSkill` mutation requires an argument of type `DeleteSkillVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteSkillVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteSkill` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteSkillData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteSkillData {
  skill_delete?: Skill_Key | null;
}
```
### Using `DeleteSkill`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteSkill, DeleteSkillVariables } from '@dataconnect/generated';

// The `DeleteSkill` mutation requires an argument of type `DeleteSkillVariables`:
const deleteSkillVars: DeleteSkillVariables = {
  id: ..., 
};

// Call the `deleteSkill()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteSkill(deleteSkillVars);
// Variables can be defined inline as well.
const { data } = await deleteSkill({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteSkill(dataConnect, deleteSkillVars);

console.log(data.skill_delete);

// Or, you can use the `Promise` API.
deleteSkill(deleteSkillVars).then((response) => {
  const data = response.data;
  console.log(data.skill_delete);
});
```

### Using `DeleteSkill`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteSkillRef, DeleteSkillVariables } from '@dataconnect/generated';

// The `DeleteSkill` mutation requires an argument of type `DeleteSkillVariables`:
const deleteSkillVars: DeleteSkillVariables = {
  id: ..., 
};

// Call the `deleteSkillRef()` function to get a reference to the mutation.
const ref = deleteSkillRef(deleteSkillVars);
// Variables can be defined inline as well.
const ref = deleteSkillRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteSkillRef(dataConnect, deleteSkillVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.skill_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.skill_delete);
});
```

## CreateMentorshipSession
You can execute the `CreateMentorshipSession` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createMentorshipSession(vars: CreateMentorshipSessionVariables): MutationPromise<CreateMentorshipSessionData, CreateMentorshipSessionVariables>;

interface CreateMentorshipSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMentorshipSessionVariables): MutationRef<CreateMentorshipSessionData, CreateMentorshipSessionVariables>;
}
export const createMentorshipSessionRef: CreateMentorshipSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMentorshipSession(dc: DataConnect, vars: CreateMentorshipSessionVariables): MutationPromise<CreateMentorshipSessionData, CreateMentorshipSessionVariables>;

interface CreateMentorshipSessionRef {
  ...
  (dc: DataConnect, vars: CreateMentorshipSessionVariables): MutationRef<CreateMentorshipSessionData, CreateMentorshipSessionVariables>;
}
export const createMentorshipSessionRef: CreateMentorshipSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMentorshipSessionRef:
```typescript
const name = createMentorshipSessionRef.operationName;
console.log(name);
```

### Variables
The `CreateMentorshipSession` mutation requires an argument of type `CreateMentorshipSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateMentorshipSessionVariables {
  scheduledAt: TimestampString;
  mentorId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateMentorshipSession` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMentorshipSessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMentorshipSessionData {
  mentorshipSession_insert: MentorshipSession_Key;
}
```
### Using `CreateMentorshipSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMentorshipSession, CreateMentorshipSessionVariables } from '@dataconnect/generated';

// The `CreateMentorshipSession` mutation requires an argument of type `CreateMentorshipSessionVariables`:
const createMentorshipSessionVars: CreateMentorshipSessionVariables = {
  scheduledAt: ..., 
  mentorId: ..., 
};

// Call the `createMentorshipSession()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMentorshipSession(createMentorshipSessionVars);
// Variables can be defined inline as well.
const { data } = await createMentorshipSession({ scheduledAt: ..., mentorId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMentorshipSession(dataConnect, createMentorshipSessionVars);

console.log(data.mentorshipSession_insert);

// Or, you can use the `Promise` API.
createMentorshipSession(createMentorshipSessionVars).then((response) => {
  const data = response.data;
  console.log(data.mentorshipSession_insert);
});
```

### Using `CreateMentorshipSession`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMentorshipSessionRef, CreateMentorshipSessionVariables } from '@dataconnect/generated';

// The `CreateMentorshipSession` mutation requires an argument of type `CreateMentorshipSessionVariables`:
const createMentorshipSessionVars: CreateMentorshipSessionVariables = {
  scheduledAt: ..., 
  mentorId: ..., 
};

// Call the `createMentorshipSessionRef()` function to get a reference to the mutation.
const ref = createMentorshipSessionRef(createMentorshipSessionVars);
// Variables can be defined inline as well.
const ref = createMentorshipSessionRef({ scheduledAt: ..., mentorId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMentorshipSessionRef(dataConnect, createMentorshipSessionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.mentorshipSession_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.mentorshipSession_insert);
});
```

## UpdateSessionStatus
You can execute the `UpdateSessionStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateSessionStatus(vars: UpdateSessionStatusVariables): MutationPromise<UpdateSessionStatusData, UpdateSessionStatusVariables>;

interface UpdateSessionStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSessionStatusVariables): MutationRef<UpdateSessionStatusData, UpdateSessionStatusVariables>;
}
export const updateSessionStatusRef: UpdateSessionStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateSessionStatus(dc: DataConnect, vars: UpdateSessionStatusVariables): MutationPromise<UpdateSessionStatusData, UpdateSessionStatusVariables>;

interface UpdateSessionStatusRef {
  ...
  (dc: DataConnect, vars: UpdateSessionStatusVariables): MutationRef<UpdateSessionStatusData, UpdateSessionStatusVariables>;
}
export const updateSessionStatusRef: UpdateSessionStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateSessionStatusRef:
```typescript
const name = updateSessionStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateSessionStatus` mutation requires an argument of type `UpdateSessionStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateSessionStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateSessionStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateSessionStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateSessionStatusData {
  mentorshipSession_update?: MentorshipSession_Key | null;
}
```
### Using `UpdateSessionStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateSessionStatus, UpdateSessionStatusVariables } from '@dataconnect/generated';

// The `UpdateSessionStatus` mutation requires an argument of type `UpdateSessionStatusVariables`:
const updateSessionStatusVars: UpdateSessionStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateSessionStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateSessionStatus(updateSessionStatusVars);
// Variables can be defined inline as well.
const { data } = await updateSessionStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateSessionStatus(dataConnect, updateSessionStatusVars);

console.log(data.mentorshipSession_update);

// Or, you can use the `Promise` API.
updateSessionStatus(updateSessionStatusVars).then((response) => {
  const data = response.data;
  console.log(data.mentorshipSession_update);
});
```

### Using `UpdateSessionStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateSessionStatusRef, UpdateSessionStatusVariables } from '@dataconnect/generated';

// The `UpdateSessionStatus` mutation requires an argument of type `UpdateSessionStatusVariables`:
const updateSessionStatusVars: UpdateSessionStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateSessionStatusRef()` function to get a reference to the mutation.
const ref = updateSessionStatusRef(updateSessionStatusVars);
// Variables can be defined inline as well.
const ref = updateSessionStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateSessionStatusRef(dataConnect, updateSessionStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.mentorshipSession_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.mentorshipSession_update);
});
```

## DeleteMentorshipSession
You can execute the `DeleteMentorshipSession` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteMentorshipSession(vars: DeleteMentorshipSessionVariables): MutationPromise<DeleteMentorshipSessionData, DeleteMentorshipSessionVariables>;

interface DeleteMentorshipSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMentorshipSessionVariables): MutationRef<DeleteMentorshipSessionData, DeleteMentorshipSessionVariables>;
}
export const deleteMentorshipSessionRef: DeleteMentorshipSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMentorshipSession(dc: DataConnect, vars: DeleteMentorshipSessionVariables): MutationPromise<DeleteMentorshipSessionData, DeleteMentorshipSessionVariables>;

interface DeleteMentorshipSessionRef {
  ...
  (dc: DataConnect, vars: DeleteMentorshipSessionVariables): MutationRef<DeleteMentorshipSessionData, DeleteMentorshipSessionVariables>;
}
export const deleteMentorshipSessionRef: DeleteMentorshipSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMentorshipSessionRef:
```typescript
const name = deleteMentorshipSessionRef.operationName;
console.log(name);
```

### Variables
The `DeleteMentorshipSession` mutation requires an argument of type `DeleteMentorshipSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteMentorshipSessionVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteMentorshipSession` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMentorshipSessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMentorshipSessionData {
  mentorshipSession_delete?: MentorshipSession_Key | null;
}
```
### Using `DeleteMentorshipSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMentorshipSession, DeleteMentorshipSessionVariables } from '@dataconnect/generated';

// The `DeleteMentorshipSession` mutation requires an argument of type `DeleteMentorshipSessionVariables`:
const deleteMentorshipSessionVars: DeleteMentorshipSessionVariables = {
  id: ..., 
};

// Call the `deleteMentorshipSession()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMentorshipSession(deleteMentorshipSessionVars);
// Variables can be defined inline as well.
const { data } = await deleteMentorshipSession({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMentorshipSession(dataConnect, deleteMentorshipSessionVars);

console.log(data.mentorshipSession_delete);

// Or, you can use the `Promise` API.
deleteMentorshipSession(deleteMentorshipSessionVars).then((response) => {
  const data = response.data;
  console.log(data.mentorshipSession_delete);
});
```

### Using `DeleteMentorshipSession`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMentorshipSessionRef, DeleteMentorshipSessionVariables } from '@dataconnect/generated';

// The `DeleteMentorshipSession` mutation requires an argument of type `DeleteMentorshipSessionVariables`:
const deleteMentorshipSessionVars: DeleteMentorshipSessionVariables = {
  id: ..., 
};

// Call the `deleteMentorshipSessionRef()` function to get a reference to the mutation.
const ref = deleteMentorshipSessionRef(deleteMentorshipSessionVars);
// Variables can be defined inline as well.
const ref = deleteMentorshipSessionRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMentorshipSessionRef(dataConnect, deleteMentorshipSessionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.mentorshipSession_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.mentorshipSession_delete);
});
```

## CreateLearningGoal
You can execute the `CreateLearningGoal` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createLearningGoal(vars: CreateLearningGoalVariables): MutationPromise<CreateLearningGoalData, CreateLearningGoalVariables>;

interface CreateLearningGoalRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLearningGoalVariables): MutationRef<CreateLearningGoalData, CreateLearningGoalVariables>;
}
export const createLearningGoalRef: CreateLearningGoalRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createLearningGoal(dc: DataConnect, vars: CreateLearningGoalVariables): MutationPromise<CreateLearningGoalData, CreateLearningGoalVariables>;

interface CreateLearningGoalRef {
  ...
  (dc: DataConnect, vars: CreateLearningGoalVariables): MutationRef<CreateLearningGoalData, CreateLearningGoalVariables>;
}
export const createLearningGoalRef: CreateLearningGoalRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createLearningGoalRef:
```typescript
const name = createLearningGoalRef.operationName;
console.log(name);
```

### Variables
The `CreateLearningGoal` mutation requires an argument of type `CreateLearningGoalVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateLearningGoalVariables {
  title: string;
  description: string;
}
```
### Return Type
Recall that executing the `CreateLearningGoal` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateLearningGoalData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateLearningGoalData {
  learningGoal_insert: LearningGoal_Key;
}
```
### Using `CreateLearningGoal`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createLearningGoal, CreateLearningGoalVariables } from '@dataconnect/generated';

// The `CreateLearningGoal` mutation requires an argument of type `CreateLearningGoalVariables`:
const createLearningGoalVars: CreateLearningGoalVariables = {
  title: ..., 
  description: ..., 
};

// Call the `createLearningGoal()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createLearningGoal(createLearningGoalVars);
// Variables can be defined inline as well.
const { data } = await createLearningGoal({ title: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createLearningGoal(dataConnect, createLearningGoalVars);

console.log(data.learningGoal_insert);

// Or, you can use the `Promise` API.
createLearningGoal(createLearningGoalVars).then((response) => {
  const data = response.data;
  console.log(data.learningGoal_insert);
});
```

### Using `CreateLearningGoal`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createLearningGoalRef, CreateLearningGoalVariables } from '@dataconnect/generated';

// The `CreateLearningGoal` mutation requires an argument of type `CreateLearningGoalVariables`:
const createLearningGoalVars: CreateLearningGoalVariables = {
  title: ..., 
  description: ..., 
};

// Call the `createLearningGoalRef()` function to get a reference to the mutation.
const ref = createLearningGoalRef(createLearningGoalVars);
// Variables can be defined inline as well.
const ref = createLearningGoalRef({ title: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createLearningGoalRef(dataConnect, createLearningGoalVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.learningGoal_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.learningGoal_insert);
});
```

## UpdateLearningGoal
You can execute the `UpdateLearningGoal` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateLearningGoal(vars: UpdateLearningGoalVariables): MutationPromise<UpdateLearningGoalData, UpdateLearningGoalVariables>;

interface UpdateLearningGoalRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateLearningGoalVariables): MutationRef<UpdateLearningGoalData, UpdateLearningGoalVariables>;
}
export const updateLearningGoalRef: UpdateLearningGoalRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateLearningGoal(dc: DataConnect, vars: UpdateLearningGoalVariables): MutationPromise<UpdateLearningGoalData, UpdateLearningGoalVariables>;

interface UpdateLearningGoalRef {
  ...
  (dc: DataConnect, vars: UpdateLearningGoalVariables): MutationRef<UpdateLearningGoalData, UpdateLearningGoalVariables>;
}
export const updateLearningGoalRef: UpdateLearningGoalRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateLearningGoalRef:
```typescript
const name = updateLearningGoalRef.operationName;
console.log(name);
```

### Variables
The `UpdateLearningGoal` mutation requires an argument of type `UpdateLearningGoalVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateLearningGoalVariables {
  id: UUIDString;
  isCompleted: boolean;
}
```
### Return Type
Recall that executing the `UpdateLearningGoal` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateLearningGoalData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateLearningGoalData {
  learningGoal_update?: LearningGoal_Key | null;
}
```
### Using `UpdateLearningGoal`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateLearningGoal, UpdateLearningGoalVariables } from '@dataconnect/generated';

// The `UpdateLearningGoal` mutation requires an argument of type `UpdateLearningGoalVariables`:
const updateLearningGoalVars: UpdateLearningGoalVariables = {
  id: ..., 
  isCompleted: ..., 
};

// Call the `updateLearningGoal()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateLearningGoal(updateLearningGoalVars);
// Variables can be defined inline as well.
const { data } = await updateLearningGoal({ id: ..., isCompleted: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateLearningGoal(dataConnect, updateLearningGoalVars);

console.log(data.learningGoal_update);

// Or, you can use the `Promise` API.
updateLearningGoal(updateLearningGoalVars).then((response) => {
  const data = response.data;
  console.log(data.learningGoal_update);
});
```

### Using `UpdateLearningGoal`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateLearningGoalRef, UpdateLearningGoalVariables } from '@dataconnect/generated';

// The `UpdateLearningGoal` mutation requires an argument of type `UpdateLearningGoalVariables`:
const updateLearningGoalVars: UpdateLearningGoalVariables = {
  id: ..., 
  isCompleted: ..., 
};

// Call the `updateLearningGoalRef()` function to get a reference to the mutation.
const ref = updateLearningGoalRef(updateLearningGoalVars);
// Variables can be defined inline as well.
const ref = updateLearningGoalRef({ id: ..., isCompleted: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateLearningGoalRef(dataConnect, updateLearningGoalVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.learningGoal_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.learningGoal_update);
});
```

## DeleteLearningGoal
You can execute the `DeleteLearningGoal` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteLearningGoal(vars: DeleteLearningGoalVariables): MutationPromise<DeleteLearningGoalData, DeleteLearningGoalVariables>;

interface DeleteLearningGoalRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteLearningGoalVariables): MutationRef<DeleteLearningGoalData, DeleteLearningGoalVariables>;
}
export const deleteLearningGoalRef: DeleteLearningGoalRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteLearningGoal(dc: DataConnect, vars: DeleteLearningGoalVariables): MutationPromise<DeleteLearningGoalData, DeleteLearningGoalVariables>;

interface DeleteLearningGoalRef {
  ...
  (dc: DataConnect, vars: DeleteLearningGoalVariables): MutationRef<DeleteLearningGoalData, DeleteLearningGoalVariables>;
}
export const deleteLearningGoalRef: DeleteLearningGoalRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteLearningGoalRef:
```typescript
const name = deleteLearningGoalRef.operationName;
console.log(name);
```

### Variables
The `DeleteLearningGoal` mutation requires an argument of type `DeleteLearningGoalVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteLearningGoalVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteLearningGoal` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteLearningGoalData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteLearningGoalData {
  learningGoal_delete?: LearningGoal_Key | null;
}
```
### Using `DeleteLearningGoal`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteLearningGoal, DeleteLearningGoalVariables } from '@dataconnect/generated';

// The `DeleteLearningGoal` mutation requires an argument of type `DeleteLearningGoalVariables`:
const deleteLearningGoalVars: DeleteLearningGoalVariables = {
  id: ..., 
};

// Call the `deleteLearningGoal()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteLearningGoal(deleteLearningGoalVars);
// Variables can be defined inline as well.
const { data } = await deleteLearningGoal({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteLearningGoal(dataConnect, deleteLearningGoalVars);

console.log(data.learningGoal_delete);

// Or, you can use the `Promise` API.
deleteLearningGoal(deleteLearningGoalVars).then((response) => {
  const data = response.data;
  console.log(data.learningGoal_delete);
});
```

### Using `DeleteLearningGoal`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteLearningGoalRef, DeleteLearningGoalVariables } from '@dataconnect/generated';

// The `DeleteLearningGoal` mutation requires an argument of type `DeleteLearningGoalVariables`:
const deleteLearningGoalVars: DeleteLearningGoalVariables = {
  id: ..., 
};

// Call the `deleteLearningGoalRef()` function to get a reference to the mutation.
const ref = deleteLearningGoalRef(deleteLearningGoalVars);
// Variables can be defined inline as well.
const ref = deleteLearningGoalRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteLearningGoalRef(dataConnect, deleteLearningGoalVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.learningGoal_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.learningGoal_delete);
});
```

## CreateResource
You can execute the `CreateResource` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createResource(vars: CreateResourceVariables): MutationPromise<CreateResourceData, CreateResourceVariables>;

interface CreateResourceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateResourceVariables): MutationRef<CreateResourceData, CreateResourceVariables>;
}
export const createResourceRef: CreateResourceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createResource(dc: DataConnect, vars: CreateResourceVariables): MutationPromise<CreateResourceData, CreateResourceVariables>;

interface CreateResourceRef {
  ...
  (dc: DataConnect, vars: CreateResourceVariables): MutationRef<CreateResourceData, CreateResourceVariables>;
}
export const createResourceRef: CreateResourceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createResourceRef:
```typescript
const name = createResourceRef.operationName;
console.log(name);
```

### Variables
The `CreateResource` mutation requires an argument of type `CreateResourceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateResourceVariables {
  title: string;
  url: string;
  type: string;
}
```
### Return Type
Recall that executing the `CreateResource` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateResourceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateResourceData {
  resource_insert: Resource_Key;
}
```
### Using `CreateResource`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createResource, CreateResourceVariables } from '@dataconnect/generated';

// The `CreateResource` mutation requires an argument of type `CreateResourceVariables`:
const createResourceVars: CreateResourceVariables = {
  title: ..., 
  url: ..., 
  type: ..., 
};

// Call the `createResource()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createResource(createResourceVars);
// Variables can be defined inline as well.
const { data } = await createResource({ title: ..., url: ..., type: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createResource(dataConnect, createResourceVars);

console.log(data.resource_insert);

// Or, you can use the `Promise` API.
createResource(createResourceVars).then((response) => {
  const data = response.data;
  console.log(data.resource_insert);
});
```

### Using `CreateResource`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createResourceRef, CreateResourceVariables } from '@dataconnect/generated';

// The `CreateResource` mutation requires an argument of type `CreateResourceVariables`:
const createResourceVars: CreateResourceVariables = {
  title: ..., 
  url: ..., 
  type: ..., 
};

// Call the `createResourceRef()` function to get a reference to the mutation.
const ref = createResourceRef(createResourceVars);
// Variables can be defined inline as well.
const ref = createResourceRef({ title: ..., url: ..., type: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createResourceRef(dataConnect, createResourceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.resource_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.resource_insert);
});
```

## UpdateResource
You can execute the `UpdateResource` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateResource(vars: UpdateResourceVariables): MutationPromise<UpdateResourceData, UpdateResourceVariables>;

interface UpdateResourceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateResourceVariables): MutationRef<UpdateResourceData, UpdateResourceVariables>;
}
export const updateResourceRef: UpdateResourceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateResource(dc: DataConnect, vars: UpdateResourceVariables): MutationPromise<UpdateResourceData, UpdateResourceVariables>;

interface UpdateResourceRef {
  ...
  (dc: DataConnect, vars: UpdateResourceVariables): MutationRef<UpdateResourceData, UpdateResourceVariables>;
}
export const updateResourceRef: UpdateResourceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateResourceRef:
```typescript
const name = updateResourceRef.operationName;
console.log(name);
```

### Variables
The `UpdateResource` mutation requires an argument of type `UpdateResourceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateResourceVariables {
  id: UUIDString;
  description?: string | null;
}
```
### Return Type
Recall that executing the `UpdateResource` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateResourceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateResourceData {
  resource_update?: Resource_Key | null;
}
```
### Using `UpdateResource`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateResource, UpdateResourceVariables } from '@dataconnect/generated';

// The `UpdateResource` mutation requires an argument of type `UpdateResourceVariables`:
const updateResourceVars: UpdateResourceVariables = {
  id: ..., 
  description: ..., // optional
};

// Call the `updateResource()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateResource(updateResourceVars);
// Variables can be defined inline as well.
const { data } = await updateResource({ id: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateResource(dataConnect, updateResourceVars);

console.log(data.resource_update);

// Or, you can use the `Promise` API.
updateResource(updateResourceVars).then((response) => {
  const data = response.data;
  console.log(data.resource_update);
});
```

### Using `UpdateResource`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateResourceRef, UpdateResourceVariables } from '@dataconnect/generated';

// The `UpdateResource` mutation requires an argument of type `UpdateResourceVariables`:
const updateResourceVars: UpdateResourceVariables = {
  id: ..., 
  description: ..., // optional
};

// Call the `updateResourceRef()` function to get a reference to the mutation.
const ref = updateResourceRef(updateResourceVars);
// Variables can be defined inline as well.
const ref = updateResourceRef({ id: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateResourceRef(dataConnect, updateResourceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.resource_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.resource_update);
});
```

## DeleteResource
You can execute the `DeleteResource` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteResource(vars: DeleteResourceVariables): MutationPromise<DeleteResourceData, DeleteResourceVariables>;

interface DeleteResourceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteResourceVariables): MutationRef<DeleteResourceData, DeleteResourceVariables>;
}
export const deleteResourceRef: DeleteResourceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteResource(dc: DataConnect, vars: DeleteResourceVariables): MutationPromise<DeleteResourceData, DeleteResourceVariables>;

interface DeleteResourceRef {
  ...
  (dc: DataConnect, vars: DeleteResourceVariables): MutationRef<DeleteResourceData, DeleteResourceVariables>;
}
export const deleteResourceRef: DeleteResourceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteResourceRef:
```typescript
const name = deleteResourceRef.operationName;
console.log(name);
```

### Variables
The `DeleteResource` mutation requires an argument of type `DeleteResourceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteResourceVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteResource` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteResourceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteResourceData {
  resource_delete?: Resource_Key | null;
}
```
### Using `DeleteResource`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteResource, DeleteResourceVariables } from '@dataconnect/generated';

// The `DeleteResource` mutation requires an argument of type `DeleteResourceVariables`:
const deleteResourceVars: DeleteResourceVariables = {
  id: ..., 
};

// Call the `deleteResource()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteResource(deleteResourceVars);
// Variables can be defined inline as well.
const { data } = await deleteResource({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteResource(dataConnect, deleteResourceVars);

console.log(data.resource_delete);

// Or, you can use the `Promise` API.
deleteResource(deleteResourceVars).then((response) => {
  const data = response.data;
  console.log(data.resource_delete);
});
```

### Using `DeleteResource`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteResourceRef, DeleteResourceVariables } from '@dataconnect/generated';

// The `DeleteResource` mutation requires an argument of type `DeleteResourceVariables`:
const deleteResourceVars: DeleteResourceVariables = {
  id: ..., 
};

// Call the `deleteResourceRef()` function to get a reference to the mutation.
const ref = deleteResourceRef(deleteResourceVars);
// Variables can be defined inline as well.
const ref = deleteResourceRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteResourceRef(dataConnect, deleteResourceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.resource_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.resource_delete);
});
```

## AddUserSkill
You can execute the `AddUserSkill` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addUserSkill(vars: AddUserSkillVariables): MutationPromise<AddUserSkillData, AddUserSkillVariables>;

interface AddUserSkillRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddUserSkillVariables): MutationRef<AddUserSkillData, AddUserSkillVariables>;
}
export const addUserSkillRef: AddUserSkillRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addUserSkill(dc: DataConnect, vars: AddUserSkillVariables): MutationPromise<AddUserSkillData, AddUserSkillVariables>;

interface AddUserSkillRef {
  ...
  (dc: DataConnect, vars: AddUserSkillVariables): MutationRef<AddUserSkillData, AddUserSkillVariables>;
}
export const addUserSkillRef: AddUserSkillRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addUserSkillRef:
```typescript
const name = addUserSkillRef.operationName;
console.log(name);
```

### Variables
The `AddUserSkill` mutation requires an argument of type `AddUserSkillVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddUserSkillVariables {
  skillId: UUIDString;
  level: number;
}
```
### Return Type
Recall that executing the `AddUserSkill` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddUserSkillData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddUserSkillData {
  userSkill_insert: UserSkill_Key;
}
```
### Using `AddUserSkill`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addUserSkill, AddUserSkillVariables } from '@dataconnect/generated';

// The `AddUserSkill` mutation requires an argument of type `AddUserSkillVariables`:
const addUserSkillVars: AddUserSkillVariables = {
  skillId: ..., 
  level: ..., 
};

// Call the `addUserSkill()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addUserSkill(addUserSkillVars);
// Variables can be defined inline as well.
const { data } = await addUserSkill({ skillId: ..., level: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addUserSkill(dataConnect, addUserSkillVars);

console.log(data.userSkill_insert);

// Or, you can use the `Promise` API.
addUserSkill(addUserSkillVars).then((response) => {
  const data = response.data;
  console.log(data.userSkill_insert);
});
```

### Using `AddUserSkill`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addUserSkillRef, AddUserSkillVariables } from '@dataconnect/generated';

// The `AddUserSkill` mutation requires an argument of type `AddUserSkillVariables`:
const addUserSkillVars: AddUserSkillVariables = {
  skillId: ..., 
  level: ..., 
};

// Call the `addUserSkillRef()` function to get a reference to the mutation.
const ref = addUserSkillRef(addUserSkillVars);
// Variables can be defined inline as well.
const ref = addUserSkillRef({ skillId: ..., level: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addUserSkillRef(dataConnect, addUserSkillVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userSkill_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userSkill_insert);
});
```

## UpdateUserSkillLevel
You can execute the `UpdateUserSkillLevel` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUserSkillLevel(vars: UpdateUserSkillLevelVariables): MutationPromise<UpdateUserSkillLevelData, UpdateUserSkillLevelVariables>;

interface UpdateUserSkillLevelRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserSkillLevelVariables): MutationRef<UpdateUserSkillLevelData, UpdateUserSkillLevelVariables>;
}
export const updateUserSkillLevelRef: UpdateUserSkillLevelRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUserSkillLevel(dc: DataConnect, vars: UpdateUserSkillLevelVariables): MutationPromise<UpdateUserSkillLevelData, UpdateUserSkillLevelVariables>;

interface UpdateUserSkillLevelRef {
  ...
  (dc: DataConnect, vars: UpdateUserSkillLevelVariables): MutationRef<UpdateUserSkillLevelData, UpdateUserSkillLevelVariables>;
}
export const updateUserSkillLevelRef: UpdateUserSkillLevelRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserSkillLevelRef:
```typescript
const name = updateUserSkillLevelRef.operationName;
console.log(name);
```

### Variables
The `UpdateUserSkillLevel` mutation requires an argument of type `UpdateUserSkillLevelVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserSkillLevelVariables {
  id: UUIDString;
  level: number;
}
```
### Return Type
Recall that executing the `UpdateUserSkillLevel` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserSkillLevelData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserSkillLevelData {
  userSkill_update?: UserSkill_Key | null;
}
```
### Using `UpdateUserSkillLevel`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUserSkillLevel, UpdateUserSkillLevelVariables } from '@dataconnect/generated';

// The `UpdateUserSkillLevel` mutation requires an argument of type `UpdateUserSkillLevelVariables`:
const updateUserSkillLevelVars: UpdateUserSkillLevelVariables = {
  id: ..., 
  level: ..., 
};

// Call the `updateUserSkillLevel()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUserSkillLevel(updateUserSkillLevelVars);
// Variables can be defined inline as well.
const { data } = await updateUserSkillLevel({ id: ..., level: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUserSkillLevel(dataConnect, updateUserSkillLevelVars);

console.log(data.userSkill_update);

// Or, you can use the `Promise` API.
updateUserSkillLevel(updateUserSkillLevelVars).then((response) => {
  const data = response.data;
  console.log(data.userSkill_update);
});
```

### Using `UpdateUserSkillLevel`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserSkillLevelRef, UpdateUserSkillLevelVariables } from '@dataconnect/generated';

// The `UpdateUserSkillLevel` mutation requires an argument of type `UpdateUserSkillLevelVariables`:
const updateUserSkillLevelVars: UpdateUserSkillLevelVariables = {
  id: ..., 
  level: ..., 
};

// Call the `updateUserSkillLevelRef()` function to get a reference to the mutation.
const ref = updateUserSkillLevelRef(updateUserSkillLevelVars);
// Variables can be defined inline as well.
const ref = updateUserSkillLevelRef({ id: ..., level: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserSkillLevelRef(dataConnect, updateUserSkillLevelVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userSkill_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userSkill_update);
});
```

## RemoveUserSkill
You can execute the `RemoveUserSkill` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
removeUserSkill(vars: RemoveUserSkillVariables): MutationPromise<RemoveUserSkillData, RemoveUserSkillVariables>;

interface RemoveUserSkillRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveUserSkillVariables): MutationRef<RemoveUserSkillData, RemoveUserSkillVariables>;
}
export const removeUserSkillRef: RemoveUserSkillRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
removeUserSkill(dc: DataConnect, vars: RemoveUserSkillVariables): MutationPromise<RemoveUserSkillData, RemoveUserSkillVariables>;

interface RemoveUserSkillRef {
  ...
  (dc: DataConnect, vars: RemoveUserSkillVariables): MutationRef<RemoveUserSkillData, RemoveUserSkillVariables>;
}
export const removeUserSkillRef: RemoveUserSkillRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the removeUserSkillRef:
```typescript
const name = removeUserSkillRef.operationName;
console.log(name);
```

### Variables
The `RemoveUserSkill` mutation requires an argument of type `RemoveUserSkillVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RemoveUserSkillVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `RemoveUserSkill` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RemoveUserSkillData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RemoveUserSkillData {
  userSkill_delete?: UserSkill_Key | null;
}
```
### Using `RemoveUserSkill`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, removeUserSkill, RemoveUserSkillVariables } from '@dataconnect/generated';

// The `RemoveUserSkill` mutation requires an argument of type `RemoveUserSkillVariables`:
const removeUserSkillVars: RemoveUserSkillVariables = {
  id: ..., 
};

// Call the `removeUserSkill()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await removeUserSkill(removeUserSkillVars);
// Variables can be defined inline as well.
const { data } = await removeUserSkill({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await removeUserSkill(dataConnect, removeUserSkillVars);

console.log(data.userSkill_delete);

// Or, you can use the `Promise` API.
removeUserSkill(removeUserSkillVars).then((response) => {
  const data = response.data;
  console.log(data.userSkill_delete);
});
```

### Using `RemoveUserSkill`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, removeUserSkillRef, RemoveUserSkillVariables } from '@dataconnect/generated';

// The `RemoveUserSkill` mutation requires an argument of type `RemoveUserSkillVariables`:
const removeUserSkillVars: RemoveUserSkillVariables = {
  id: ..., 
};

// Call the `removeUserSkillRef()` function to get a reference to the mutation.
const ref = removeUserSkillRef(removeUserSkillVars);
// Variables can be defined inline as well.
const ref = removeUserSkillRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = removeUserSkillRef(dataConnect, removeUserSkillVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userSkill_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userSkill_delete);
});
```


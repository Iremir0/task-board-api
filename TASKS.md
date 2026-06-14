# Small REST API Tasks

Project goal: practice `Node.js`, `Prisma`, `Zod`, and basic `REST API` design without making project too big.

## Recommended Order

1. **Tasks CRUD**
   - Add task routes and controller.
   - Routes:
     - `POST /boards/:id/tasks`
     - `GET /boards/:id/tasks`
     - `GET /tasks/:id`
     - `PATCH /tasks/:id`
     - `DELETE /tasks/:id`
   - Learn:
     - Prisma relations
     - Zod body validation
     - nested REST routes

2. **Task validators**
   - Create `src/validators/taskValidator.js`
   - Schemas:
     - `createTaskSchema`
     - `updateTaskSchema`
     - query schema later if needed
   - Fields:
     - `title`
     - `description`
     - `status`
     - `priority`
     - `dueDate`
     - `assigneeId`
   - Learn:
     - `z.enum`
     - optional fields
     - date validation

3. **Task ownership/access check**
   - Only board creator or collaborator can view board tasks.
   - Only board creator can create, update, and delete task for now.
   - Learn:
     - middleware reuse
     - auth flow
     - REST permissions

4. **Task filters**
   - Add query params on board tasks:
     - `?status=TODO`
     - `?priority=HIGH`
     - `?assigneeId=...`
   - Learn:
     - `req.query`
     - Zod query parsing
     - dynamic Prisma `where`

5. **Remove collaborator**
   - Add route:
     - `DELETE /boards/:id/collaborators/:userId`
   - Learn:
     - Prisma delete logic
     - cleaner route design

6. **Prevent duplicate collaborator**
   - Before insert, check if user already collaborator.
   - Return `409` if duplicate.
   - Learn:
     - business rules
     - Prisma unique constraints
     - status codes

7. **Board summary endpoint**
   - Add route:
     - `GET /boards/:id/summary`
   - Return:
     - board info
     - task count
     - counts by status
     - collaborator count
   - Learn:
     - Prisma `_count`
     - simple aggregation
     - custom response shape

8. **Central error handling cleanup**
   - Use `asyncHandler`
   - Move repeated `try/catch` blocks out of controllers where possible.
   - Learn:
     - Express middleware flow
     - cleaner controller style
     - consistent API errors

9. **Better auth consistency**
   - Right now token is set in cookie, but middleware reads `Authorization` header.
   - Pick one style and make whole app consistent.
   - Learn:
     - auth design consistency
     - request flow debugging

10. **Tiny README**
   - Add:
     - routes
     - sample request bodies
     - how to run migrations
     - how to test with Postman
   - Learn:
     - API documentation
     - clearer project setup

## Best Order For Today

1. Tasks CRUD
2. Task validators
3. Task filters
4. Remove collaborator
5. Prevent duplicate collaborator
6. Board summary
7. Error handling cleanup
8. Auth consistency
9. README

## Skip For Now

- pagination
- refresh tokens
- role system
- file upload
- Swagger
- background jobs
- broad test suite

## Definition Of Done

Project is in good shape when:

- user can register and login
- user can create board
- user can add and remove collaborator
- user can create, update, and delete task
- user can filter tasks
- user can get board summary
- validation errors are clear
- auth flow is consistent

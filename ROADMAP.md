# ProdSync — Roadmap

---

Priority: **P0** Blocking/Security | **P1** Important | **P2** Quality | **P3** Nice to have

---

## Index

| ID                                                                 | Priority | Title                                        | Area            | Done |
| ------------------------------------------------------------------ | -------- | -------------------------------------------- | --------------- | :--: |
| [PS-43](#ps-43--hash-passwords)                                    | P0       | Hash passwords                               | server/auth     |  ✅  |
| [PS-44](#ps-44--move-the-jwt-secret-out-of-source)                 | P0       | Move the JWT secret out of source            | server/auth     |  ✅  |
| [PS-45](#ps-45--protect-every-controller-with-jwtguard)            | P0       | Protect every controller with `JwtGuard`     | server          |  ✅  |
| [PS-46](#ps-46--add-role-based-authorization)                      | P0       | Add role-based authorization                 | server/auth     |  ✅  |
| [PS-47](#ps-47--strip-password-from-jwt-payload-and-api-responses) | P0       | Strip `password` from payloads and responses | server/users    |  ✅  |
| [PS-48](#ps-48--enforce-ownership-on-record-creation)              | P0       | Enforce ownership on record creation         | server/records  |  ✅  |
| [PS-49](#ps-49--tighten-cors)                                      | P0       | Tighten CORS                                 | server          |  ✅  |
| [PS-50](#ps-50--secure-the-auth-cookie)                            | P0       | Secure the auth cookie                       | client          |  ✅  |
| [PS-51](#ps-51--replace-synchronize-true-with-migrations)          | P1       | Replace `synchronize: true` with migrations  | server/db       |      |
| [PS-52](#ps-52--add-request-validation)                            | P1       | Add request validation                       | server          |      |
| [PS-53](#ps-53--fix-the-uuidint-id-mismatch)                       | P1       | Fix the UUID/int ID mismatch                 | server/records  |      |
| [PS-54](#ps-54--fix-route-ordering-in-recordscontroller)           | P1       | Fix route ordering in `RecordsController`    | server/records  |      |
| [PS-55](#ps-55--remove-hardcoded-line-ids-from-the-client)         | P1       | Remove hardcoded line IDs from the client    | client          |      |
| [PS-56](#ps-56--add-db-indexes-for-reporting-queries)              | P1       | Add DB indexes for reporting queries         | server/db       |      |
| [PS-57](#ps-57--make-timezone-handling-explicit)                   | P1       | Make timezone handling explicit              | server + client |      |
| [PS-58](#ps-58--make-deletedeactivate-semantics-consistent)        | P1       | Make delete/deactivate semantics consistent  | server          |      |
| [PS-59](#ps-59--validate-machine-cadence-and-add-target-fields)    | P1       | Validate cadence, add target/OEE fields      | server/machines |      |
| [PS-60](#ps-60--downtime--stoppage-tracking)                       | P1       | Downtime / stoppage tracking                 | feature         |      |
| [PS-61](#ps-61--shift-model)                                       | P1       | Shift model                                  | feature         |      |
| [PS-62](#ps-62--csv--excel-export)                                 | P2       | CSV / Excel export                           | feature         |      |
| [PS-63](#ps-63--real-time-updates)                                 | P2       | Real-time updates                            | feature         |      |
| [PS-64](#ps-64--password-change-flow)                              | P2       | Password change flow                         | feature         |      |
| [PS-65](#ps-65--audit-log)                                         | P2       | Audit log                                    | feature         |      |
| [PS-66](#ps-66--refresh-tokens)                                    | P2       | Refresh tokens                               | server/auth     |      |
| [PS-67](#ps-67--fix-the-placeholder-e2e-test)                      | P2       | Fix the placeholder e2e test                 | testing         |      |
| [PS-68](#ps-68--re-enable-tests-in-ci)                             | P2       | Re-enable tests in CI                        | ci              |      |
| [PS-69](#ps-69--normalize-test-directory-names)                    | P3       | Normalize test directory names               | testing         |      |
| [PS-70](#ps-70--add-client-side-tests)                             | P2       | Add client-side tests                        | testing         |      |
| [PS-71](#ps-71--write-a-real-root-readme)                          | P2       | Write a real root README                     | docs            |      |
| [PS-72](#ps-72--add-envexample-and-harden-gitignore)               | P2       | Add `.env.example`, harden `.gitignore`      | ops             |      |
| [PS-73](#ps-73--fix-the-swagger-metadata)                          | P2       | Fix the Swagger metadata                     | docs            |      |
| [PS-74](#ps-74--harden-docker-composeyml)                          | P2       | Harden `docker-compose.yml`                  | ops             |      |
| [PS-75](#ps-75--structured-logging-and-a-health-endpoint)          | P2       | Structured logging + health endpoint         | ops             |      |
| [PS-76](#ps-76--rate-limit-the-login-endpoint)                     | P2       | Rate limit the login endpoint                | server/auth     |      |
| [PS-77](#ps-77--extract-the-ui-strings)                            | P3       | Extract the UI strings                       | client          |      |
| [PS-78](#ps-78--add-a-global-exception-filter)                     | P2       | Add a global exception filter                | server          |      |
| [PS-79](#ps-79--gitignore-build-artifacts)                         | P3       | Gitignore build artifacts                    | ops             |      |
| [PS-80](#ps-80--forgot-password-flow)                              | P2       | Forgot password flow                         | feature         |      |
| [PS-81](#ps-81--enforce-pipes-on-every-route-parameter)            | P1       | Enforce pipes on every route parameter       | server          |      |

---

## Security (P0)

### PS-43 — Hash passwords

`server/src/auth/auth.service.ts:17` compares `user.password !== authPayloadDto.password` — passwords are stored and compared in plaintext (`user.entity.ts` `password` column). Add `bcrypt` (or `argon2`), hash on create/update in `UsersService`, and compare with `bcrypt.compare`. Needs a migration to re-hash or force-reset existing rows.
**Blocks:** PS-64. **Depends on:** PS-51 (migrations).

### PS-44 — Move the JWT secret out of source

`server/src/auth/auth.module.ts:16` hardcodes `secret: 'abc123'`. Switch to `JwtModule.registerAsync` reading `JWT_SECRET` from `ConfigService`, and fail fast at boot if it's missing. Same for `jwt.strategy.ts`.
**Related:** PS-72.

### PS-45 — Protect every controller with `JwtGuard`

Only `AuthController` uses guards today. `records`, `users`, `machines`, `lines`, and `options` controllers are fully unauthenticated — anyone who can reach port 8080 can list users or delete records. Apply `JwtGuard` globally via `APP_GUARD` and opt out of login with a `@Public()` decorator.
**Blocks:** PS-46, PS-48.

### PS-46 — Add role-based authorization

The JWT payload carries `role` (used only for client-side redirects in `client/middleware.ts`). Add a `@Roles('admin')` decorator + `RolesGuard` so operator accounts can't hit admin endpoints — user CRUD, line/machine CRUD, record deletion.
**Depends on:** PS-45.

### PS-47 — Strip `password` from JWT payload and API responses

`auth.service.ts` signs the user object minus password, but `UsersService.findAll`/`findOneById` return full `User` entities including `password`. Add `@Exclude()` + `ClassSerializerInterceptor`, or explicit `select` lists / response DTOs.

### PS-48 — Enforce ownership on record creation

`POST /api/records` accepts any `userId` in the body. Derive the user from the JWT (`req.user.id`) instead, so an operator can't register actions as someone else.
**Depends on:** PS-45.

### PS-49 — Tighten CORS

`main.ts` uses `origin: true` (reflects any origin) with `credentials: true`. Read an allowed-origins list from env.

### PS-50 — Secure the auth cookie

`client/src/lib/cookies.ts` has `secure: true` commented out with a TODO. Set it from `NODE_ENV === 'production'`, add an explicit `path: '/'`, and a `maxAge` matching the JWT's 1h expiry.
**Related:** PS-66.

---

## Data integrity & correctness (P1)

### PS-51 — Replace `synchronize: true` with migrations

Both `server/config/typeorm.config.ts` and `server/src/seeds/seed.ts` use `synchronize: true`, which will silently drop/alter columns in production. Add a TypeORM `DataSource` for CLI use, `migration:generate`/`migration:run` scripts, and turn synchronize off outside development.
**Blocks:** PS-43, PS-56, PS-59, PS-60, PS-61, PS-65.

### PS-52 — Add request validation

No `class-validator` anywhere; DTOs are plain classes carrying only `@ApiProperty()`. Add a global `ValidationPipe({ whitelist: true, transform: true })` and decorate DTOs (`@IsUUID`, `@IsEmail`, `@IsInt`, `@IsDateString`, `@Length`). Today `POST /api/users` accepts any shape.

Note `whitelist: true` strips every property without a validation decorator, so a DTO that is only decorated with `@ApiProperty()` will arrive empty — every field needs a real validator in the same pass. Once this lands, the manual `password` strip in `UsersService.update` becomes redundant and should be deleted.
**Related:** PS-53, PS-81.

### PS-53 — Fix the UUID/int ID mismatch

All entities use `@PrimaryGeneratedColumn('uuid')` (string), but `records.controller.ts` calls `parseInt(machineId)`, `parseInt(userId)`, `parseInt(lineId)` for the `avgActionTime`, `hourlyStats`, `dailyStats`, and `recordHistory` endpoints, and the `records`/`machines` filters are typed `number`. These produce `NaN` against UUID columns. Standardize on `string` + `ParseUUIDPipe`.
**Related:** PS-55.

### PS-54 — Fix route ordering in `RecordsController`

`@Delete(':id')` is declared above `@Get('avgActionTime')`, `'kpis'`, `'hourlyStats'`, and `'dailyStats'`. Move all literal-path routes above parameterized ones so they can't be shadowed.

### PS-55 — Remove hardcoded line IDs from the client

`client/src/utils/consts.ts` hardcodes `Lines` as `{ value: "6", label: "Linha 1" }` … — numeric IDs that don't match the UUID line entity. Fetch lines from `GET /api/lines` (the options module already exists) and delete the constant.
**Depends on:** PS-53.

### PS-56 — Add DB indexes for reporting queries

`records.service.ts` filters and groups heavily on `record.createdAt`, `userId`, and `machineId`, including a correlated subquery with `TIMESTAMPDIFF`. Add `@Index()` on `Record.createdAt` plus composite indexes `(userId, createdAt)` and `(machineId, createdAt)`.
**Depends on:** PS-51.

### PS-57 — Make timezone handling explicit

`dayjs` is used with `startOf('day')`/`endOf('day')` on the server while MySQL stores naive timestamps and the client sends dates in local time. Pin a plant timezone in config, use `dayjs.utc`/`timezone` consistently on both sides, store UTC.

### PS-58 — Make delete/deactivate semantics consistent

`UsersService.delete` toggles `status` (a deactivate), while `RecordsService.delete` removes the row. Pick a convention — `@DeleteDateColumn` soft deletes for records, so production history stays auditable — and rename the endpoints to match what they do.
**Related:** PS-65.

### PS-59 — Validate machine cadence and add target fields

`Machine.cadence` is an unconstrained `number` with no unit. Document it (actions/hour?), validate `> 0`, and add what the dashboard KPIs actually need: shift target, nominal cycle time, downtime reason codes.
**Depends on:** PS-51. **Related:** PS-60.

### PS-81 — Enforce pipes on every route parameter

PS-52 validates request **bodies**; nothing validates params and query strings, and the declared TypeScript types are erased at runtime, so a handler annotated `id: string` or `startAdmission?: Date` actually receives whatever the URL contained. Concretely: `@Query('startAdmission') startAdmission?: Date` in `users.controller.ts:122` hands `UsersService.findAll` a raw string that `dayjs` then happily parses as `Invalid Date`, and every `@Param('id') id: string` reaches the repository unchecked — only `ParseIntPipe` is imported anywhere today, and it's applied to the wrong kind of ID (see PS-53).

Go through `records`, `users`, `machines`, `lines` and `options` controllers and bind a pipe to every parameter:

- `@Param('id', ParseUUIDPipe)` for entity IDs (coordinate with PS-53, which converts the `parseInt` call sites).
- `ParseIntPipe` / `ParseBoolPipe` / `ParseDatePipe` for numeric, boolean and date query params, with `new DefaultValuePipe(...)` or `{ optional: true }` where the param is optional.
- Group the repeated stats filters (`startDate`, `endDate`, `userId`, `lineId`, `machineId` — declared five times across `records.controller.ts`) into a decorated query DTO validated by the same global pipe as PS-52, instead of pipes on individual arguments.

Add `forbidNonWhitelisted: true` alongside `whitelist: true` once the DTOs are decorated, so an unexpected field is a 400 rather than a silent drop. The payoff is that the handler signatures stop lying: the type in the code becomes the type the code receives.
**Depends on:** PS-52. **Related:** PS-53, PS-78.

---

## Missing product features (P1–P2)

### PS-60 — Downtime / stoppage tracking

The domain model only records successful actions. Add a `Stoppage` entity (machine, user, reason code, start, end) plus UI on `/work` to open and close a stoppage — this is what makes the line-performance charts actionable.
**Depends on:** PS-51.

### PS-61 — Shift model

Add `Shift` (name, start, end) and attach records to a shift, so the dashboard can compare morning/afternoon/night instead of only hourly and daily buckets.
**Depends on:** PS-51, PS-57.

### PS-62 — CSV / Excel export

`RecordsTable` and the line/machine performance tables are screen-only. Add an export endpoint (streamed CSV, honoring the same filters) and a download button.

### PS-63 — Real-time updates

`/work` and the dashboard KPIs are request/response. Add a WebSocket gateway (`@nestjs/websockets`) or SSE so a registered action pushes to the dashboard without a refetch.

### PS-64 — Password change flow

There's no way for a user to change their own password — only an admin editing the user record. Add `PATCH /api/auth/password` requiring the current password.
**Depends on:** PS-43.

### PS-65 — Audit log

Admin actions (user created/deactivated, record deleted, machine reassigned) leave no trace. Add an `AuditLog` entity written by an interceptor, plus a dashboard view.
**Depends on:** PS-51.

### PS-66 — Refresh tokens

The JWT expires in 1h and `client/middleware.ts` just redirects to login on expiry — an operator gets kicked out mid-shift. Add refresh tokens with rotation, or extend the session with a sliding cookie.
**Related:** PS-50.

### PS-80 — Forgot password flow

Since PS-43 the stored password is a bcrypt hash, so nobody — not even an admin — can read or restore a forgotten one, and the password field was removed from the user edit form (`client/ui/dashboard/users/edit/EditUserForm.tsx`) because editing it there would have silently reset it. That leaves a locked-out operator with no recovery path. Add:

- `POST /api/auth/forgot-password` taking an email/username, issuing a single-use, short-lived (~15 min) reset token stored hashed on a `PasswordReset` entity, and always returning 200 so the endpoint can't be used to enumerate accounts.
- `POST /api/auth/reset-password` validating the token, setting the new password through `UsersService.update`, and invalidating every outstanding token for that user.
- A "Esqueceu-se da password?" link on `client/ui/login-form.tsx` plus the request and reset pages.
- Delivery: users already carry an `email` column, so email is the natural channel — needs an SMTP provider in config. If the plant has no mail for operators, fall back to an admin-triggered reset that produces a one-time link.

Both new routes must be `@Public()` (PS-45) and throttled (PS-76), or they become an unauthenticated way to reset anyone's password.
**Depends on:** PS-43. **Related:** PS-64, PS-76, PS-45.

---

## Testing & CI (P2)

### PS-67 — Fix the placeholder e2e test

`server/test/app.e2e-spec.ts` still asserts `GET /` returns `Hello World!` — there is no root controller, so it fails. Replace it with real e2e coverage (login → create record → query stats) against a throwaway MySQL container.
**Blocks:** PS-68.

### PS-68 — Re-enable tests in CI

`.github/workflows/build-server.yml` has `# - name: Run tests` commented out. Uncomment it, add `pnpm lint`, add a coverage threshold. Neither workflow currently runs anything but a build.
**Depends on:** PS-67.

### PS-69 — Normalize test directory names

`server/src/machines/__tests` and `server/src/options/__tests` are missing the trailing underscores that `lines`, `records`, and `users` use (`__tests__`). Harmless today because the jest `testRegex` matches `.spec.ts` anywhere, but it breaks tooling that assumes the convention.

### PS-70 — Add client-side tests

The Next.js app has zero tests. Add Vitest + Testing Library for the zod schemas and form components, and Playwright for the two critical flows (admin login → dashboard, operator login → register action).

---

## Developer experience & ops (P2–P3)

### PS-71 — Write a real root README

There is no top-level README — `client/README.md` is untouched `create-next-app` boilerplate and `server/README.md` is the NestJS starter. Add setup steps, the env var table (`DB_*`, `JWT_SECRET`, `API_INTERNAL_URL`, `NEXT_PUBLIC_API_ENDPOINT_URL`), an architecture overview, and the AGPL-3.0 notice.

### PS-72 — Add `.env.example` and harden `.gitignore`

`.env`, `client/.env`, and `server/.env` exist locally while `.gitignore` only covers `.env*.local`. They aren't tracked today — keep it that way by ignoring `.env` explicitly, and commit `.env.example` files instead.
**Related:** PS-44.

### PS-73 — Fix the Swagger metadata

`main.ts` sets `.setTitle('RestaurantWebsite API')` — leftover from another project. Rename to ProdSync, add `.addBearerAuth()`, and tag/describe the record-stats endpoints that currently have no `@ApiOperation`.

### PS-74 — Harden `docker-compose.yml`

`version: '0.2'` is not a valid Compose version, MySQL has no healthcheck so `backend` starts before the DB is ready, and there's no dev override for hot reload. Add `depends_on: condition: service_healthy` and a `compose.dev.yml`.
**Related:** PS-75.

### PS-75 — Structured logging and a health endpoint

The server uses bare `console.error` (`records.service.ts`). Add `nestjs-pino` with request IDs, plus `@nestjs/terminus` at `GET /api/health` for the container healthcheck and any future orchestrator.

### PS-76 — Rate limit the login endpoint

`POST /api/auth/login` is unthrottled. Add `@nestjs/throttler` globally, with a tighter limit on the auth routes.

### PS-77 — Extract the UI strings

Portuguese copy is inlined across components (`"Utilizador não encontrado"` on the server; `"Linha 1"` and sidebar labels on the client). Add `next-intl` with a `pt`/`en` catalog — including server error messages, so the API returns codes and the client translates.
**Depends on:** PS-78.

### PS-78 — Add a global exception filter

Every service repeats the same `try/catch` → `InternalServerErrorException` pattern with a hand-written message. A single `HttpExceptionFilter` returning a consistent `ErrorResponse` shape would remove the duplication and stop leaking raw errors (`users.service.ts` passes `error` as the second arg to `InternalServerErrorException`).

### PS-79 — Gitignore build artifacts

`server/dist/` and `client/.next/` are present on disk. `.gitignore` covers `/.next/` and `/build` at the root but not `server/dist`. Add it before something gets committed.

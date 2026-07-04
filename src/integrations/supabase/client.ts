import type { Json } from "./types";
import { SESSION_TIMEOUT_MINUTES } from "@/lib/security/sessionPolicy";

type AuthChangeCallback = (
  event: "SIGNED_IN" | "SIGNED_OUT" | "TOKEN_REFRESHED",
  session: LocalSession | null
) => void;

interface LocalUser {
  id: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  user_metadata: Record<string, unknown>;
}

interface LocalSession {
  access_token: string;
  expires_at: number;
  user: {
    id: string;
    email: string;
    user_metadata: Record<string, unknown>;
  };
}

interface QueryError {
  message: string;
}

type QueryResult<T> = { data: T | null; error: QueryError | null };

const STORAGE_KEYS = {
  users: "__ian_users",
  session: "__ian_session",
  tables: "__ian_tables",
  tablesVersion: "__ian_tables_version",
  uploads: "__ian_uploads",
  backupVersion: "__ian_backup_version",
} as const;

type LocalTables = Record<string, Array<Record<string, unknown>>>;

const authSubscribers = new Set<AuthChangeCallback>();

const seedTables = (): LocalTables => ({
  conversations: [],
  chat_messages: [],
  user_documents: [],
  knowledge_domains: [
    {
      id: crypto.randomUUID(),
      name: "Federal Acquisition Regulation",
      description: "Core FAR principles and procedures.",
      domain_type: "CORE",
      coordinates: "FAR",
      created_at: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "DFARS Supplements",
      description: "Defense federal acquisition supplements and policies.",
      domain_type: "SPECIALIZED",
      coordinates: "DFARS",
      created_at: new Date().toISOString(),
    },
  ],
  ai_analysis_records: [],
  proposals: [
    {
      id: "proposal-1",
      title: "Office Supplies Procurement Q1",
      vendor: "SupplyTech Solutions",
      amount: 24500,
      submittedDate: "2024-02-10",
      status: "pending",
      review_time_minutes: 18,
    },
    {
      id: "proposal-2",
      title: "IT Equipment Refresh",
      vendor: "TechVendor Pro",
      amount: 185000,
      submittedDate: "2024-02-08",
      status: "approved",
      review_time_minutes: 11,
    },
    {
      id: "proposal-3",
      title: "Facility Maintenance Services",
      vendor: "MaintenanceCorp",
      amount: 95000,
      submittedDate: "2024-02-05",
      status: "rejected",
      review_time_minutes: 24,
    },
  ],
  solicitations: [
    {
      id: "sol-1",
      title: "IT Services Support",
      status: "pending",
      riskLevel: "low",
      dueDate: "2024-03-15",
      department: "Information Technology",
    },
    {
      id: "sol-2",
      title: "Office Equipment Procurement",
      status: "review",
      riskLevel: "medium",
      dueDate: "2024-03-20",
      department: "Facilities",
    },
    {
      id: "sol-3",
      title: "Security Services Contract",
      status: "pending",
      riskLevel: "high",
      dueDate: "2024-03-25",
      department: "Security",
    },
  ],
  documents: [
    {
      id: "doc-1",
      title: "Federal Acquisition Regulation Update 2024",
      type: "Policy",
      status: "approved",
      lastModified: "2024-02-15",
      owner: "John Smith",
    },
    {
      id: "doc-2",
      title: "IT Equipment Procurement Guidelines",
      type: "Procedure",
      status: "review",
      lastModified: "2024-02-14",
      owner: "Sarah Johnson",
    },
    {
      id: "doc-3",
      title: "Vendor Evaluation Template",
      type: "Template",
      status: "draft",
      lastModified: "2024-02-13",
      owner: "Michael Brown",
    },
  ],
  vendors: [
    {
      id: "vendor-1",
      name: "TechCorp Solutions",
      category: "IT Services",
      rating: 4.5,
      contracts: 12,
      performance: 92,
    },
    {
      id: "vendor-2",
      name: "Global Office Supply",
      category: "Office Supplies",
      rating: 4.2,
      contracts: 8,
      performance: 88,
    },
    {
      id: "vendor-3",
      name: "SecureNet Systems",
      category: "Cybersecurity",
      rating: 4.8,
      contracts: 15,
      performance: 95,
    },
  ],
  market_metrics: [
    { id: "metric-jan", month: "Jan", efficiency: 85, compliance: 90, risk: 15 },
    { id: "metric-feb", month: "Feb", efficiency: 88, compliance: 92, risk: 12 },
    { id: "metric-mar", month: "Mar", efficiency: 92, compliance: 95, risk: 8 },
  ],
  task_queue: [
    {
      id: "task-1",
      title: "Review IT Services Support solicitation",
      priority: "high",
      status: "pending",
      owner: "Contract Specialist",
    },
    {
      id: "task-2",
      title: "Validate source selection factors for office equipment procurement",
      priority: "medium",
      status: "in_progress",
      owner: "Contracting Officer",
    },
    {
      id: "task-3",
      title: "Finalize approved proposal package for IT Equipment Refresh",
      priority: "low",
      status: "completed",
      owner: "Program Manager",
    },
  ],
  reasoning_steps: [],
  compliance_checks: [],
  reasoning_results: [],
  reasoning_result_steps: [],
  reasoning_result_checks: [],
});

export interface LocalAppBackup {
  version: number;
  exportedAt: string;
  data: {
    users: LocalUser[];
    session: LocalSession | null;
    tables: LocalTables;
    uploads: Array<{ bucket: string; path: string; name: string; size: number; type: string }>;
  };
}

const readJSON = <T>(key: string, fallback: T): T => {
  const raw = localStorage.getItem(key);
  if (!raw) {
    return fallback;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const writeJSON = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const PBKDF2_ITERATIONS = 100_000;

const toHex = (buffer: ArrayBuffer): string =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

/**
 * Derives a PBKDF2-SHA256 hash of a password using a per-user random salt.
 * Even in this self-contained/local-only app, passwords must never be stored
 * in plaintext — users frequently reuse passwords across services, and
 * localStorage is readable by any XSS payload or browser extension.
 */
const hashPassword = async (password: string, salt: string): Promise<string> => {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: encoder.encode(salt),
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );
  return toHex(derivedBits);
};

const getTables = (): LocalTables => {
  const existing = readJSON<LocalTables | null>(STORAGE_KEYS.tables, null);
  if (existing) {
    return existing;
  }
  const seeded = seedTables();
  writeJSON(STORAGE_KEYS.tables, seeded);
  return seeded;
};

const saveTables = (tables: LocalTables) => writeJSON(STORAGE_KEYS.tables, tables);

const getTablesVersion = (): number => {
  const raw = localStorage.getItem(STORAGE_KEYS.tablesVersion);
  const parsed = raw ? Number(raw) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
};

const setTablesVersion = (version: number) => {
  localStorage.setItem(STORAGE_KEYS.tablesVersion, String(version));
};

/**
 * Applies `mutator` to the freshest available table snapshot and persists
 * the result. localStorage has no cross-tab locking primitive, so two tabs
 * writing around the same moment can otherwise silently clobber each
 * other's inserts (last writer wins, wholesale). This uses a lightweight
 * version stamp to detect the case where another tab wrote in between our
 * read and our write, and if so, re-applies the same mutation on top of
 * that newer snapshot instead of overwriting it — see code review Finding
 * #7 (cross-tab data loss). This is a pragmatic mitigation, not a full
 * transactional guarantee (true mutual exclusion would require the Web
 * Locks API and an async client contract, which isn't compatible with the
 * synchronous `.insert().select()` chaining used throughout the app).
 */
const mutateTables = (mutator: (tables: LocalTables) => void): LocalTables => {
  const versionBeforeRead = getTablesVersion();
  const tables = getTables();
  mutator(tables);

  const versionAfterMutation = getTablesVersion();
  if (versionAfterMutation !== versionBeforeRead) {
    // Another tab wrote after we read — redo the mutation against the
    // latest snapshot rather than overwriting that write.
    const latestTables = getTables();
    mutator(latestTables);
    saveTables(latestTables);
    setTablesVersion(versionAfterMutation + 1);
    return latestTables;
  }

  saveTables(tables);
  setTablesVersion(versionBeforeRead + 1);
  return tables;
};

const getUsers = (): LocalUser[] => readJSON<LocalUser[]>(STORAGE_KEYS.users, []);
const saveUsers = (users: LocalUser[]) => writeJSON(STORAGE_KEYS.users, users);

const getSession = (): LocalSession | null =>
  readJSON<LocalSession | null>(STORAGE_KEYS.session, null);
const saveSession = (session: LocalSession | null) => {
  if (!session) {
    localStorage.removeItem(STORAGE_KEYS.session);
    return;
  }
  writeJSON(STORAGE_KEYS.session, session);
};

const ensureSeededState = () => {
  if (!localStorage.getItem(STORAGE_KEYS.tables)) {
    writeJSON(STORAGE_KEYS.tables, seedTables());
  }
  if (!localStorage.getItem(STORAGE_KEYS.users)) {
    writeJSON(STORAGE_KEYS.users, []);
  }
  if (!localStorage.getItem(STORAGE_KEYS.uploads)) {
    writeJSON(STORAGE_KEYS.uploads, []);
  }
  if (!localStorage.getItem(STORAGE_KEYS.backupVersion)) {
    localStorage.setItem(STORAGE_KEYS.backupVersion, "1");
  }
};

const asAuthUser = (user: LocalUser): LocalSession["user"] => ({
  id: user.id,
  email: user.email,
  user_metadata: user.user_metadata ?? {},
});

const emitAuthChange = (
  event: "SIGNED_IN" | "SIGNED_OUT" | "TOKEN_REFRESHED",
  session: LocalSession | null
) => {
  authSubscribers.forEach((callback) => callback(event, session));
};

const nowPlusMinutes = (minutes: number) => Math.floor(Date.now() / 1000) + minutes * 60;

const ensureTable = (tables: LocalTables, table: string): Array<Record<string, unknown>> => {
  if (!tables[table]) {
    tables[table] = [];
  }
  return tables[table];
};

const normalizeRow = (row: Record<string, unknown>) => ({
  id: (typeof row.id === "string" && row.id.length > 0 ? row.id : crypto.randomUUID()) as string,
  created_at: (typeof row.created_at === "string" ? row.created_at : new Date().toISOString()) as string,
  ...row,
});

const projectRows = (
  rows: Array<Record<string, unknown>>,
  columns: string
): Array<Record<string, unknown>> => {
  if (!columns || columns === "*") {
    return rows.map((r) => ({ ...r }));
  }
  const keys = columns.split(",").map((k) => k.trim()).filter(Boolean);
  return rows.map((row) => {
    const projected: Record<string, unknown> = {};
    keys.forEach((key) => {
      projected[key] = row[key];
    });
    return projected;
  });
};

class SelectBuilder implements PromiseLike<QueryResult<Array<Record<string, unknown>>>> {
  private rows: Array<Record<string, unknown>>;

  constructor(rows: Array<Record<string, unknown>>) {
    this.rows = rows;
  }

  order(column: string, options?: { ascending?: boolean }) {
    const ascending = options?.ascending !== false;
    this.rows = [...this.rows].sort((a, b) => {
      const left = a[column];
      const right = b[column];
      if (left === right) return 0;
      if (left === undefined || left === null) return ascending ? -1 : 1;
      if (right === undefined || right === null) return ascending ? 1 : -1;
      return (String(left) < String(right) ? -1 : 1) * (ascending ? 1 : -1);
    });
    return this;
  }

  limit(count: number) {
    this.rows = this.rows.slice(0, count);
    return this;
  }

  in(column: string, values: string[]) {
    this.rows = this.rows.filter((row) => values.includes(String(row[column])));
    return this;
  }

  eq(column: string, value: unknown) {
    this.rows = this.rows.filter((row) => row[column] === value);
    return this;
  }

  async single(): Promise<QueryResult<Record<string, unknown>>> {
    const first = this.rows[0];
    if (!first) {
      return { data: null, error: { message: "No rows returned" } };
    }
    return { data: first, error: null };
  }

  then<TResult1 = QueryResult<Array<Record<string, unknown>>>, TResult2 = never>(
    onfulfilled?:
      | ((value: QueryResult<Array<Record<string, unknown>>>) => TResult1 | PromiseLike<TResult1>)
      | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    return Promise.resolve({ data: this.rows, error: null }).then(onfulfilled, onrejected);
  }
}

class InsertBuilder implements PromiseLike<QueryResult<null>> {
  private inserted: Array<Record<string, unknown>>;

  constructor(inserted: Array<Record<string, unknown>>) {
    this.inserted = inserted;
  }

  select(columns = "*") {
    return new SelectBuilder(projectRows(this.inserted, columns));
  }

  async single(): Promise<QueryResult<Record<string, unknown>>> {
    const first = this.inserted[0];
    if (!first) {
      return { data: null, error: { message: "No rows inserted" } };
    }
    return { data: first, error: null };
  }

  then<TResult1 = QueryResult<null>, TResult2 = never>(
    onfulfilled?: ((value: QueryResult<null>) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    return Promise.resolve({ data: null, error: null }).then(onfulfilled, onrejected);
  }
}

export const supabase = {
  auth: {
    async signUp({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<QueryResult<{ user: LocalSession["user"]; session: LocalSession }>> {
      const users = getUsers();
      const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return { data: null, error: { message: "A user with this email already exists." } };
      }

      const passwordSalt = crypto.randomUUID();
      const passwordHash = await hashPassword(password, passwordSalt);

      const user: LocalUser = {
        id: crypto.randomUUID(),
        email: email.trim(),
        passwordHash,
        passwordSalt,
        user_metadata: { role: "CONTRACT_SPECIALIST" },
      };
      users.push(user);
      saveUsers(users);

      const session: LocalSession = {
        access_token: crypto.randomUUID(),
        expires_at: nowPlusMinutes(SESSION_TIMEOUT_MINUTES),
        user: asAuthUser(user),
      };
      saveSession(session);
      emitAuthChange("SIGNED_IN", session);

      return { data: { user: session.user, session }, error: null };
    },

    async signInWithPassword({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<QueryResult<{ user: LocalSession["user"]; session: LocalSession }>> {
      const users = getUsers();
      const candidate = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (!candidate) {
        return { data: null, error: { message: "Invalid email or password." } };
      }

      const candidateHash = await hashPassword(password, candidate.passwordSalt);
      // Compare hashes only — the plaintext password is never stored or compared directly.
      if (candidateHash !== candidate.passwordHash) {
        return { data: null, error: { message: "Invalid email or password." } };
      }
      const user = candidate;

      const session: LocalSession = {
        access_token: crypto.randomUUID(),
        expires_at: nowPlusMinutes(SESSION_TIMEOUT_MINUTES),
        user: asAuthUser(user),
      };
      saveSession(session);
      emitAuthChange("SIGNED_IN", session);

      return { data: { user: session.user, session }, error: null };
    },

    async getUser(): Promise<QueryResult<{ user: LocalSession["user"] | null }>> {
      const session = getSession();
      return { data: { user: session?.user ?? null }, error: null };
    },

    async getSession(): Promise<QueryResult<{ session: LocalSession | null }>> {
      return { data: { session: getSession() }, error: null };
    },

    async signOut(): Promise<QueryResult<null>> {
      saveSession(null);
      emitAuthChange("SIGNED_OUT", null);
      return { data: null, error: null };
    },

    async resetPasswordForEmail(
      _email: string,
      _options?: { redirectTo?: string }
    ): Promise<QueryResult<null>> {
      return { data: null, error: null };
    },

    onAuthStateChange(callback: AuthChangeCallback) {
      authSubscribers.add(callback);
      return {
        data: {
          subscription: {
            unsubscribe: () => authSubscribers.delete(callback),
          },
        },
      };
    },

    async updateUser({
      data,
    }: {
      data: Record<string, unknown>;
    }): Promise<QueryResult<{ user: LocalSession["user"] }>> {
      const session = getSession();
      if (!session?.user) {
        return { data: null, error: { message: "No authenticated user." } };
      }

      const users = getUsers();
      const target = users.find((user) => user.id === session.user.id);
      if (!target) {
        return { data: null, error: { message: "User record not found." } };
      }

      // Security: `role` drives authorization (see accessControl.ts / ProtectedRoute).
      // It must never be settable through the generic profile-update path, or any
      // authenticated user could grant themselves elevated permissions (e.g.
      // SYSTEM_ADMIN) simply by editing their own profile. Strip it here as a
      // defense-in-depth measure regardless of what any calling UI submits.
      const { role: _ignoredRole, ...safeData } = data;

      target.user_metadata = {
        ...(target.user_metadata ?? {}),
        ...safeData,
      };
      saveUsers(users);

      const updatedSession: LocalSession = {
        ...session,
        user: {
          ...session.user,
          user_metadata: target.user_metadata,
        },
      };
      saveSession(updatedSession);
      emitAuthChange("TOKEN_REFRESHED", updatedSession);

      return { data: { user: updatedSession.user }, error: null };
    },
  },

  from(table: string) {
    return {
      select: (columns = "*") => {
        const tables = getTables();
        const rows = projectRows(ensureTable(tables, table), columns);
        return new SelectBuilder(rows);
      },

      insert: (payload: Record<string, unknown> | Array<Record<string, unknown>>) => {
        const rows = (Array.isArray(payload) ? payload : [payload]).map((row) =>
          normalizeRow(row)
        );
        mutateTables((tables) => {
          const target = ensureTable(tables, table);
          target.push(...rows);
        });
        return new InsertBuilder(rows);
      },
    };
  },

  storage: {
    from(bucket: string) {
      return {
        async upload(path: string, file: File): Promise<QueryResult<{ path: string }>> {
          const uploads = readJSON<
            Array<{ bucket: string; path: string; name: string; size: number; type: string }>
          >(STORAGE_KEYS.uploads, []);
          uploads.push({
            bucket,
            path,
            name: file.name,
            size: file.size,
            type: file.type,
          });
          writeJSON(STORAGE_KEYS.uploads, uploads);
          return { data: { path }, error: null };
        },
      };
    },
  },

  async rpc(name: string, _args?: Record<string, Json>): Promise<QueryResult<string>> {
    if (name === "create_password_reset_token") {
      return { data: crypto.randomUUID(), error: null };
    }
    return { data: null, error: { message: `RPC ${name} is not implemented.` } };
  },

  functions: {
    async invoke(_name: string): Promise<QueryResult<never>> {
      return {
        data: null,
        error: { message: "Edge Functions are disabled in self-contained mode." },
      };
    },
  },
};

export const exportLocalAppBackup = (): LocalAppBackup => {
  ensureSeededState();
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    data: {
      users: getUsers(),
      session: getSession(),
      tables: getTables(),
      uploads: readJSON(STORAGE_KEYS.uploads, []),
    },
  };
};

export const importLocalAppBackup = (backup: LocalAppBackup): void => {
  if (!backup || typeof backup !== "object" || !backup.data) {
    throw new Error("Invalid backup format.");
  }

  writeJSON(STORAGE_KEYS.users, backup.data.users ?? []);
  writeJSON(STORAGE_KEYS.session, backup.data.session ?? null);
  writeJSON(STORAGE_KEYS.tables, backup.data.tables ?? seedTables());
  writeJSON(STORAGE_KEYS.uploads, backup.data.uploads ?? []);
  localStorage.setItem(STORAGE_KEYS.backupVersion, String(backup.version ?? 1));
  setTablesVersion(0);

  const session = getSession();
  emitAuthChange(session ? "TOKEN_REFRESHED" : "SIGNED_OUT", session);
};

export const resetLocalAppData = (): void => {
  localStorage.removeItem(STORAGE_KEYS.users);
  localStorage.removeItem(STORAGE_KEYS.session);
  localStorage.removeItem(STORAGE_KEYS.tables);
  localStorage.removeItem(STORAGE_KEYS.tablesVersion);
  localStorage.removeItem(STORAGE_KEYS.uploads);
  localStorage.removeItem(STORAGE_KEYS.backupVersion);
  ensureSeededState();
  emitAuthChange("SIGNED_OUT", null);
};

ensureSeededState();

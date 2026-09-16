import { pgTable, uuid ,varchar, timestamp} from 'drizzle-orm/pg-core'

export const users = pgTable('users',{
    userid: uuid('userid').defaultRandom().primaryKey(),
    username: varchar('username',{length:50}).notNull(),
    email: varchar('email',{length:255}).notNull().unique(),
    password_hash: varchar('password_hash',{length:255}).notNull(),
    created_at: timestamp('created_at',{ withTimezone:true }).notNull().defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone:true }).defaultNow().notNull().$onUpdate(()=> new Date())
});

export const sessions = pgTable('sessions',{
    sessionid: varchar('sessionid',{length:255}).primaryKey(),
    userid: uuid('userid').references(() => users.userid,{onDelete:'cascade'}).notNull(),
    expires_at:timestamp('expires_at',{withTimezone:true}).notNull(),
    created_at: timestamp('created_at',{ withTimezone:true }).notNull().defaultNow()
});
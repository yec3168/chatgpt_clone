import { integer, pgTable, varchar, timestamp, uuid} from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

export const user = pgTable("users", {
    id: uuid().defaultRandom().notNull().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    age: integer(), //.notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({length: 255}).notNull(),
    createAt: timestamp().defaultNow().notNull(),
    updateAt: timestamp().defaultNow().notNull(),
});

// one-to-many 관계
export const userRelations = relations(user, ({ many }) => ({
	conversation: many(conversation),
}));

// 대화방
export const conversation = pgTable("conversation", {
    id: uuid().defaultRandom().notNull().primaryKey(),
    name: varchar({ length: 255 }),
    userId: uuid()
            .references(() => user.id, {onDelete: 'cascade'})
            .notNull(),
    createAt: timestamp().defaultNow().notNull(),
    updateAt: timestamp().defaultNow().notNull(),
    
})

export const conversationRelations = relations(conversation, ({ one, many }) => ({
	user: one(user, {
		fields: [conversation.userId],
		references: [user.id],
	}),
    
    message: many(message),
}));


//대화방의 메세지
export const message = pgTable("message", {
    id: uuid().defaultRandom().notNull().primaryKey(),
    message: varchar({ length: 255 }),
    role: varchar().$type<"user"|"assiant">(),
    conversationId: uuid()
                    .references(() => conversation.id, {onDelete: 'cascade'})
                    .notNull(),
    createAt: timestamp().defaultNow().notNull(),
    updateAt: timestamp().defaultNow().notNull(),
})

export const messageRelations = relations(message, ({ one }) => ({
	conversation: one(conversation, {
		fields: [message.conversationId],
		references: [conversation.id],
	}),
}));
/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import {
	PrimaryColumn,
	Entity,
	Index,
	JoinColumn,
	Column,
	ManyToOne,
} from "typeorm";
import { id } from "../util/id.js";
import { MiUser } from "../user/User.js";
import { MiPage } from "./Page.js";

@Entity("page_like")
@Index(["userId", "pageId"], { unique: true })
export class MiPageLike {
	@PrimaryColumn(id())
	public id: string;

	@Column("timestamp with time zone")
	public createdAt: Date;

	@Index()
	@Column(id())
	public userId: MiUser["id"];

	@ManyToOne((type) => MiUser, {
		onDelete: "CASCADE",
	})
	@JoinColumn()
	public user: MiUser | null;

	@Column(id())
	public pageId: MiPage["id"];

	@ManyToOne((type) => MiPage, {
		onDelete: "CASCADE",
	})
	@JoinColumn()
	public page: MiPage | null;
}

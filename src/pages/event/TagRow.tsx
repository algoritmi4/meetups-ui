
import { ReactElement } from "react";
import { IEventTag } from "@/entities/event/model/types";

interface ITagRow {
    tags: IEventTag[];
}

export function TagRow({tags}: ITagRow): ReactElement {
    return (
        <div className="flex flex-wrap justify-start gap-x-3 gap-y-3 pr-64 pt-5 self-stretch">
            {tags.map(tag => (
                <div key={tag.id}
                        className="rounded-xl border border-main-purple px-5 py-1.5 text-lg font-normal text-main-purple">
                    {tag.name}
                </div>
            ))}
        </div>
    )
}

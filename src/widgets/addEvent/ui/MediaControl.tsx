import { TagsControl } from "@/entities/tags";
import { AddEventValidationSchema } from "@/features/addEvent/addEventForm/model/addEventFormSchema";
import { Gallery } from "@/features/addEvent/gallery";
import { ISelectInputOptions } from "@/shared/model/types";
import { ReactElement } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IMediaControlProps {
  tags: ISelectInputOptions[];
}

export function MediaControl({ tags }: IMediaControlProps): ReactElement {
  const {
    control
  } = useFormContext<AddEventValidationSchema>();

  return (
    <>
      <Controller
        name="gallery"
        control={control}
        render={({ field: { onChange, value }}) => (
          <Gallery
            onChange={(image_url: string) => {
              onChange([...value, image_url]);
            }}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="tags"
        render={({ field: { onChange, value } }) => (
          <TagsControl
            tags={tags}
            onChange={(tagId: number, toRemove: boolean) => 
              toRemove ? onChange(value.filter((el) => el !== tagId)) : onChange([...value, tagId])
            }
            value={value}
          />
        )}
      />
    </>
  )
}

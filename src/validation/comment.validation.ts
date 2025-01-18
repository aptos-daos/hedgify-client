import { z } from 'zod';

const commentSchema = z.object({
    id: z.string().uuid().optional(),
    comment: z.string().min(1, "Comment cannot be empty"),
    name: z.string().min(1, "Name cannot be empty"),
    userId: z.string().min(1, "User Id cant be empty"),
    likes: z.number().int().default(0),
    image: z.string().url("Invalid image URL")
});

export type Comment = z.infer<typeof commentSchema>
export { commentSchema };
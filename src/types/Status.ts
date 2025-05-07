export const Status = {
    Draft: "Draft",
    Published: "Published"
} as const

export type PostStatus = (typeof Status)[keyof typeof Status]
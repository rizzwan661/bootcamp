export const Status = {
    Draft: "Draft",
    Published: "Published"
} as const

export type BlogStatus = (typeof Status)[keyof typeof Status]
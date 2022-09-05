export interface AttendeeInterface {
  readonly userId:string
  readonly id:string
  readonly name:string
  readonly avatar:string
  readonly isPresent:boolean
  readonly type?:string
  readonly updatedAt: Date
}
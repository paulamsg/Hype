import axios from 'axios'

const api = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
})

export type GroupMember = {
  id: number
  name: string
  lastName: string
  username: string
  avatarUrl: string | null
}

export type GroupEvent = {
  id: number
  eventId: string
  name?: string
  date?: string
  venue?: string
  city?: string
  image?: string
  sharedBy: { id: number; name: string; username: string; avatarUrl: string | null }
}

export type Group = {
  id: number
  name: string
  createdBy: number
  memberCount: number
}

export type GroupDetail = {
  id: number
  name: string
  createdBy: number
  members: GroupMember[]
  events: GroupEvent[]
}

export const getGroupIdsForEvent = async (eventId: string): Promise<number[]> => {
  const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/groups/event-groups?eventId=${encodeURIComponent(eventId)}`, api())
  return res.data.groupIds
}

export const getSharedEventIds = async (): Promise<string[]> => {
  const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/groups/shared-event-ids`, api())
  return res.data.eventIds
}

export const createGroup = async (name: string): Promise<Group> => {
  const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/groups`, { name }, api())
  return res.data.group
}

export const getMyGroups = async (): Promise<Group[]> => {
  const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/groups`, api())
  return res.data.groups
}

export const getGroupById = async (id: number): Promise<GroupDetail> => {
  const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/groups/${id}`, api())
  return res.data.group
}

export const updateGroupName = async (groupId: number, name: string): Promise<void> => {
  await axios.patch(`${import.meta.env.VITE_SERVER_URL}/groups/${groupId}`, { name }, api())
}

export const addMember = async (groupId: number, memberId: number): Promise<void> => {
  await axios.post(`${import.meta.env.VITE_SERVER_URL}/groups/${groupId}/members`, { memberId }, api())
}

export const removeMember = async (groupId: number, memberId: number): Promise<void> => {
  await axios.delete(`${import.meta.env.VITE_SERVER_URL}/groups/${groupId}/members/${memberId}`, api())
}

export const deleteGroup = async (groupId: number): Promise<void> => {
  await axios.delete(`${import.meta.env.VITE_SERVER_URL}/groups/${groupId}`, api())
}

export const addEventToGroup = async (
  groupId: number,
  event: { eventId: string; name?: string; date?: string; venue?: string; city?: string; image?: string },
): Promise<void> => {
  await axios.post(`${import.meta.env.VITE_SERVER_URL}/groups/${groupId}/events`, event, api())
}

export const removeEventFromGroup = async (groupId: number, groupEventId: number): Promise<void> => {
  await axios.delete(`${import.meta.env.VITE_SERVER_URL}/groups/${groupId}/events/${groupEventId}`, api())
}

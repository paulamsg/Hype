import { Response } from 'express'
import prisma from '../config/database'
import { AuthRequest } from '../middleware/auth.middleware'

export const getGroupIdsForEvent = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'No autorizado' })

  const eventId = req.query.eventId as string
  if (!eventId) return res.status(400).json({ error: 'Falta el eventId' })

  try {
    const rows = await prisma.groupEvent.findMany({
      where: { userId, eventId },
      select: { groupId: true },
    })
    return res.status(200).json({ groupIds: rows.map((r) => r.groupId) })
  } catch (e) {
    return res.status(500).json({ error: 'Error' })
  }
}

export const getSharedEventIds = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'No autorizado' })

  try {
    const events = await prisma.groupEvent.findMany({
      where: { userId },
      select: { eventId: true },
    })
    return res.status(200).json({ eventIds: [...new Set(events.map(e => e.eventId))] })
  } catch (e) {
    return res.status(500).json({ error: 'Error' })
  }
}

export const createGroup = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'No autorizado' })

  const { name } = req.body
  if (!name?.trim()) return res.status(400).json({ error: 'El nombre es obligatorio' })

  try {
    const group = await prisma.$transaction(async (tx) => {
      const created = await tx.group.create({ data: { name: name.trim(), createdBy: userId } })
      await tx.groupMember.create({ data: { groupId: created.id, userId } })
      return created
    })
    return res.status(201).json({ group })
  } catch (e) {
    return res.status(500).json({ error: 'Error al crear el grupo' })
  }
}

export const getMyGroups = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'No autorizado' })

  try {
    const memberships = await prisma.groupMember.findMany({
      where: { userId },
      include: {
        group: { include: { _count: { select: { members: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    })

    const groups = memberships.map((m) => ({
      id: m.group.id,
      name: m.group.name,
      createdBy: m.group.createdBy,
      memberCount: m.group._count.members,
    }))

    return res.status(200).json({ groups })
  } catch (e) {
    return res.status(500).json({ error: 'Error al obtener los grupos' })
  }
}

export const getGroupById = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'No autorizado' })

  const groupId = Number(req.params.id)

  try {
    const membership = await prisma.groupMember.findUnique({
      where: { groupId_userId: { groupId, userId } },
    })
    if (!membership) return res.status(403).json({ error: 'No perteneces a este grupo' })

    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: {
        members: {
          include: {
            user: { select: { id: true, name: true, lastName: true, username: true, avatarUrl: true } },
          },
        },
        events: {
          include: {
            user: { select: { id: true, name: true, username: true, avatarUrl: true } },
            votes: {
              include: { user: { select: { id: true, name: true, username: true, avatarUrl: true } } },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!group) return res.status(404).json({ error: 'Grupo no encontrado' })

    return res.status(200).json({
      group: {
        id: group.id,
        name: group.name,
        createdBy: group.createdBy,
        members: group.members.map((m) => ({
          id: m.user.id,
          name: m.user.name,
          lastName: m.user.lastName,
          username: m.user.username,
          avatarUrl: m.user.avatarUrl,
        })),
        events: group.events.map((e) => {
          const toVoter = (v: { user: { id: number; name: string; username: string; avatarUrl: string | null } }) => ({
            id: v.user.id, name: v.user.name, username: v.user.username, avatarUrl: v.user.avatarUrl,
          })
          return {
            id: e.id,
            eventId: e.eventId,
            name: e.name,
            date: e.date,
            venue: e.venue,
            city: e.city,
            image: e.image,
            sharedBy: { id: e.user.id, name: e.user.name, username: e.user.username, avatarUrl: e.user.avatarUrl },
            votes: {
              GOING: e.votes.filter(v => v.vote === 'GOING').map(toVoter),
              NOT_INTERESTED: e.votes.filter(v => v.vote === 'NOT_INTERESTED').map(toVoter),
              CANT_GO: e.votes.filter(v => v.vote === 'CANT_GO').map(toVoter),
              myVote: e.votes.find(v => v.userId === userId)?.vote ?? null,
            },
          }
        }),
      },
    })
  } catch (e) {
    return res.status(500).json({ error: 'Error al obtener el grupo' })
  }
}

export const updateGroup = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'No autorizado' })

  const groupId = Number(req.params.id)
  const { name } = req.body
  if (!name?.trim()) return res.status(400).json({ error: 'El nombre es obligatorio' })

  try {
    const group = await prisma.group.findUnique({ where: { id: groupId } })
    if (!group) return res.status(404).json({ error: 'Grupo no encontrado' })
    if (group.createdBy !== userId) return res.status(403).json({ error: 'Solo el creador puede editar el grupo' })

    const updated = await prisma.group.update({ where: { id: groupId }, data: { name: name.trim() } })
    return res.status(200).json({ group: updated })
  } catch (e) {
    return res.status(500).json({ error: 'Error al actualizar el grupo' })
  }
}

export const addMember = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'No autorizado' })

  const groupId = Number(req.params.id)
  const { memberId } = req.body

  try {
    const group = await prisma.group.findUnique({ where: { id: groupId } })
    if (!group) return res.status(404).json({ error: 'Grupo no encontrado' })
    if (group.createdBy !== userId) return res.status(403).json({ error: 'Solo el creador puede añadir miembros' })

    const existing = await prisma.groupMember.findUnique({
      where: { groupId_userId: { groupId, userId: memberId } },
    })
    if (existing) return res.status(409).json({ error: 'El usuario ya está en el grupo' })

    const adder = await prisma.user.findUnique({ where: { id: userId }, select: { name: true, username: true } })

    await prisma.$transaction([
      prisma.groupMember.create({ data: { groupId, userId: memberId } }),
      prisma.notification.create({
        data: {
          userId: memberId,
          senderId: userId,
          type: 'GROUP_ADDED',
          groupId,
          message: `${adder?.name} (@${adder?.username}) te ha añadido al grupo "${group.name}"`,
        },
      }),
    ])

    return res.status(201).json({ message: 'Miembro añadido' })
  } catch (e) {
    return res.status(500).json({ error: 'Error al añadir el miembro' })
  }
}

export const removeMember = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'No autorizado' })

  const groupId = Number(req.params.id)
  const targetId = Number(req.params.memberId)

  try {
    const group = await prisma.group.findUnique({ where: { id: groupId } })
    if (!group) return res.status(404).json({ error: 'Grupo no encontrado' })

    if (group.createdBy !== userId && targetId !== userId) {
      return res.status(403).json({ error: 'Sin permisos' })
    }

    await prisma.groupMember.delete({ where: { groupId_userId: { groupId, userId: targetId } } })
    return res.status(200).json({ message: 'Miembro eliminado' })
  } catch (e) {
    return res.status(500).json({ error: 'Error al eliminar el miembro' })
  }
}

export const deleteGroup = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'No autorizado' })

  const groupId = Number(req.params.id)

  try {
    const group = await prisma.group.findUnique({ where: { id: groupId } })
    if (!group) return res.status(404).json({ error: 'Grupo no encontrado' })
    if (group.createdBy !== userId) return res.status(403).json({ error: 'Solo el creador puede eliminar el grupo' })

    await prisma.group.delete({ where: { id: groupId } })
    return res.status(200).json({ message: 'Grupo eliminado' })
  } catch (e) {
    return res.status(500).json({ error: 'Error al eliminar el grupo' })
  }
}

export const addEvent = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'No autorizado' })

  const groupId = Number(req.params.id)
  const { eventId, name, date, venue, city, image, category, genre } = req.body

  try {
    const [membership, group, sender] = await Promise.all([
      prisma.groupMember.findUnique({ where: { groupId_userId: { groupId, userId } } }),
      prisma.group.findUnique({ where: { id: groupId }, include: { members: { select: { userId: true } } } }),
      prisma.user.findUnique({ where: { id: userId }, select: { name: true, username: true } }),
    ])

    if (!membership) return res.status(403).json({ error: 'No perteneces a este grupo' })

    const otherMemberIds = group?.members.map(m => m.userId).filter(id => id !== userId) ?? []

    await prisma.$transaction([
      prisma.groupEvent.create({ data: { groupId, eventId, userId, name, date, venue, city, image, category, genre } }),
      ...otherMemberIds.map(memberId =>
        prisma.notification.create({
          data: {
            userId: memberId,
            senderId: userId,
            type: 'EVENT_SHARED',
            groupId,
            message: `${sender?.name} (@${sender?.username}) ha compartido "${name}" en el grupo "${group?.name}"`,
          },
        })
      ),
    ])

    return res.status(201).json({ message: 'Evento añadido' })
  } catch (e) {
    return res.status(500).json({ error: 'Error al añadir el evento' })
  }
}

export const removeEvent = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'No autorizado' })

  const groupId = Number(req.params.id)
  const groupEventId = Number(req.params.eventId)

  try {
    const groupEvent = await prisma.groupEvent.findFirst({
      where: { id: groupEventId, groupId },
    })
    if (!groupEvent) return res.status(404).json({ error: 'Evento no encontrado' })

    if (groupEvent.userId !== userId) {
      return res.status(403).json({ error: 'Solo quien envió el evento puede eliminarlo' })
    }

    await prisma.groupEvent.delete({ where: { id: groupEventId } })
    return res.status(200).json({ message: 'Evento eliminado' })
  } catch (e) {
    return res.status(500).json({ error: 'Error al eliminar el evento' })
  }
}

export const voteOnGroupEvent = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  if (!userId) return res.status(401).json({ error: 'No autorizado' })

  const groupId = Number(req.params.id)
  const groupEventId = Number(req.params.eventId)
  const { vote } = req.body

  if (!['GOING', 'NOT_INTERESTED', 'CANT_GO'].includes(vote)) {
    return res.status(400).json({ error: 'Voto no válido' })
  }

  try {
    const membership = await prisma.groupMember.findUnique({
      where: { groupId_userId: { groupId, userId } },
    })
    if (!membership) return res.status(403).json({ error: 'No perteneces a este grupo' })

    const existing = await prisma.groupEventVote.findUnique({
      where: { groupEventId_userId: { groupEventId, userId } },
    })

    if (existing && existing.vote === vote) {
      await prisma.groupEventVote.delete({ where: { id: existing.id } })
      return res.status(200).json({ vote: null })
    }

    await prisma.groupEventVote.upsert({
      where: { groupEventId_userId: { groupEventId, userId } },
      create: { groupEventId, userId, vote },
      update: { vote },
    })

    return res.status(200).json({ vote })
  } catch (e) {
    return res.status(500).json({ error: 'Error al votar' })
  }
}

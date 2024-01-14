export const isTeacher = (userId?: string | null) => {
  if (userId) {
    const splittedIds = process.env.NEXT_PUBLIC_TEACHER_ID.split(',');
    return splittedIds.includes(userId);
  }

  return false;
}
const allUsers = await prisma.user.findMany({
  include: { patient: true, doctorAssessments: true, nurseAssignments: true },
});

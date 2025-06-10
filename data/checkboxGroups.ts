export interface CheckboxGroup {
  label: string
  required: boolean
  options: string[]
}

export interface CheckboxGroups {
  contactPurpose: CheckboxGroup
  servicesDiscussed: CheckboxGroup
  familyInput: CheckboxGroup
  actionSteps: CheckboxGroup
  followUpNeeded: CheckboxGroup
}

export const checkboxGroups: CheckboxGroups = {
  contactPurpose: {
    label: "Purpose of the Contact",
    required: true,
    options: [
      "IFSP Meeting",
      "Service Check-in",
      "Referral Support",
      "Transition Planning",
      "Initial Contact",
      "Follow-up",
      "New Test",
      "Crisis Intervention",
      "Resource Coordination",
    ],
  },
  servicesDiscussed: {
    label: "Services or Concerns Discussed",
    required: true,
    options: [
      "Therapy Access",
      "Scheduling",
      "Family Concerns",
      "Developmental Concerns",
      "Financial Assistance",
      "Equipment Needs",
      "Childcare",
      "Medical Needs",
      "Housing",
      "Transportation",
    ],
  },
  familyInput: {
    label: "Family Input/Concerns",
    required: true,
    options: [
      "Satisfaction with Services",
      "New Concerns",
      "Changes in Routines",
      "Progress Updates",
      "Challenges with Services",
      "Questions about Development",
      "Resource Needs",
      "Family Stressors",
    ],
  },
  actionSteps: {
    label: "Action Steps Taken",
    required: true,
    options: [
      "Made Referrals",
      "Scheduled a Meeting",
      "Followed Up with Provider",
      "Provided Resources",
      "Updated IFSP",
      "Coordinated Services",
      "Addressed Concerns",
      "Provided Information",
    ],
  },
  followUpNeeded: {
    label: "Follow-Up Needed",
    required: true,
    options: [
      "Update IFSP",
      "Check Back with Family",
      "Coordinate Transition",
      "Schedule Evaluation",
      "Contact Provider",
      "Send Resources",
      "Schedule Next Meeting",
      "No Follow-up Needed",
    ],
  },
}

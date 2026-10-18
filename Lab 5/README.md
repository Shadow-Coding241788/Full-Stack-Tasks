# Dabbu CampusFlow

This version organizes the exercises by responsibility. Run commands from this folder:

```powershell
npm start
npm test
```

Node.js 18 or newer is required. No installation or external packages are needed.

- `run.js`: demonstrations for all eight tasks.
- `intake.js`: application sanitization, eligibility and summaries.
- `markPolicy.js`, `performance.js`, `transcriptReader.js`: grading policy, performance analytics and transcript parsing.
- `UniversityPerson.js`, `Learner.js`, `Instructor.js`, `profileMerge.js`: base person, learner, instructor and immutable profile updates.
- `registrationStore.js`: independent registration data.
- `callbackEnrollment.js`: legacy callback workflow.
- `promiseEnrollment.js`: Promise workflow and notification reporting.
- `serverSelection.js`: first-success server selection.
- `enrollment.js`: public exports for registration services.
- `dataGateway.js`: API loading, fake fetch and timeout handling.
- `verification.test.js`: normal, boundary and invalid cases.

The callback and Promise implementations live in separate modules and share a data factory. All files live directly in dabbu, with no subfolders. Existing exported API names are retained so behavior remains compatible.

Eligible applicants are selected when fees are paid and wait when fees are unpaid. GPA uses equally weighted courses on the documented scale A=4, A-=3.67, B+=3.33, B=3, B-=2.67, C+=2.33, C=2, F=0. Empty averages are null. Profile updates create new top-level, address and contact objects. Expected error output demonstrates failure handling.

The original lab explicitly names `main.js`, `Student.js`, `gradeUtils.js` and `transcriptService.js`. This alternate version uses different filenames as requested; use the original project if those exact names are required for submission.


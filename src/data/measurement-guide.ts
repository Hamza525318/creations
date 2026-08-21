export interface MeasurementTip {
  title: string;
  description: string;
}

export interface MeasurementStep {
  step: number;
  title: string;
  description: string;
  details: string[];
}

export const beforeYouStartTips: MeasurementTip[] = [
  {
    title: "Use a Metal Tape Measure",
    description: "Cloth or tailor tapes can stretch over time. A standard steel measuring tape provides the most precise dimensions.",
  },
  {
    title: "Measure Width First, Then Height",
    description: "Always write your measurements as (Width × Height). Keeping this order standard avoids confusion.",
  },
  {
    title: "Measure in More Than One Place",
    description: "Windows and walls are rarely perfectly square. Measure width at the top, middle, and bottom, and height at both sides.",
  },
  {
    title: "Keep Units Consistent",
    description: "Measure either in inches or centimetres throughout all your windows. Please specify the unit when sharing dimensions.",
  },
  {
    title: "Take a Full Window Photograph",
    description: "A wide photo showing the window, surrounding wall space, ceiling height, and floor helps our team recommend the best curtain rod or blind placement.",
  },
];

export const curtainMeasurementSteps: MeasurementStep[] = [
  {
    step: 1,
    title: "Measure the Curtain Rod or Track Width (A)",
    description: "Measure the full length of your existing curtain rod or track (excluding decorative finials).",
    details: [
      "If you don't have a track yet, measure the window frame width and add 6 to 10 inches (15–25 cm) on each side so curtains can stack clear of the glass when open.",
    ],
  },
  {
    step: 2,
    title: "Choose Your Starting Point",
    description: "Decide where your curtains will hang from.",
    details: [
      "Track Mount: Measure from the bottom of the track gliders.",
      "Rod/Pole Mount: Measure from the bottom of the curtain rings (for eyelet/grommet curtains, measure from the very top of the pole).",
      "Ceiling Mount: Measure directly from the ceiling down to your desired end point.",
    ],
  },
  {
    step: 3,
    title: "Measure the Desired Drop / Length (B)",
    description: "Determine where you want your curtains to end.",
    details: [
      "Sill Length: End 0.5 inches (1 cm) above the windowsill.",
      "Below Sill Length: Extend 4 to 6 inches (10–15 cm) below the sill for better light blockage.",
      "Floor Length (Recommended): End approximately 0.5 to 1 inch (1–2 cm) above the floor so fabric hangs freely and stays clean.",
    ],
  },
];

export const blindMeasurementTypes = {
  insideMount: {
    title: "Inside Recess Mount",
    subtitle: "Blinds fit neatly inside the window window frame / recess",
    steps: [
      {
        title: "Measure Width (3 places)",
        description: "Measure the inside width of the window frame at the top, middle, and bottom. Record the narrowest width.",
      },
      {
        title: "Measure Height (3 places)",
        description: "Measure the inside height from the top of the recess to the sill on the left, centre, and right. Record the longest height.",
      },
      {
        title: "Check Recess Depth",
        description: "Ensure you have at least 2 to 3 inches (5–8 cm) of unobstructed depth inside the window frame for the blind mechanism.",
      },
    ],
    note: "Do not make deductions yourself. Share raw internal dimensions and CREATION'S will calculate precise operating tolerances.",
  },
  outsideMount: {
    title: "Outside Frame / Wall Mount",
    subtitle: "Blinds mount on the wall or architrave above the window",
    steps: [
      {
        title: "Measure Total Desired Width",
        description: "Measure the window opening width and add at least 3 to 4 inches (7–10 cm) on each side to prevent side light gaps.",
      },
      {
        title: "Measure Total Desired Height",
        description: "Measure from where you want the top bracket mounted (usually 3–4 inches above the frame) down to the bottom sill or desired overlap.",
      },
    ],
    note: "Outside mounts are ideal when window recesses are shallow or contain handles, cranks, or indoor burglar grilles.",
  },
};

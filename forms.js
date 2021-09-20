// This doc lists all forms and the shape of the data they should expect to use

const register = {
  username: "string",
  password: "string",
  email: "string",
  bio: "string",
  // Additional Auth Code required for registering as instructor
  accountType: ["Client", "Instructor"],
  // Certifications only available for instructors
  certifications: ["Yoga", "Tae Bo", "Jazzercise", "Zumba", "Pumping Iron"],
};

const login = {
  username: "string",
  password: "string",
};

// Front end must build search functionality
const makeClass = {
  name: "string",
  type: ["Yoga", "Tae Bo", "Jazzercise", "Zumba", "Pumping Iron"],
  startTime: "string",
  duration: "number", // listed in minutes
  intensity: "1-5",
  location: ["Dropdown", "of", "options", "?"],
  registered: "number",
  size: "number",
};

// Optional User profile page
const userInfo = {
  username: "string",
  bio: "string",
  accountType: "string",
  remainingClasses: "number", // This will show the user how many classes are remaining on their punchcard
};

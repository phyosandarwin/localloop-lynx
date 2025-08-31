// Challenge model
export type Challenge = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  createdBy: string;
};

// User model
export type User = {
  id: string;
  name: string;
  interests: string[];            // e.g., ["environment", "photography", "study"]
  createdChallenges: Challenge[]; // Challenges user has created
};

// Hardcoded current user for MVP with sample challenges
export const currentUser: User = {
  id: "user1",
  name: "Phyo",
  interests: ["environment", "photography", "study", "movies", "dance"],
  createdChallenges: [
    {
      id: "c1",
      title: "Eco Cleanup Challenge",
      description: "Pick up trash in your neighborhood and share your progress.",
      tags: ["environment", "community"],
      createdBy: "Phyo",
    },
    {
      id: "c2",
      title: "Photography 7-Day Challenge",
      description: "Take a photo every day inspired by your surroundings.",
      tags: ["photography", "creativity"],
      createdBy: "Phyo",
    },
    {
      id: "c3",
      title: "Study Marathon",
      description: "Focus on one subject for 2 hours and share your study setup.",
      tags: ["study", "focus"],
      createdBy: "Phyo",
    },
    {
      id: "c4",
      title: "Movie Scene Reenactment",
      description: "Recreate a famous movie scene with friends or solo.",
      tags: ["movies", "fun"],
      createdBy: "Phyo",
    },
    {
      id: "c5",
      title: "Dance Challenge",
      description: "Learn a trending dance and record your version.",
      tags: ["dance", "trending"],
      createdBy: "Phyo",
    },
  ],
};

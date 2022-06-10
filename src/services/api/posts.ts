import { v4 as uuidV4 } from "uuid";

export interface Author {
  avatarUrl: string;
  name: string;
  role: string;
}

export interface Content {
  type: string;
  content: string;
}

export const comments = [
  {
    id: uuidV4(),
    author: {
      avatarUrl: "https://github.com/ericDK89.png",
      name: "Eric Macedo",
      role: "Dev Front-End",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      {
        type: "link",
        content: "https://doctorcare-dp1nlyk3o-ericdk89.vercel.app/",
      },
    ],
    publishedAt: new Date(),
  },
];

# Table Of Contents

1. [Live Demo](#live-demo)
2. [Project and Description](#project-and-description)
3. [Features](#features)
4. [Future Features](#future)
5. [Tech Used](#tech-used)
6. [Screen Shots](#screen-shots)
7. [Getting Started](#getting-started)
8. [Available Scripts](#available-scripts)
9. [Design Decission](#design-decission)
10. [License Info](#license-info)
11. [Thanks](#thanks)
12. [Contact](#-contact)

## Live Demo

[ToDo Online](https://todo-list-ctd.onrender.com)

## Project and Description

A "ToDo" application that allows you to track the completion of your todos' you have set through your day,
along with sort and search abilities, a profile overview that informs you of your success percentage with
a bar graph, and a about page that shares the specific technologies (and my personal blog of experiences
with building this app)

## Features

### Things this application can do

- Uses Authentication to access CTD backend database with logging in message
- Create a new todo (with optimistic updating and feed back)
- Edit existing todo (or cancel said edit. has optamistic updating and feed back)
- Mark tasks as complete or incomplete (with optamistic updating and feed back)
- View your completion percentage on profile page (with visual summary)
- Log out securely with success message
- Browse About page without Authentication

## Future Features

### Things this application cant do yet...

- Set a Background
- Have a light/dark theme
- Optional Font styles
- Ability to add sub-tasks
- Delete a todo
- Better About page full with a blog of this journey I took

## Tech Used

### The technology I used/learned for this project

- HTML/CSS - _Markup and styling_
- React - _FrontEnd Framework_
- React Router - _SPA Navigation/Routing_
- React Bootstrap Components - _UI Components_
- Vite - _Fast Dev Server_
- Render.com - _Hosting and Deployment_

## Screen Shots

1. <details>
     <summary>Zoomed out version of login screen on desktop</summary>
     <img src="./screenShots/Screenshot%202026-02-09%20113300.png" alt="zoomed out version of login screen" width="400px" />
   </details>

1. <details>
     <summary>View of todo app on desktop</summary>
     <img src="./screenShots/Screenshot%202026-02-09%20113331.png" alt="view of todo app" width="400px"/>
   </details>

1. <details>
      <summary>Phone view of login screen</summary>
   <img src="./screenShots/Screenshot%202026-02-09%20124848.png" alt="phone view of todo app" width="200px"/>
   </details>
1. <details>
      <summary>Phone view of todo list</summary>
   <img src="./screenShots/Screenshot 2026-02-09 165102.png" alt="phone view of todo app" width="200px"/>
   </details>

1. <details>
     <summary>Phone view to show logout button</summary>
     <img src="./screenShots/Screenshot%202026-02-09%20113537.png" alt="phone view to show logout button" width="200px"/>
   </details>

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) - v18.x or later(npm included with Node.js)
- (Optional) [Git](https://git-scm.com/) for cloning the repo
- Terminal or CLI (Command Line Interface)
- **(Optional)** Code editor like VS Code or WindSurf

### Installation

1. **Clone the Repo:**
   ```bash
   git clone https://github.com//WizardOfWhimsical/todo-list-CTD.git
   cd todo-list
   ```
   Install Dependencies:
   ```
   npm install
   ```
2. **Running the Development Server**

   Start the local dev server with:

   ```
   npm run dev
   ```

   Open your browser and go to the Local URL displayed in the terminal (typically http://localhost:3001).

## Available Scripts

A script is a named command you can type into the CLI that executes a specific function. This is done by typing...

```bash
npm run <name>
```

Example:

```
npm run build
```

| name    | description                                       |
| ------- | ------------------------------------------------- |
| dev     | Starts local Vite dev server                      |
| build   | Compiles code into production ready static file   |
| preview | Starts a local server with the static files       |
| lint    | Scans code base for bad practices or style issues |

Vite is a modern frontend build tool. It makes framework development fast and easy
while doing all the heavy lifting behind the scenes for us. Vite also takes care
of bundling the application while optimizing it to have quick loading.

## Design Decision

My approach was shaped by a simple principle. A straightforward app shouldn’t
be complicated with color schemes, background images, or fancy button gradients.
I haven’t added any real color yet, though I do have a `:root` set up in my
global stylesheet for when the time comes. For now, you’ll see just a few
boxes to help distinguish key areas like the login and to-do sorting.

I challenged myself to use as little CSS as possible, yes, to style everything
from scratch. Even so, I decided to use Bootstrap components for basic
accessibility; they provide solid focus management out of the box, even if that
means accepting some pre-styling for certain elements.

For statistics, I imported a bar chart component ([click to see refrence](https://www.geeksforgeeks.org/reactjs/how-to-implement-barchart-in-reactjs)). I
used it because I thought it would be cool to show the stats this way. Also if felt more direct. I did run into some trouble with nested object labeling (the
initial example I found was outdated), but the README documentation helped me
resolve it.

When it comes to responsive web design, I believe flexbox is "The Boss". It’s
the quickest and most flexible way to start with mobile-first design. My
favorite piece of the layout is actually the placement of the logout button. The
navbar gave me a little bit of trouble.I had to fight with spacing and
phone-sized layouts, but I got it working just right.

Well that is my thought on the design process and where I landed as I did things.
I hope you enjoy the end product! <3

## Licence

MIT License

Copyright (c) 2026 Lewis Labs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

## Thanks

Big thanks to my mentor EJ Mason and all the hours he challenged me to do better. To anyone who ever showed up in group class that asked a question I didn't think of. And Thank You to all of my peers who where here through this grueling process

## 📬 Contact

- 📨 **Yahoo:** [My Yahoo Email](mailto:st.rayis1085@yahoo.com)
- 📧 **Gmail:** [My Gmail](mailto:st.rayis1085@gmail.com)
- 🐙 **GitHub:** [The Wizards Domain](https://github.com/WizardOfWhimsical)
- 🔗 **LinkedIn:** [Stephen Raymond Lewis](https://linkedin.com/in/stephenrlewis)

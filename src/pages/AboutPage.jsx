export default function AboutPage() {
  return (
    <main>
      <h1>About</h1>
      <section>
        <h2>Features</h2>
        <p>
          This to-do app is designed for efficiency, accessibility, and a little
          bit of style. Whether you’re adding, editing, or checking off your
          tasks, everything flows in a way that just makes sense. Labels are
          properly linked to their inputs, keyboard navigation is smooth and
          intuitive, and you can easily escape out of edit mode with a single
          press of the Escape key (because sometimes, you just want out). Add,
          edit, or complete to-dos with ease — all organized and presented in a
          clean, modern interface.
        </p>
        <ul>
          <li>Add new tasks to your list quickly</li>
          <li>Edit existing to-dos</li>
          <li>Mark to-dos complete to remove</li>
          <li>
            Keyboard Accessible: useTab and Escape (respectively) for smooth
            workflow
          </li>
          <li>
            Proper labels for every input, making this app screen reader
            friendly
          </li>
        </ul>
      </section>

      <section>
        <h2>Technologies Used</h2>
        <p>
          This project is built with a combination of modern web tools, plus a
          few unconventional power-ups (shoutout to Lindsey Stirling’s Artemis
          album productivity soundtrack). Coded on a Lenovo laptop, proof that
          you don’t need a spaceship to build something great
        </p>
        <ul>
          <li>
            <strong>React</strong>:
            <em>
              The engine fo the app, creates reusable components for a seamless
              experience.
            </em>
          </li>
          <li>
            <strong>React Bootstrap</strong>:
            <em>
              Provides a set of pre-styled components for a more polished look
              and responsive design.
            </em>
          </li>
          <li>
            <strong>React Router</strong>:
            <em>
              Enabling navigation between pages while optimizing rendering.
            </em>
          </li>
          <li>
            <strong>Vite</strong>:
            <em>
              A super handy build tool that serves and bundles the app for
              development quickly.
            </em>
          </li>
          <li>
            <strong>HTML/JSX</strong>:
            <em>
              HTML for structure and JSX for combing JS inside components.
            </em>
          </li>
          <li>
            <strong>ESLint/Prettier</strong>:
            <em>Tools to keep the code clean, readable and error free.</em>
          </li>
          <li>
            <strong>Visual Studio Code</strong>:<em></em>
          </li>
          <li>
            <strong>Git/GitHub</strong>:
            <em>
              Version Control for peer reviews and get up-to-date information on
              best practices
            </em>
          </li>
          <li>
            <strong>Lenovo/Microsoft</strong>:
            <em>
              My trusty dusty laptop that suffers all the endless loops and
              broken server code
            </em>
          </li>
          <li>
            <strong>Lindsey Stirling</strong>:
            <em>
              And nothing but the best for concentration and focus (Artemis
              album)
            </em>
          </li>
        </ul>
      </section>
    </main>
  );
}

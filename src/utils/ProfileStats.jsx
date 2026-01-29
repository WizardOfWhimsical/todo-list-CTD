export default function ProfileStats({ name, total, active, completed }) {
  const [firstName] = name.split(' ');
  const percentageComplete =
    total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <>
      <h2>Congragulations, {firstName}! (^_^)</h2>
      <p>
        You have completed <strong>{percentageComplete}%</strong> of the things
        you set out to do.
        <br />
        You only have {active} left to do out of a total of {total}.<br /> Stay
        strong and remember, "You got this!"
      </p>
    </>
  );
}

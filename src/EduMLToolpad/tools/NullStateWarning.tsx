//In eslint, allow explicit any in this file

type NullStateWarningProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  states: { [key: string]: any }[];
  children: React.ReactNode;
};
const NullStateWarning = ({ states, children }: NullStateWarningProps) => {
  //If one of the states is null, display a warning that tells us which state is null

  //Check if any of the states is null
  const nullStates = states.filter(
    (state) =>
      state === null ||
      Object.values(state).includes(null) ||
      Object.values(state).includes(undefined)
  );
  if (nullStates.length > 0) {
    return (
      <div>
        <p>
          Warning: The following states are null:{" "}
          {nullStates.map((state, index) => (
            <span key={index}>{Object.keys(state)[0]} </span>
          ))}
        </p>
      </div>
    );
  }
  return <>{children}</>;
};

export default NullStateWarning;

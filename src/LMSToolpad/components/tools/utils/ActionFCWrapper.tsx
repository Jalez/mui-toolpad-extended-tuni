import { Box } from "@mui/material";

// Wrapper component for actionHandlers with generic props type
const ActionFCWrapper = <T extends Record<string, unknown>>({
  ActionHandler,
  props,
}: {
  ActionHandler: React.FC<T>;
  props: T;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    // e.stopPropagation();
    e.preventDefault();
    return <ActionHandler {...props} />;
  };

  return (
    <Box
      onClick={handleClick}
      data-testid="action-fc-wrapper"
      sx={{
        width: "100%",
        // display: 'flex',
        //make it relative to the parent
        // position: 'relative',
      }}
    >
      <ActionHandler {...props} />
    </Box>
  );
};

export default ActionFCWrapper;

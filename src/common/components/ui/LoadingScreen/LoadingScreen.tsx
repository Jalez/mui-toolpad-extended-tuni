import { Box, CircularProgress, keyframes, Typography } from "@mui/material";

const pulse = keyframes`
  0% { transform: scale(0.95); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(0.95); opacity: 0.5; }
`;

const dots = keyframes`
  0% { content: ''; }
  25% { content: '.'; }
  50% { content: '..'; }
  75% { content: '...'; }
  100% { content: ''; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const LoadingScreen = () => {
  return (
    <Box
    data-testid="loading-screen"
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 3,
        backdropFilter: "blur(8px)",
        animation: `${fadeIn} 0.5s ease-in`,
      }}
    >
      <Box
        sx={{
          position: "relative",
          animation: `${pulse} 2s ease-in-out infinite`,
        }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            opacity: 0.8,
          }}
        />
      </Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 300,
          letterSpacing: 1,
          display: "flex",
          alignItems: "center",

          gap: "2px"
        }}
      >
        Loading
        <Box
          sx={{
            display: "inline-block",
            width: "24px",
            position: "relative",
            "&::after": {
              content: "''",
              left: 0,
              animation: `${dots} 1.5s steps(4) infinite`,
            }
          }}
        />
      </Typography>
    </Box>
  );
};

export default LoadingScreen;

export function checkEnvVars() {
  if (!process.env.VITE_WALLET_CONNECT_PROJECT_ID) {
    throw new Error(
      "You need to provide VITE_WALLET_CONNECT_PROJECT_ID env variable"
    );
  }
}

interface EnvConfig {
  BASE_URL: string;
}

const loadEnvs = (): EnvConfig => {
  // Check missing envs
  const requiredEnvs: string[] = ["VITE_BASE_URL"];

  requiredEnvs.forEach((key) => {
    if (!import.meta.env[key]) {
      throw new Error(`Missing the required enviroment variable : ${key}`);
    }
  });

  // Return validated envs
  return {
    BASE_URL: import.meta.env.VITE_BASE_URL as string,
  };
};

const envVars = loadEnvs();
export default envVars;

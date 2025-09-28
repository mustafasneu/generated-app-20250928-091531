export type CommandOption = {
  name: string;
  description: string;
  type: 'string' | 'boolean' | 'select';
  isArg?: boolean; // Positional argument vs. flag
  options?: string[];
  placeholder?: string;
  defaultValue?: string | boolean;
};
export type WranglerCommand = {
  name: string;
  description: string;
  options: CommandOption[];
};
export const wranglerCommands: WranglerCommand[] = [
  {
    name: 'dev',
    description: 'Start a local server for developing your Worker.',
    options: [
      { name: 'script', description: 'The entry point of your Worker.', type: 'string', isArg: true, placeholder: 'worker.js' },
      { name: 'port', description: 'Port to listen on.', type: 'string', placeholder: '8787' },
      { name: 'ip', description: 'IP address to listen on.', type: 'string', placeholder: '*' },
      { name: 'local-protocol', description: 'Protocol to use for the local server.', type: 'select', options: ['http', 'https'] },
      { name: 'inspector-port', description: 'Port for devtools inspector.', type: 'string', placeholder: '9229' },
      { name: 'log-level', description: 'Specify logging level.', type: 'select', options: ['debug', 'info', 'log', 'warn', 'error', 'none'] },
      { name: 'persist', description: 'Enable persistence for local development.', type: 'boolean' },
    ],
  },
  {
    name: 'publish',
    description: 'Publish your Worker to Cloudflare.',
    options: [
      { name: 'script', description: 'The entry point of your Worker.', type: 'string', isArg: true, placeholder: 'worker.js' },
      { name: 'name', description: 'The name of your Worker.', type: 'string', placeholder: 'my-worker' },
      { name: 'dry-run', description: 'Don\'t actually publish.', type: 'boolean' },
      { name: 'outdir', description: 'Output directory for the bundled Worker.', type: 'string', placeholder: './dist' },
      { name: 'latest', description: 'Use the latest version of the bindings.', type: 'boolean' },
    ],
  },
  {
    name: 'd1 execute',
    description: 'Execute SQL commands against a D1 database.',
    options: [
      { name: 'database', description: 'The name of the D1 database.', type: 'string', isArg: true, placeholder: 'my-database' },
      { name: 'command', description: 'A single SQL command to execute.', type: 'string', placeholder: '"SELECT * FROM users;"' },
      { name: 'file', description: 'A .sql file to execute.', type: 'string', placeholder: './migrations/0001.sql' },
      { name: 'local', description: 'Execute against a local database.', type: 'boolean' },
      { name: 'json', description: 'Return output as JSON.', type: 'boolean' },
    ],
  },
  {
    name: 'pages deploy',
    description: 'Deploy a directory of static assets as a Pages project.',
    options: [
      { name: 'directory', description: 'The directory of static assets to deploy.', type: 'string', isArg: true, placeholder: './public' },
      { name: 'project-name', description: 'The name of the project to deploy to.', type: 'string' },
      { name: 'branch', description: 'The name of the branch to deploy to.', type: 'string', placeholder: 'main' },
      { name: 'commit-hash', description: 'The hash of the commit to deploy.', type: 'string' },
      { name: 'commit-message', description: 'The message of the commit to deploy.', type: 'string' },
      { name: 'skip-caching', description: 'Skip caching of the deployment.', type: 'boolean' },
    ],
  },
  {
    name: 'r2 object get',
    description: 'Get an object from an R2 bucket.',
    options: [
      { name: 'bucket-key', description: 'The bucket and key of the object (e.g. my-bucket/my-key).', type: 'string', isArg: true, placeholder: 'my-bucket/cat.png' },
      { name: 'file', description: 'The path to write the object to.', type: 'string', placeholder: './cat.png' },
      { name: 'pipe', description: 'Print the object to stdout.', type: 'boolean' },
    ],
  },
  {
    name: 'kv:key put',
    description: 'Write a key-value pair.',
    options: [
      { name: 'key', description: 'The key to write to.', type: 'string', isArg: true, placeholder: 'my-key' },
      { name: 'value', description: 'The value to write.', type: 'string', isArg: true, placeholder: '"my-value"' },
      { name: 'path', description: 'Read value from a file path.', type: 'boolean' },
      { name: 'ttl', description: 'Time-to-live (in seconds) for the key.', type: 'string' },
    ],
  },
];
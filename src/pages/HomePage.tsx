import React, { useState, useMemo } from 'react';
import { create } from 'zustand';
import { Search, TerminalSquare } from 'lucide-react';
import { wranglerCommands, WranglerCommand, CommandOption } from '@/lib/wrangler-commands';
import { CommandOutput } from '@/components/CommandOutput';
import { Toaster } from '@/components/ui/sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';
type CommandValues = Record<string, string | boolean>;
interface AppState {
  commands: WranglerCommand[];
  selectedCommand: WranglerCommand | null;
  commandValues: CommandValues;
  selectCommand: (command: WranglerCommand) => void;
  updateCommandValue: (name: string, value: string | boolean) => void;
}
const useCommandStore = create<AppState>((set) => ({
  commands: wranglerCommands,
  selectedCommand: wranglerCommands[0] || null,
  commandValues: wranglerCommands[0]?.options.reduce((acc, option) => {
    if (option.defaultValue !== undefined) {
      acc[option.name] = option.defaultValue;
    }
    return acc;
  }, {} as CommandValues) || {},
  selectCommand: (command) => set({
    selectedCommand: command,
    commandValues: command.options.reduce((acc, option) => {
      if (option.defaultValue !== undefined) {
        acc[option.name] = option.defaultValue;
      }
      return acc;
    }, {} as CommandValues),
  }),
  updateCommandValue: (name, value) => set((state) => ({
    commandValues: { ...state.commandValues, [name]: value },
  })),
}));
const generateCommandString = (command: WranglerCommand | null, values: CommandValues): string => {
  if (!command) return '';
  let commandStr = command.name;
  const args = command.options.filter(opt => opt.isArg);
  const flags = command.options.filter(opt => !opt.isArg);
  args.forEach(arg => {
    const value = values[arg.name];
    if (value) {
      commandStr += ` ${String(value)}`;
    }
  });
  flags.forEach(flag => {
    const value = values[flag.name];
    if (value) {
      if (flag.type === 'boolean') {
        commandStr += ` --${flag.name}`;
      } else {
        const valStr = String(value);
        commandStr += ` --${flag.name} ${valStr.includes(' ') ? `"${valStr}"` : valStr}`;
      }
    }
  });
  return commandStr;
};
const CommandList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { commands, selectedCommand, selectCommand } = useCommandStore();
  const filteredCommands = useMemo(() =>
    commands.filter(cmd =>
      cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchTerm.toLowerCase())
    ), [commands, searchTerm]);
  return (
    <div className="flex flex-col h-full">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search commands..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ScrollArea className="flex-grow pr-4 -mr-4">
        <div className="space-y-1">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((command) => (
              <button
                key={command.name}
                onClick={() => selectCommand(command)}
                className={cn(
                  'w-full text-left p-2 rounded-md transition-colors duration-200',
                  selectedCommand?.name === command.name
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <div className="font-medium">{command.name}</div>
                <div className={cn(
                  'text-xs',
                  selectedCommand?.name === command.name ? 'text-blue-100' : 'text-muted-foreground'
                )}>
                  {command.description}
                </div>
              </button>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">No commands found.</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
const CommandBuilderForm = () => {
  const { selectedCommand, commandValues, updateCommandValue } = useCommandStore();
  if (!selectedCommand) {
    return (
      <Card className="flex flex-col items-center justify-center h-full text-center">
        <CardHeader>
          <CardTitle>No Command Selected</CardTitle>
          <CardDescription>Please choose a command from the list.</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  const renderOption = (option: CommandOption) => {
    const value = commandValues[option.name];
    switch (option.type) {
      case 'string':
        return (
          <div key={option.name} className="space-y-2">
            <Label htmlFor={option.name}>{option.name}</Label>
            <Input
              id={option.name}
              placeholder={option.placeholder}
              value={(value as string) || ''}
              onChange={(e) => updateCommandValue(option.name, e.target.value)}
            />
            <p className="text-sm text-muted-foreground">{option.description}</p>
          </div>
        );
      case 'boolean':
        return (
          <div key={option.name} className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label htmlFor={option.name}>{option.name}</Label>
              <p className="text-sm text-muted-foreground">{option.description}</p>
            </div>
            <Switch
              id={option.name}
              checked={!!value}
              onCheckedChange={(checked) => updateCommandValue(option.name, checked)}
            />
          </div>
        );
      case 'select':
        return (
          <div key={option.name} className="space-y-2">
            <Label htmlFor={option.name}>{option.name}</Label>
            <Select
              value={(value as string) || ''}
              onValueChange={(val) => updateCommandValue(option.name, val)}
            >
              <SelectTrigger id={option.name}>
                <SelectValue placeholder={`Select ${option.name}`} />
              </SelectTrigger>
              <SelectContent>
                {option.options?.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">{option.description}</p>
          </div>
        );
      default:
        return null;
    }
  };
  const args = selectedCommand.options.filter(opt => opt.isArg);
  const flags = selectedCommand.options.filter(opt => !opt.isArg);
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{selectedCommand.name}</CardTitle>
        <CardDescription>{selectedCommand.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full pr-6 -mr-6">
          <div className="space-y-8">
            {args.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Arguments</h3>
                {args.map(renderOption)}
              </div>
            )}
            {flags.length > 0 && (
              <div className="space-y-4">
                {args.length > 0 && <Separator />}
                <h3 className="text-lg font-semibold">Flags</h3>
                {flags.map(renderOption)}
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
export function HomePage() {
  const { selectedCommand, commandValues } = useCommandStore();
  const commandString = useMemo(() => generateCommandString(selectedCommand, commandValues), [selectedCommand, commandValues]);
  return (
    <>
      <main className="min-h-screen bg-background font-sans antialiased">
        <ThemeToggle className="absolute top-6 right-6" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <header className="text-center mb-12 md:mb-16">
            <div className="flex justify-center items-center gap-4 mb-4">
              <TerminalSquare className="h-10 w-10 text-blue-500" />
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                Wrangler Forge
              </h1>
            </div>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
              An interactive cheatsheet and command builder for the Cloudflare Wrangler CLI.
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <aside className="md:col-span-1 md:h-[calc(100vh-250px)]">
              <CommandList />
            </aside>
            <section className="md:col-span-2 space-y-8">
              <CommandBuilderForm />
              <div>
                <h3 className="text-lg font-semibold mb-2">Output</h3>
                <CommandOutput command={commandString} />
              </div>
            </section>
          </div>
        </div>
        <footer className="text-center py-8 text-sm text-muted-foreground">
          Built with ❤️ at Cloudflare
        </footer>
      </main>
      <Toaster richColors closeButton />
    </>
  );
}
import React from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
interface CommandOutputProps {
  command: string;
}
export const CommandOutput: React.FC<CommandOutputProps> = ({ command }) => {
  const [hasCopied, setHasCopied] = React.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(command).then(() => {
      toast.success('Command copied to clipboard!');
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }).catch(err => {
      toast.error('Failed to copy command.');
      console.error('Failed to copy: ', err);
    });
  };
  return (
    <div className="relative rounded-lg bg-slate-900 dark:bg-slate-800/50 p-4 font-mono text-sm text-slate-50 shadow-lg">
      <pre className="whitespace-pre-wrap break-all">
        <code>
          <span className="text-blue-400">$</span>{command ? ` wrangler ${command}` : ''}
        </code>
      </pre>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 text-slate-400 hover:bg-slate-700 hover:text-white"
              onClick={handleCopy}
            >
              {hasCopied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy to clipboard</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
import React, { useEffect } from 'react';
import styles from './CommandPrompt.module.scss';
import { ArrowIcon } from '@components/common/icons';
import variables from '@styles/variables.module.scss';
import { useWindowSize } from '@src/hooks';

const commands: Array<string> = [
  'compare json',
  'launch network tools',
  'monitor server stats',
  'current project',
  'launch missiles',
];

interface CommandPromptProps {
  onCommandEnter: (command: string) => void;
}

export const CommandPrompt: React.FC<CommandPromptProps> = ({ onCommandEnter }) => {
  const [width] = useWindowSize();
  const [command, setCommand] = React.useState<string>();
  const [commandTypedOut, setCommandTypedOut] = React.useState<string>();

  const [userEnteredCommand, setUserEnteredCommand] = React.useState<string>();

  const arrowHeight: string = width > 900 ? '16px' : width > 599 ? '12px' : '10px';

  useEffect(() => {
    const interval = setInterval(() => {
      setCommand(commands[Math.floor(Math.random() * commands.length)]);
      setCommandTypedOut('');
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [setCommand]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (command && commandTypedOut !== undefined) {
      interval = setInterval(() => {
        if (commandTypedOut.length < command.length) {
          setCommandTypedOut(commandTypedOut + command.charAt(commandTypedOut.length));
        } else {
          clearInterval(interval);
        }
      }, 70);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [command, commandTypedOut, setCommandTypedOut]);

  const clearCommand = () => {
    setCommandTypedOut('');
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEnteredCommand(event.target.value);
  };

  return (
    <div className={styles.commandPromptContainer}>
      <ArrowIcon size={arrowHeight} color={variables.primaryTextColorDarkBackground} />

      <input
        onClick={clearCommand}
        className={styles.commandPromptInput}
        placeholder={commandTypedOut !== undefined ? commandTypedOut : 'type a command and press ⏎'}
        onChange={onChange}
        onKeyPress={event => {
          if (event.key === 'Enter' && userEnteredCommand && userEnteredCommand?.trim() !== '') {
            onCommandEnter(userEnteredCommand);
          }
        }}
      />
    </div>
  );
};

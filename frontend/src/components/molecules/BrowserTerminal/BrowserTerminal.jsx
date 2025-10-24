    import React, { useEffect } from 'react';
    import { useXTerm } from 'react-xtermjs';
    import { FitAddon } from '@xterm/addon-fit';

    const BrowserTerminal = () => {
      const { instance, ref } = useXTerm();
      const fitAddon = new FitAddon();

      useEffect(() => {
        if (instance) {
          instance.loadAddon(fitAddon);
          fitAddon.fit(); // Adjusts terminal size to fit its container
          instance.writeln('Welcome to the React Xterm Terminal!');
        }
      }, [instance, fitAddon]);

      return <div ref={ref} style={{ width: '100%', height: '400px' }} />;
    };

    export default BrowserTerminal;
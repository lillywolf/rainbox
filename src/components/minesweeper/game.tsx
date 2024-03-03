'use client';

import { RefObject, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import classnames from 'classnames';

import { DIFFICULTY_CONFIG, DIFFICULTY_CONFIGS, DifficultyConfig, THEME_CONFIG, THEME_CONFIGS, ThemeConfig } from '@/constants/minesweeper';
import { buildSquareGrid, placeMines, setMineCounts } from '@/utils/minesweeper';
import { CONFIGURATION_OPTIONS, MinesweeperConfig, Symbol, initializeConfiguration } from '@/symbols/minesweeper';
import { type Tile, SquareGrid } from 'src/classes/SquareGrid';

import styles from './styles.module.css';
import Image from 'next/image';
import Timer from '../timer';

type GridProps = {
  grid: SquareGrid;
  configuration: MinesweeperConfig;
  difficulty: DifficultyConfig;
  theme: ThemeConfig;
  timerRef: RefObject<{ reset: () => void, stop: () => void }>
  onGameOver: () => void
};

type MinesweeperButtonProps = {
  tile: Tile;
  onCellClick: (tile: Tile) => void;
  configuration: MinesweeperConfig;
  isGameOver: boolean;
};

function getSymbol(s: Symbol, tile: Tile) {
  if (typeof s.text === 'string') return s.text;
  if (tile.metadata.symbol) return tile.metadata.symbol;

  tile.metadata.symbol = s.text();

  return tile.metadata.symbol;
}

function buttonText({ tile, configuration, isGameOver }: { tile: Tile, configuration: MinesweeperConfig, isGameOver: boolean }) {
  if (tile.metadata.mine && isGameOver) return getSymbol(configuration.symbols.mine, tile);
  if (tile.metadata.clicked) {
    if (tile.metadata.mine) return getSymbol(configuration.symbols.mine, tile);
    if (tile.metadata.count > 0) return getSymbol(configuration.symbols[tile.metadata.count as 1 | 2 | 3 | 4], tile);
    return getSymbol(configuration.symbols[0], tile);
  }
  return getSymbol({text: ' '}, tile);
}

function MinesweeperButton({
  tile,
  onCellClick,
  configuration,
  isGameOver
}: MinesweeperButtonProps) {
  const cx = classnames([styles.button, styles[tile.metadata.count.toString()], {
    [styles.unclicked]: Boolean(!tile.metadata.clicked),
    [styles.clicked]: Boolean(tile.metadata.clicked),
    [styles.empty]: tile.metadata.count === 0,
    [styles.mine]: Boolean(tile.metadata.mine),
  }]);

  return (
    <button
      className={cx}
      onClick={() => onCellClick(tile)}
    >
      {buttonText({ tile, configuration, isGameOver })}
    </button>
  );
}

const Grid = forwardRef<{ isGameOver: () => boolean }, GridProps>(function GridComponent({ grid, difficulty, configuration, theme, onGameOver }, _ref) {
  const [cellsClicked, setCellsClicked] = useState([...Array(grid.dimensionQ * grid.dimensionR)].fill(false));
  const [isGameOver, setIsGameOver] = useState(false);

  useImperativeHandle(_ref, () => {
    return {
      isGameOver: () => isGameOver
    };
  }, []);

  useEffect(() => {
    setIsGameOver(false);
    setCellsClicked([...Array(grid.dimensionQ * grid.dimensionR)].fill(false));
  }, [grid, configuration]);

  const onCellClick = (tile: Tile) => {
    if (isGameOver) return;

    if (tile.metadata.mine) {
      setIsGameOver(true);
      onGameOver();

      grid.oneDimensionalArray().forEach((tile: Tile) => {
        if (tile.metadata.mine) tile.metadata.clicked = true;
      });

      return;
    }

    checkTile(tile);
  }

  const checkTile = (tile: Tile) => {    
    if (tile.metadata.clicked) return;

    const oneDimensionalIndex = tile.q * grid.dimensionR + tile.r;

    tile.metadata.clicked = true;

    setCellsClicked(c => c.with(oneDimensionalIndex, true));

    if (tile.metadata.mine || tile.metadata.count > 0) return;

    const neighbors = grid.neighbors(tile);

    neighbors.forEach((neighbor) => checkTile(neighbor));
  }

  const cx = classnames([ styles.game, styles[configuration.id], styles[theme]]);

  return (
    <div className={cx} style={{width: grid.dimensionQ * 26, height: grid.dimensionR * 26}}>
      {grid.oneDimensionalArray().map((tile, index) => (
        <MinesweeperButton
          key={index}
          tile={tile}
          onCellClick={onCellClick}
          configuration={configuration}
          isGameOver={isGameOver}
        />
      ))}
    </div>
  );
});

const initializeGrid = ({ difficulty }: { difficulty: DIFFICULTY_CONFIG }) => {
  const grid = buildSquareGrid({ dimension: DIFFICULTY_CONFIGS[difficulty].dimension });

  placeMines({ grid, difficulty });
  setMineCounts({ grid });

  return grid;
};

export default function Game({
  difficultyDefault = DIFFICULTY_CONFIG.intermediate,
  themeDefault = THEME_CONFIG.simple
}: {
  difficultyDefault: DifficultyConfig,
  themeDefault: ThemeConfig
}) {
  const [configuration, setConfiguration] = useState<MinesweeperConfig>(CONFIGURATION_OPTIONS['standard']);
  const [difficulty, setDifficulty] = useState<DifficultyConfig>(difficultyDefault);
  const [theme, setTheme] = useState<ThemeConfig>(themeDefault);
  const [playCount, setPlayCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const timerRef = useRef<{ reset: () => void, stop: () => void }>(null);
  const gridRef = useRef<SquareGrid | null>(null);
  const gridComponentRef = useRef<{ isGameOver: () => boolean }>(null);

  const onGameOver = () => {
    timerRef.current?.stop();
    console.log(">>> game is over");
    setIsGameOver(true);
  };

  useEffect(() => {
    setIsGameOver(false);
    console.log(">>> game is started");
    gridRef.current = initializeGrid({ difficulty });
    timerRef.current?.reset();
    setPlayCount((p) => p + 1);
  }, [difficulty, configuration, theme]);

  const selectConfiguration = (index: string) => {
    const selectedConfig = {...CONFIGURATION_OPTIONS[index]};
    initializeConfiguration(selectedConfig);
    setConfiguration(selectedConfig);
  };

  const selectDifficulty = (value: DifficultyConfig) => {
    setDifficulty(value);
  };

  const selectTheme = (value: ThemeConfig) => {
    setTheme(value);
  };

  const cx = classnames([ styles.configurationAndGame, {
    [styles.easy]: (difficulty as number) === 1,
    [styles.intermediate]: (difficulty as number) === 2,
    [styles.advanced]: (difficulty as number) === 3,
  }]);

  return (
    <div className={cx}>
      <div className={styles.controls}>
        <ErrorBoundary fallback={<p>an error has occurred!</p>}>
          <div className={classnames([styles.configuration, styles.presets])}>
            <div className={styles.configurationLabel}>
              presets
            </div>
            <div className={styles.presetButtons}>
              {Object.entries(CONFIGURATION_OPTIONS).filter(([_, value]) => value.text).map(([ key, value ]) => (
                <button className={classnames([styles.configurationButton, {[styles.selected]: configuration.id === key}])} key={key} onClick={() => selectConfiguration(key)}>
                  {Array.isArray(value.text) ? value.text[Math.floor(Math.random() * value.text.length)] : value.text}
                </button>
              ))}
            </div>
          </div>
          <div className={classnames([styles.configuration, styles.difficulty])}>
            <div className={styles.configurationLabel}>
              difficulty
            </div>
            <div className={styles.difficultyButtons}>
              {Object.keys(DIFFICULTY_CONFIGS).map((key) => (
                <button className={styles.configurationButton} key={key} onClick={() => selectDifficulty(DIFFICULTY_CONFIGS[key].difficulty)}>
                  {DIFFICULTY_CONFIGS[key].name}
                </button>
              ))}
            </div>
          </div>
          <div className={classnames([styles.configuration, styles.theme])}>
            <div className={styles.configurationLabel}>
              theme
            </div>
            <div className={styles.themeButtons}>
              {Object.keys(THEME_CONFIGS).map((key) => (
                <button className={styles.configurationButton} key={key} onClick={() => selectTheme(THEME_CONFIGS[key])}>
                  {THEME_CONFIGS[key]}
                </button>
              ))}
            </div>
          </div>
        </ErrorBoundary>
      </div>
      {gridRef.current && (
        <Grid
          grid={gridRef.current}
          configuration={configuration}
          difficulty={difficulty}
          theme={theme}
          timerRef={timerRef}
          ref={gridComponentRef}
          onGameOver={onGameOver}
        />
      )}
      <div className={styles.timerAndRefresh}>
        <button className={classnames([styles.button, styles.reload])} onClick={() => selectConfiguration(configuration.id)}>
          <Image className={styles.reloadIcon} src='/reload.svg' alt='reload game' width={24} height={24} />
        </button>
        <div className={classnames([styles.button, styles.timer])}>
          <span className={styles.timeIcon}>⏱</span>
          <span className={styles.timerText}>
            <Timer ref={timerRef} />
          </span>
        </div>
        {isGameOver ? <GameOver configuration={configuration} playCount={playCount} /> : '' }
     </div>
      <Legend configuration={configuration} />
    </div>
  );
}

const GameOver = ({ configuration, playCount }: { configuration: MinesweeperConfig, playCount: number }) => {
  const [cursor, setCursor] = useState(false);
  const [message, setMessage] = useState('');
  
  const timerRef = useRef<NodeJS.Timeout>();
  
  const cx = classnames([ styles.gameOver, {
    [styles.short]: message?.length < 20,
    [styles.medium]: message?.length >= 20 && message.length < 60,
    [styles.long]: message.length >= 60 && message.length < 120,
    [styles.extraLong]: message.length >= 120,
  }]);

  useEffect(() => {
    const endgameMessage = typeof configuration.endgame === 'string'
      ? configuration.endgame
      : configuration.endgame[Math.floor(Math.random() * configuration.endgame.length)];

    setMessage(endgameMessage);
  }, [configuration, playCount]);

  useEffect(() => {
    if (configuration.id !== 'signal_loss') return;

    timerRef.current = setInterval(() => {
      setCursor(!cursor);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [cursor, configuration]);

  return (
    <div className={styles.gameOverContainer}>
      <div className={cx}>
        {configuration.endgameLabel ? (<div className={styles.gameOverLabel}>{configuration.endgameLabel}</div>) : ''}
        <div className={styles.gameOverText}>
          {configuration.endgamePrefix ? <span className={styles.gameOverPrefix}>{configuration.endgamePrefix}</span> : ''}
          {configuration.cursor ? <span className={classnames([styles.gameOverCursor, {[styles.cursorOff]: cursor}])}>{configuration.cursor}</span> : ''}
          {message}
        </div>
      </div>
    </div>
  );
};

const Legend = ({ configuration }: { configuration: MinesweeperConfig }) => {
  const [showLegend, setShowLegend] = useState(false);

  return (
    <div className={styles.legend}>
      {showLegend
        ? (
          <button
            className={classnames([styles.button, styles.legendButton])}
            onClick={() => setShowLegend(!showLegend)}
          >
            hide legend
          </button>
        ) : (
          <button
            className={classnames([styles.button, styles.legendButton])}
            onClick={() => setShowLegend(!showLegend)}
          >
            show legend
          </button>
        )
      }
      {showLegend
        ? (
          <div className={styles.legendBox}>
            {Object.entries(configuration.symbols).map(([key, symbol]) => ( 
              key === 'empty' || key === '0'
                ? null
                : (
                  <div key={key} className={styles.legendKey}>
                    {key === 'mine' ? 'x' : key}: {typeof symbol.text === 'string' ? symbol.text : symbol.text()}
                  </div>
                )
            ))}
          </div>
        ) : null
      }
    </div>
  );
};

'use client';

import { RefObject, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Image from 'next/image';
import classnames from 'classnames';

import { DIFFICULTY_CONFIG, DIFFICULTY_CONFIGS, DifficultyConfig, THEME_CONFIG, THEME_CONFIGS, ThemeConfig } from '@/constants/minesweeper';
import { buildSquareGrid, placeMines, setMineCounts } from '@/utils/minesweeper';
import { CONFIGURATION_OPTIONS, MinesweeperConfig, Symbol, initializeConfiguration } from '@/symbols/minesweeper';
import Timer from '../timer';
import { type Tile, SquareGrid } from 'src/classes/SquareGrid';

import styles from './styles.module.css';

type GridProps = {
  grid: SquareGrid;
  configuration: MinesweeperConfig;
  difficulty: DifficultyConfig;
  theme: ThemeConfig;
  timerRef: TimerRef;
  onGameOver: () => void
};

type MinesweeperButtonProps = {
  tile: Tile;
  onCellClick: (tile: Tile) => void;
  configuration: MinesweeperConfig;
  isGameOver: boolean;
  style?: object;
};

type TimerHandle = { reset: () => void, stop: () => void, getTime: () => number };
type TimerRef = RefObject<TimerHandle>;

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
  isGameOver,
  style
}: MinesweeperButtonProps) {
  const cx = classnames([styles.tile, styles[tile.metadata.count.toString()], {
    [styles.unclicked]: Boolean(!tile.metadata.clicked),
    [styles.clicked]: Boolean(tile.metadata.clicked),
    [styles.empty]: tile.metadata.count === 0,
    [styles.mine]: Boolean(tile.metadata.mine),
  }]);

  return (
    <button
      className={cx}
      onClick={() => onCellClick(tile)}
      style={style}
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

    setCellsClicked((c) => {
      return c.with(oneDimensionalIndex, true);
    });

    if (tile.metadata.mine || tile.metadata.count > 0) return;

    const neighbors = grid.neighbors(tile);

    neighbors.forEach((neighbor) => checkTile(neighbor));
  }

  const cx = classnames([ styles.game, styles[configuration.id], styles[theme]]);

  return (
    <div className={cx} style={{width: grid.dimensionQ * 24 + 2, height: grid.dimensionR * 24 + 2}}>
      {grid.oneDimensionalArray().map((tile, index) => (
        <MinesweeperButton
          key={index}
          tile={tile}
          onCellClick={onCellClick}
          configuration={configuration}
          isGameOver={isGameOver}
          style={getStyleRuleForTile({ index, grid })}
        />
      ))}
    </div>
  );
});

const getStyleRuleForTile = ({ index, grid }: { index: number, grid: SquareGrid }) => {
  if (index % grid.dimensionQ === (grid.dimensionQ - 1)) return { borderRight: 0 };
  if (index % grid.dimensionQ === 0) return { borderLeft: 0 };
  if (index % grid.dimensionR === 0) return { borderTop: 0 };
  if (index % grid.dimensionR === (grid.dimensionR - 1)) return { borderBottom: 0 };
};

const initializeGrid = ({ difficulty }: { difficulty: DIFFICULTY_CONFIG }) => {
  const grid = buildSquareGrid({ dimension: DIFFICULTY_CONFIGS[difficulty].dimension });

  placeMines({ grid, difficulty });
  setMineCounts({ grid });

  return grid;
};

export default function Game({
  difficultyDefault = DIFFICULTY_CONFIG.intermediate,
  themeDefault = THEME_CONFIG.simple,
}: {
  difficultyDefault: DifficultyConfig,
  themeDefault: ThemeConfig
}) {
  const [configuration, setConfiguration] = useState<MinesweeperConfig>(CONFIGURATION_OPTIONS['standard']);
  const [difficulty, setDifficulty] = useState<DifficultyConfig>(difficultyDefault);
  const [theme, setTheme] = useState<ThemeConfig>(themeDefault);
  const [playCount, setPlayCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const timerRef = useRef<TimerHandle>(null);
  const gridRef = useRef<SquareGrid | null>(null);
  const gridComponentRef = useRef<{ isGameOver: () => boolean }>(null);

  const onGameOver = () => {
    timerRef.current?.stop();
    setIsGameOver(true);
  };

  useEffect(() => {
    setIsGameOver(false);
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
    <div className={classnames([styles.container, styles[configuration.id], {[styles.isGameOver]: isGameOver}])}>
      <div className={cx}>
        <MobilePresets configuration={configuration} selectConfiguration={selectConfiguration} />
        <DesktopControls
          configuration={configuration}
          difficulty={difficulty}
          theme={theme}
          selectConfiguration={selectConfiguration}
          selectDifficulty={selectDifficulty}
          selectTheme={selectTheme}
        />
        <MobileTimerAndRefresh configuration={configuration} selectConfiguration={selectConfiguration} timerRef={timerRef} />
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
        <div className={classnames([styles.themeAndLegend, styles.mobile])}>
          <MobileTheme theme={theme} selectTheme={selectTheme} />
          <MobileLegend configuration={configuration} />
        </div>
        <MobileGameOver
          configuration={configuration}
          isGameOver={isGameOver}
          timerRef={timerRef}
          playCount={playCount}
        />
        <DesktopResults
          configuration={configuration}
          selectConfiguration={selectConfiguration}
          isGameOver={isGameOver}
          timerRef={timerRef}
          playCount={playCount}
        />
        <DesktopLegend configuration={configuration} />
        <MobileDifficulty difficulty={difficulty} selectDifficulty={selectDifficulty} />
      </div>
      <DesktopFooter />
    </div>
  );
}

const MobileFooter = () => {
  return (
    <div className={classnames([styles.footer, styles.mobile])}>
      {/* <p className={styles.tagline}>realtime processing of a chaotic existence</p> */}
      <p>created by <a className={styles.link} href='http://lillywolf.com'>lilly wolf 💖</a></p>
    </div>
  );
};

const DesktopFooter = () => {
  return (
    <div className={classnames([styles.footer, styles.desktop])}>
    <p>realtime processing of a chaotic existence</p>
    <p>created by <a className={styles.link} href='http://lillywolf.com'>lilly wolf 💖</a></p>
  </div>
  );
};

const DesktopControls = ({
  configuration,
  selectConfiguration,
  difficulty,
  selectDifficulty,
  theme,
  selectTheme
}: {
  configuration: MinesweeperConfig,
  selectConfiguration: (configuration: string) => void,
  difficulty: DifficultyConfig,
  selectDifficulty: (difficuly: DifficultyConfig) => void,
  theme: ThemeConfig,
  selectTheme: (theme: ThemeConfig) => void,
}) => {
  return (
    <div className={classnames([styles.desktop, styles.controls])}>
      <ErrorBoundary fallback={<p>an error has occurred!</p>}>
        <DesktopPresets configuration={configuration} selectConfiguration={selectConfiguration} />
        <DesktopMenu difficulty={difficulty} selectDifficulty={selectDifficulty} theme={theme} selectTheme={selectTheme} />
      </ErrorBoundary>
    </div>
  );
}

const GameOverMobile = ({
  configuration,
  playCount,
  timerRef
}: {
  configuration: MinesweeperConfig,
  playCount: number,
  timerRef: TimerRef
}) => {
  const [cursor, setCursor] = useState(false);
  const [message, setMessage] = useState('');
  
  const cursorRef = useRef<NodeJS.Timeout>();
  
  useEffect(() => {
    const endgameMessage = typeof configuration.endgame === 'string'
      ? configuration.endgame
      : configuration.endgame[Math.floor(Math.random() * configuration.endgame.length)];

    setMessage(endgameMessage);
  }, [configuration, playCount]);

  useEffect(() => {
    if (configuration.id !== 'signal_loss') return;

    cursorRef.current = setInterval(() => {
      setCursor(!cursor);
    }, 1000);

    return () => clearInterval(cursorRef.current);
  }, [cursor, configuration]);

  const time = timerRef.current?.getTime();

  return (
    <div className={styles.gameOverContainer}>
      {configuration.endgameLabel ? (
        <div className={styles.stats}>
          <div className={styles.gameOverLabel}>
            {configuration.endgameLabel}
            {configuration.cursor ? <span className={classnames([styles.gameOverCursor, {[styles.cursorOff]: cursor}])}>{configuration.cursor}</span> : null}
          </div>
        </div>
      ) : ''}
      <div className={styles.gameOver}>
        <div className={styles.gameOverText}>
          {configuration.endgamePrefix ? <span className={styles.gameOverPrefix}>{configuration.endgamePrefix}</span> : ''}
          {message}
        </div>
      </div>
    </div>
  );
};

const GameOverDesktop = ({ configuration, playCount, timerRef }: { configuration: MinesweeperConfig, playCount: number, timerRef: TimerRef }) => {
  const [cursor, setCursor] = useState(false);
  const [message, setMessage] = useState('');
  
  const cursorRef = useRef<NodeJS.Timeout>();
  
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

    cursorRef.current = setInterval(() => {
      setCursor(!cursor);
    }, 1000);

    return () => clearInterval(cursorRef.current);
  }, [cursor, configuration]);

  const time = timerRef.current?.getTime();

  return (
    <div className={styles.gameOverContainer}>
      <div className={styles.stats}>
        {configuration.endgameLabel ? (
          <div className={styles.gameOverLabel}>
            {configuration.endgameLabel}
            {configuration.cursor ? <span className={classnames([styles.gameOverCursor, {[styles.cursorOff]: cursor}])}>{configuration.cursor}</span> : ''}
          </div>
        ) : ''}
        {time && <div className={styles.time}>
          <span>time: </span>{new Date(time * 10).toISOString().slice(11, 22)}
        </div>}
      </div>
      <div className={cx}>
        <div className={styles.gameOverText}>
          {configuration.endgamePrefix ? <span className={styles.gameOverPrefix}>{configuration.endgamePrefix}</span> : ''}
          {message}
        </div>
      </div>
    </div>
  );
};

const MobileLegend = ({ configuration }: { configuration: MinesweeperConfig }) => {
  // const [showLegend, setShowLegend] = useState(true);

  return (
    <div className={classnames([styles.legend, styles.mobile])}>
      {Object.entries(configuration.symbols).map(([key, symbol]) => ( 
        key === 'empty' || key === '0' || key === 'mine'
          ? null
          : (
            <div key={key} className={styles.legendKey}>
              <span>
                {key}: 
                {/* {key === 'mine' ? 'x' : key}: */}
              </span>
              <span className={styles.legendSymbol}>
                {typeof symbol.text === 'string' ? symbol.text : symbol.text()}
              </span>
            </div>
          )
      ))}
    </div>
  );
};

const DesktopLegend = ({ configuration }: { configuration: MinesweeperConfig }) => {
  const [showLegend, setShowLegend] = useState(true);

  return (
    <div className={classnames([styles.legend, styles.desktop])}>
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

const MobileDifficulty = ({
  difficulty,
  selectDifficulty,
}: {
  difficulty: DifficultyConfig,
  selectDifficulty: (difficulty: DifficultyConfig) => void,
}) => {
  return (
    <div className={styles.configurationsMobile}>
      <div className={classnames([styles.configuration, styles.difficulty, styles.mobile])}>
        {Object.keys(DIFFICULTY_CONFIGS).map((key) => (
          <button
            className={classnames([
              styles.button,
              styles.difficultyButton,
              styles.configurationButton,
              styles[DIFFICULTY_CONFIGS[key].id],
              {[styles.selected]: DIFFICULTY_CONFIGS[difficulty].id === DIFFICULTY_CONFIGS[key].id}])}
            key={key}
            onClick={() => selectDifficulty(DIFFICULTY_CONFIGS[key].difficulty)}
          >
            {DIFFICULTY_CONFIGS[key].name}
          </button>
        ))}
      </div>
    </div>
  );
}

const MobileTheme = ({
  theme,
  selectTheme
}: {
  theme: string,
  selectTheme: (theme: ThemeConfig) => void
}) => {
  const [showThemes, setShowThemes] = useState(false);

  const _selectTheme = (newTheme: ThemeConfig) => {
    setShowThemes(false);
    selectTheme(newTheme);
  };

  return (
    <div className={classnames([styles.configuration, styles.theme, styles.mobile, {[styles.open]: showThemes}])}>
    {!showThemes
      ? null
      : (
        <div className={styles.themes}>
          {Object.keys(THEME_CONFIGS).map((key) => {
            if (key === theme) return null;

            return (
              <button className={styles.themeButton} key={key} onClick={() => _selectTheme(THEME_CONFIGS[key].id)}>
                <span className={styles.themeIcon}>{THEME_CONFIGS[key].icon}</span>
              </button>
            );
          })}
        </div>
      )
    }
    <button className={styles.currentTheme} onClick={() => setShowThemes(!showThemes)}>
      <span className={styles.themeIcon}>{THEME_CONFIGS[theme].icon}</span>
    </button>
  </div>
  );
};

const MobilePresets = ({
  configuration,
  selectConfiguration
}: {
  configuration: MinesweeperConfig,
  selectConfiguration: (configuration: string) => void
}) => {
  const [currentScrollXPosition, setCurrentScrollXPosition] = useState(0);
  const presetButtonsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    presetButtonsRef.current?.scrollTo({
      left: currentScrollXPosition,
      behavior: 'smooth'
    });
  }, [currentScrollXPosition]);

  const scrollRight = useCallback(() => {
    const presetButtonsWidth = Number(presetButtonsRef.current?.scrollWidth);
    const presetButtonsFrameWidth = Number(presetButtonsRef.current?.clientWidth);
    const presetButtonsRowGap = parseInt((getComputedStyle(presetButtonsRef.current as Element).columnGap), 10);
    // const buttonWidth = Number(buttonRef.current?.scrollWidth);
    const scrollChange = presetButtonsFrameWidth/2 + presetButtonsRowGap + 2;
    if (currentScrollXPosition < presetButtonsWidth) {
      setCurrentScrollXPosition(Math.min(presetButtonsWidth, currentScrollXPosition + scrollChange));
    }
  }, [presetButtonsRef, currentScrollXPosition]);

  const scrollLeft = useCallback(() => {
    const presetButtonsWidth = Number(presetButtonsRef.current?.scrollWidth);
    const presetButtonsFrameWidth = Number(presetButtonsRef.current?.clientWidth);
    const presetButtonsRowGap = parseInt((getComputedStyle(presetButtonsRef.current as Element).columnGap), 10);
    // const buttonWidth = Number(buttonRef.current?.scrollWidth);
    const scrollChange = presetButtonsFrameWidth/2 + presetButtonsRowGap + 2;
    if (currentScrollXPosition > 0) {
      setCurrentScrollXPosition(Math.max(0, currentScrollXPosition - scrollChange));
    }
  }, [presetButtonsRef, currentScrollXPosition]);

  return (
    <div className={classnames([styles.configuration, styles.presets, styles.mobile])}>
      <Image 
        className={classnames([
          styles.arrowLeft,
          {[styles.isDisabled]: currentScrollXPosition === 0}
        ])}
        src='/arrow-circle-left.svg'
        width={20}
        height={20}
        alt='scroll left'
        onClick={() => scrollLeft()}
      />
      <div className={styles.presetButtons} ref={presetButtonsRef}>
        {Object.entries(CONFIGURATION_OPTIONS).filter(([_, value]) => value.text).map(([ key, value ], i) => (
          <button
            className={classnames([
              styles.button,
              styles.configurationButton,
              styles.presetButton,
              {[styles.selected]: configuration.id === key}, styles[configuration.id]
            ])}
            ref={i === 0 ? buttonRef : null}
            key={key}
            onClick={() => selectConfiguration(key)}
          >
            {Array.isArray(value.text) ? value.text[Math.floor(Math.random() * value.text.length)] : value.text}
          </button>
        ))}
      </div>
      <Image
        className={classnames([
          styles.arrowRight,
          {[styles.isDisabled]: currentScrollXPosition >= Number(presetButtonsRef.current?.scrollWidth)}
        ])}
        src='/arrow-circle-right.svg'
        width={20}
        height={20}
        alt='scroll right'
        onClick={() => scrollRight()}
      />
    </div>
  );
};

const DesktopMenu = ({
  difficulty,
  selectDifficulty,
  theme,
  selectTheme
}: {
  difficulty: DifficultyConfig,
  selectDifficulty: (difficulty: DifficultyConfig) => void,
  theme: ThemeConfig,
  selectTheme: (theme: ThemeConfig) => void
}) => {
  return (
    <div className={styles.configurationsDesktop}>
      <div className={classnames([styles.configuration, styles.difficulty, styles.desktop])}>
        <div className={styles.configurationLabel}>
          difficulty
        </div>
        <div className={styles.difficultyButtons}>
          {Object.keys(DIFFICULTY_CONFIGS).map((key) => (
            <button
              className={classnames([
                styles.button,
                styles.configurationButton,
                styles.difficultyButton,
                styles[DIFFICULTY_CONFIGS[key].name],
                {[styles.selected]: DIFFICULTY_CONFIGS[key].id === DIFFICULTY_CONFIGS[difficulty].id}])
              }
              key={key}
              onClick={() => selectDifficulty(DIFFICULTY_CONFIGS[key].difficulty)}
            >
              {DIFFICULTY_CONFIGS[key].name}
            </button>
          ))}
        </div>
      </div>
      <div className={classnames([styles.configuration, styles.theme, styles.desktop])}>
        <div className={styles.configurationLabel}>
          theme
        </div>
        <div className={styles.themeButtons}>
          {Object.keys(THEME_CONFIGS).map((key) => (
            <button
              className={classnames([
                styles.button,
                styles.themeButton,
                styles.configurationButton,
                {[styles.selected]: THEME_CONFIGS[key].id === THEME_CONFIGS[theme].id}
              ])}
              key={key}
              onClick={() =>
              selectTheme(THEME_CONFIGS[key].id)}
            >
              {THEME_CONFIGS[key].id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const DesktopPresets = ({
  configuration,
  selectConfiguration
}: {
  configuration: MinesweeperConfig,
  selectConfiguration: (configuration: string) => void
}) => {
  return (
    <div className={classnames([styles.configuration, styles.presets, styles.desktop])}>
      <div className={styles.configurationLabel}>
        presets
      </div>
      <div className={styles.presetButtons}>
        {Object.entries(CONFIGURATION_OPTIONS).filter(([_, value]) => value.text).map(([ key, value ]) => (
          <button
            className={classnames([
              styles.button,
              styles.configurationButton,
              styles.presetButton,
              {[styles.selected]: configuration.id === key}, styles[configuration.id]
            ])}
            key={key}
            onClick={() => selectConfiguration(key)}
          >
            {Array.isArray(value.text) ? value.text[Math.floor(Math.random() * value.text.length)] : value.text}
          </button>
        ))}
      </div>
    </div>
  );
};

const MobileTimerAndRefresh = ({
  configuration,
  selectConfiguration,
  timerRef,
}: {
  configuration: MinesweeperConfig,
  selectConfiguration: (configuration: string) => void,
  timerRef: TimerRef,
}) => {
  return (
    <div className={classnames([styles.mobile, styles.timerAndRefresh])}>
      <button className={classnames([styles.reload])} onClick={() => selectConfiguration(configuration.id)}>
        <Image className={styles.reloadIcon} src='/reload.svg' alt='reload game' width={24} height={24} />
      </button>
      <div className={classnames([styles.timer])}>
        <span className={styles.timeIcon}>⏰</span>
        <span className={styles.timerText}>
          <Timer ref={timerRef} />
        </span>
      </div>
  </div>
  );
}

const MobileGameOver = ({
  configuration,
  isGameOver,
  playCount,
  timerRef,
}: {
  configuration: MinesweeperConfig,
  isGameOver: boolean,
  playCount: number,
  timerRef: TimerRef
}) => {
  return isGameOver 
    ? (
      <div className={classnames([styles.mobile, styles.results])}>
        <GameOverMobile configuration={configuration} playCount={playCount} timerRef={timerRef} /> 
      </div>
    )
    : '';
};

const DesktopResults = ({
  configuration,
  selectConfiguration,
  isGameOver,
  timerRef,
  playCount,
}: {
  configuration: MinesweeperConfig,
  selectConfiguration: (configuration: string) => void,
  isGameOver: boolean,
  timerRef: TimerRef,
  playCount: number,
}) => {
  return (
    <div className={classnames([styles.desktop, styles.timerAndRefresh])}>
      <button className={classnames([styles.reload])} onClick={() => selectConfiguration(configuration.id)}>
        <Image className={styles.reloadIcon} src='/reload.svg' alt='reload game' width={24} height={24} />
      </button>
      <div className={classnames([styles.timer])}>
        <span className={styles.timeIcon}>⏱</span>
        <span className={styles.timerText}>
          {/* <Timer ref={timerRef} /> */}
        </span>
      </div>
      {isGameOver ? <GameOverDesktop configuration={configuration} playCount={playCount} timerRef={timerRef} /> : '' }
  </div>
  );
}

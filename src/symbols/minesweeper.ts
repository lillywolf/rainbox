import { COSMOS, SYMBOLS as SYMBOLS_SPARKLES } from './sparkles';
import { SYMBOLS_OCCULT, SYMBOLS as SYMBOLS_WEIRD } from './weird';
import { SYMBOLS as SYMBOLS_COMPILER } from './compiler';
import { SYMBOLS as SYMBOLS_FLOWERS } from './flowers';
import { FRUITS } from './fruits';
import { MINESWEEPER as SYMBOLS_CLOUDS } from './clouds';
import { getWeightedSymbol } from '@/utils/minesweeper';

export type Symbol = {
  weight?: number;
  text: string | (() => string);
};

export type Symbols = {
  mine: Symbol,
  empty?: Symbol,
  0: Symbol,
  1: Symbol,
  2: Symbol,
  3: Symbol,
  4: Symbol,
};

export type MinesweeperConfig = {
  id: string;
  text: string | string[];
  description?: string,
  subtext?: string | string[];
  cursor?: string;
  endgameLabel?: string;
  endgamePrefix?: string;
  wingameLabel?: string;
  wingamePrefix?: string;
  endgame: string | string[];
  wingame: string | string[];
  symbols: Symbols;
  symbolsFn?: () => Symbols;
};

export const SYMBOLS_COCAINE = {
  mine: {
    text: '🎱',
  },
  empty: {
    text: '⬜',
  },
  0: {
    text: '❄️'
  },
  1: {
    text: '🌨️'
  },
  2: {
    text: '⛄'
  },
  3: {
    text: '💎'
  },
  4: {
    text: '💉'
  },
  5: {
    text: '⬜'
  },
  6: {
    text: '⬜'
  },
  7: {
    text: '⬜'
  },
  8: {
    text: '⬜'
  }
};

export const SYMBOLS_DRUGS = {
  mine: {
    text: '💀',
  },
  empty: {
    text: '💠🚌⚡🌨️⛄💎🎱',
  },
  0: {
    text: '💊'
  },
  1: {
    text: '❄️'
  },
  2: {
    text: '❤️'
  },
  3: {
    text: '🐉'
  },
  4: {
    text: '🍁'
  },
  5: {
    text: '💎'
  },
  6: {
    text: '🎱'
  },
  7: {
    text: '🐡'
  },
  8: {
    text: '💉'
  }
};

export const SYMBOLS_LOVE = {
  mine: {
    text: '🥀',
  },
  empty: {
    text: '🩶',
  },
  0: {
    text: '💛'
  },
  1: {
    text: '💝'
  },
  2: {
    text: '💖'
  },
  3: {
    text: '❤️‍🔥'
  },
  4: {
    text: '❤️'
  },
  5: {
    text: '💘'
  },
  6: {
    text: '🩵'
  },
  7: {
    text: '🤍'
  },
  8: {
    text: '💔'
  }
};

export const symbolsFruit = () => {
  const symbols = FRUITS[Math.floor(Math.random() * FRUITS.length)];

  return {
    mine: {
      text: '☀︎',
    },
    empty: {
      text: '',
    },
    0: {
      text: () => getWeightedSymbol(SYMBOLS_SPARKLES)
    },
    1: symbols[1],
    2: symbols[2],
    3: symbols[3],
    4: symbols[4],
    5: symbols[5],
    6: symbols[6],
    7: symbols[7],
    8: symbols[8],
  };
};

export const symbolsDreams = () => {
  const symbols = SYMBOLS_CLOUDS[Math.floor(Math.random() * SYMBOLS_CLOUDS.length)];

  return {
    mine: symbols.mine,
    empty: {
      text: '',
    },
    0: symbols[0],
    1: symbols[1],
    2: symbols[2],
    3: symbols[3],
    4: symbols[4],
    5: symbols[5],
    6: symbols[6],
    7: symbols[7],
    8: symbols[8],
  };
}

export const SYMBOLS_COSMOS = {
  mine: {
    text: '👾',
  },
  empty: {
    text: '⬜',
  },
  0: {
    text: () => getWeightedSymbol(COSMOS)
  },
  1: {
    text: '🪐'
  },
  2: {
    text: '☄️'
  },
  3: {
    text: '🚀'
  },
  4: {
    text: '🛰️'
  },
  5: {
    text: '✨'
  },
  6: {
    text: '🌕'
  },
  7: {
    text: '🌒'
  },
  8: {
    text: '🌌'
  }
};

export const SYMBOLS_RETRO = {
  mine: {
    text: '💣',
  },
  empty: {
    text: '⬜',
  },
  0: {
    text: '🌫️',
  },
  1: {
    text: '☢️'
  },
  2: {
    text: '🧨'
  },
  3: {
    text: '💥'
  },
  4: {
    text: '🤯'
  },
  5: {
    text: '⬜'
  },
  6: {
    text: '⬜'
  },
  7: {
    text: '⬜'
  },
  8: {
    text: '⬜'
  }
};

export const SYMBOLS_STANDARD = {
  mine: {
    text: '☀︎',
  },
  empty: {
    text: '⬜',
  },
  0: {
    text: ' ',
  },
  1: {
    text: '➊'
  },
  2: {
    text: '➋'
  },
  3: {
    text: '➌'
  },
  4: {
    text: '➍'
  },
  5: {
    text: '➎'
  },
  6: {
    text: '➏'
  },
  7: {
    text: '➐'
  },
  8: {
    text: '➑'
  }
};

export const SYMBOLS_NUMBER = {
  mine: {
    text: '💣',
  },
  empty: {
    text: '⬜',
  },
  0: {
    text: ' ',
  },
  1: {
    text: '➊'
  },
  2: {
    text: '➋'
  },
  3: {
    text: '➌'
  },
  4: {
    text: '➍'
  },
  5: {
    text: '⬜'
  },
  6: {
    text: '⬜'
  },
  7: {
    text: '⬜'
  },
  8: {
    text: '⬜'
  }
};


export const GIRLS = {
  mine: {
    text: '☠️',
  },
  empty: {
    text: '🦢˚˖𓍢ִ໋🌷͙֒🎀༘⋆✩',
  },
  0: {
    text: '🎧',
    // text: () => getWeightedSymbol(SYMBOLS_SPARKLES),
  },
  1: {
    text: '🌸'
  },
  2: {
    text: '✰'
  },
  3: {
    text: '🪐༘⋆'
  },
  4: {
    text: '🎀'
  },
  5: {
    text: '🔬'
  },
  6: {
    text: '🩰'
  },
  7: {
    text: '🎮'
  },
  8: {
    text: '♡'
  }
};

export const SYMBOLS_POWER = {
  mine: {
    text: '♚',
  },
  empty: {
    text: '',
  },
  0: {
    text: '♦'
  },
  1: {
    text: '♥'
  },
  2: {
    text: '♣'
  },
  3: {
    text: '♠'
  },
  4: {
    text: '♛'
  },
  5: {
    text: '⬜'
  },
  6: {
    text: '⬜'
  },
  7: {
    text: '⬜'
  },
  8: {
    text: '⬜'
  }
};

export const SYMBOLS_SADNESS = {
  mine: {
    text: '🌧️',
  },
  empty: {
    text: '❤︎💭🤎🧸🍂',
  },
  0: {
    text: '⛆',
  },
  1: {
    text: '❤️‍🩹'
  },
  2: {
    text: '✂️'
  },
  3: {
    text: '☔︎︎'
  },
  4: {
    text: '🥀'
  },
  5: {
    text: '🕊️'
  },
  6: {
    text: '😞'
  },
  7: {
    text: '🖤'
  },
  8: {
    text: '⌛'
  }
};

export const LETTERS = {
  mine: {
    text: '☹'
  },
  0: {
    text: '🇮'
  },
  1: {
    text: '🇲',
  },
  2: {
    text: '🇸'
  },
  3: {
    text: '🇾'
  },
  4: {
    text: '🇴'
  },
  5: {
    text: '🇺'
  },
  6: {
    text: '⬜'
  },
  7: {
    text: '⬜'
  },
  8: {
    text: '⬜'
  }
}

export const SYMBOLS_REGEX = {
  mine: {
    text: '☠️',
  },
  empty: {
    text: '🪞',
  },
  0: {
    text: () => getWeightedSymbol(SYMBOLS_WEIRD),
  },
  1: {
    text: '🦋',
  },
  2: {
    text: '👁️⃤'
  },
  3: {
    text: '🧠'
  },
  4: {
    text: '🫀'
  },
  5: {
    text: '🧿'
  },
  6: {
    text: '⚗️'
  },
  7: {
    text: '📚'
  },
  8: {
    text: '🔎'
  }
}

export const SIGNAL_LOSS = {
  mine: {
    text: '🧱',
  },
  0: {
    // text: () => getWeightedSymbol(SYMBOLS_COMPILER)
    text: '💬',
  },
  1: {
    text: '🛰️',
  },
  2: {
    text: '💎',
  },
  3: {
    text: '🔌',
  },
  4: {
    text: '📲',
  },
  5: {
    text: '📡',
  },
  6: {
    text: '🔊',
  },
  7: {
    text: '📟',
  },
  8: {
    text: '☎️',
  },
};

export const COMPILER = {
  mine: {
    text: '❌',
  },
  empty: {
    text: '✳️➡️',
  },
  0: {
    text: () => getWeightedSymbol(SYMBOLS_COMPILER),
  },
  1: {
    text: '💻'
  },
  2: {
    text: '✳️'
  },
  3: {
    text: '⚠️'
  },
  4: {
    text: '📛'
  },
  5: {
    text: '☢️'
  },
  6: {
    text: '⛔'
  },
  7: {
    text: '🔥'
  },
  8: {
    text: '🧯'
  }
};

export const ENTROPY = {
  mine: {
    text: '𓆉︎',
  },
  empty: {
    text: '⚱️🛕',
  },
  0: {
    text: '❦.',
  },
  1: {
    text: '𓆣',
  },
  2: {
    text: '🏺'
  },
  3: {
    text: '🌕'
  },
  4: {
    text: '🐚',
  },
  5: {
    text: '❦.'
  },
  6: {
    text: '🦂'
  },
  7: {
    text: '🌚'
  },
  8: {
    text: '𖤓♾'
  }
};

export const NONSENSE = {
  mine: {
    text: '🗿',
  },
  empty: {
    text: '🦤🙀🧢🐩',
  },
  0: {
    text: '𓃰',
  },
  1: {
    text: '🦹🏾',
  },
  2: {
    text: '🤡'
  },
  3: {
    text: '🥒'
  },
  4: {
    text: '👹',
  },
  5: {
    text: '🦚'
  },
  6: {
    text: '🎳'
  },
  7: {
    text: '🪰'
  },
  8: {
    text: '🫥'
  }
};

export const SYMBOLS_DIVINATION = {
  mine: {
    text: '🕷️',
  },
  empty: {
    text: '🩻😵🀚',
  },
  0: {
    text: () => getWeightedSymbol(SYMBOLS_OCCULT),
  },
  1: {
    text: '🦀'
  },
  2: {
    text: '🪞'
  },
  3: {
    text: '🪬'
  },
  4: {
    text: '🐍'
  },
  5: {
    text: '🌹'
  },
  6: {
    text: '🕯'
  },
  7: {
    text: '🧿'
  },
  8: {
    text: '🪲'
  }
};

export const FLOWERS = {
  mine: {
    text: '🪲',
  },
  empty: {
    text: '',
  },
  0: {
    text: () => getWeightedSymbol(SYMBOLS_FLOWERS),
  },
  1: {
    text: '🌺'
  },
  2: {
    text: '🌼'
  },
  3: {
    text: '🌸'
  },
  4: {
    text: '🌹'
  },
  5: {
    text: '🌻'
  },
  6: {
    text: '💐'
  },
  7: {
    text: '🏵️'
  },
  8: {
    text: '🌷'
  }
};

export const ARMS_RACE = {
  mine: {
    text: '☠️',
  },
  empty: {
    text: '',
  },
  0: {
    text: '💪',
  },
  1: {
    text: '🔫'
  },
  2: {
    text: '💣'
  },
  3: {
    text: '🧨'
  },
  4: {
    text: '☢️'
  },
  5: {
    text: '💥'
  },
  6: {
    text: '🧯'
  },
  7: {
    text: '🪖'
  },
  8: {
    text: '☁️'
  }
};

export const initializeConfiguration = (configuration: MinesweeperConfig) => {
  if (configuration.symbolsFn) {
    configuration.symbols = configuration.symbolsFn();;
  }
}

export const CONFIGURATION_OPTIONS: Record<string, MinesweeperConfig> = {
  'love': {
    id: 'love',
    text: '♥︎♥︎♥︎',
    endgameLabel: 'game over 🥀',
    endgame: [
      // 'when viewing picture of their partner, lovers show significant activation in some brain regions which include the ventral tegmental area (VTA), nucleus accumbens (NAC), caudate, insula, dorsal anterior cingulate cortex (dACC), dorsolateral prefrontal cortex (dlPFC), hippocampus, posterior cingulate cortex (PCC), precuneus, temporo-parietal junction (TPJ), and hypothamalus.',
      // 'disruption of pair bonding induces plastic changes in the hypothalamic CRF system, and these changes are associated with individuals returning to their former partner',
      // 'these studies suggest that the subjective state (or states) of “being in love” is intimately tied to characteristic biochemical reactions occurring within the brain. these reactions involve such compounds as dopamine, oxytocin, vasopressin, and serotonin and recruit brain regions known to play a role in the development of trust, the creation of feelings of pleasure, and the signalling of reward',
      // 'some scientists have suggested that this dopaminergic overlap may explain why experiencing love ... can feel like a cocaine rush',
      'isn\'t love just obsession that takes longer?',
      `\'love is a drug, like the strongest stuff ever\'\n-- j cole`,
      `\'the razor-sharp edges of companionship and love\'\n-- roberto bolaño`,
      'every love story is a ghost story',
      'love hurts',
      '\'love to faults is always blind\'\n-- william blake',
      `\'yes, i was infatuated with you: i am still\'\n-- sylvia plath`,
      `\'it\'s weird to feel like you miss someone you\'re not even sure you know\'\n-- david foster wallace`,
      `\'what did my arms do before they held you?\'\n-- sylvia plath`,
      `\'sometimes the person you\'d take a bullet for ends up being the one behind the gun\'\n-- tupac`,
      `\'the heart was made to be broken\'\n-- oscar wilde`,
      `\'the course of true love never did run smooth\'\n-- shakespeare`,
      `\'love is a trap\'\n-- paulo coelho`,
      `\'love is so short, forgetting is so long\'\n-- pablo neruda`,
      'love is the hardest habit to break',
      // 'you are a song a dream a whisper',
      // 'you have been in every line i have ever read',
      // 'i am half agony half hope',
      // 'well, when you think you love somebody, you love them. that\'s what love is. thoughts',
      // 'against reason against promise against peace against hope against happiness against all discouragement',
      '\'i\'m never not thinking of you\'\n-- virginia woolf',
      // 'i fell in love with your courage your sincerity and your flaming self respect',
      // `\'you are one of the lights the lights of all lights\'\n--bram stoker`,
      // 'you know you\'re in love when you can\'t fall asleep because reality is finally better than your dreams',
      // 'for you, a thousand times over',
      'it takes two to make an accident',
      // '\'you don\'t know how happy i am to be with you\'\n--milan kundera',
      'wise men say only fools rush in',
      `\'love is a trick the DNA plays to replicate itself\'\n-- andromeda`,
      // 'what if every relationship you\'re in is just someone slowly figuring out they don\'t like you as much as they\'d hoped they would?'
      // 'love is being stupid together',
      // 'love is a rare thing, easily confused with a million other things',
      // 'i steal into their dreams ... i scan their irrational impulses, their unspeakable emotions, i sleep in their lungs during the summer and their muscles during the winter, and all of this i do without the least effort, without intending to, without asking or seeking it out, without constraints, driven only by love and devotion'
    ],
    wingame: [
      'love is a friendship set to music',
      'know that in this world there\'s somebody who will always love you',
      // 'with love everything is bought, everything is saved',
      // 'others feel and think much as you do, care about many of the things you care about ... you are not alone',
    ],
    symbols: SYMBOLS_LOVE,
  },
  'standard': {
    id: 'standard',
    text: 'simple',
    endgameLabel: 'game over ☹',
    endgame: [
      'thank you for playing',
      'game over yeahhhhhhhhhh',
      'insert coin to try again',
      'better luck next time',
      'every end is a new beginning',
      'you have died',
      'there is no why',
      'you and your friends are dead',
      'failed to keep mission critical resources',
      'and now for a final word from our sponsor',
      'ur dead ☹',
    ],
    wingame: [
      'congratulations on another controlled near-death experience!',
      'you have evaded destruction',
    ],
    symbols: SYMBOLS_STANDARD,
  },
  'fruits': {
    id: 'fruits',
    text: 'random fruits 🍋',
    endgameLabel: '🍑 🥝 🍉 🥥 🍋 🍐 🍋',
    endgame: [
      'hi',
      'i miss you',
      'would you like to be friends?',
      'we can try again',
      'do you want to build a dream together?',
      'i want to weigh less, to float up to where you are',
      'don\'t be scared. let\'s hold hands and never let go',
      'i think i made you up inside my head',
      'you\'re cute',
      ':)',
      'i regret nothing',
      'let\'s meet in air, me and you',
      'stay here with me',
      'if you remember me, then i don\'t care if everyone else forgets',
      'i might just text you',
      'are you happy i\'m here?',
      // 'are you real?',
      'let\'s go',
      'it\'s fun to be with you'
    ],
    wingame: [
      'know that in this world there\'s somebody who will always love you',
    ],
    symbols: symbolsFruit(),
    symbolsFn: () => symbolsFruit(),
  },
  'happy birthday': {
    id: 'birthday',
    text: '',
    endgame: [],
    wingame: [],
    symbols: symbolsFruit(),
  },
  'cosmos': {
    id: 'cosmos',
    text: 'cosmos',
    endgameLabel: 'game over 🛸',
    endgame: [
      'looking up into the night sky is like looking into infinity',
      'here, for whatever reason, is the world. and here it stays. with me on it',
      'far out in the uncharted backwaters of the unfashionable end of the western spiral arm of the galaxy lies a small unregarded yellow sun. orbiting this at a distance of roughly ninety-two million miles is an utterly insignificant little blue green planet whose ape-descended life forms are so amazingly primitive that they still think digital watches are a pretty neat idea',
      'the planet is fine. the people are fucked',
      'it\'s a very sobering feeling to be up in space and realize that one\'s safety factor was determined by the lowest bidder on a government contract',
      'in the beginning there was nothing, which exploded',
      'space is big. you just won\'t believe how vastly, hugely, mind-bogglingly big it is',
      // 'you know what human history is? human history is the nail on your right-hand index finger. not even the whole nail. just that little white part. the part you clip off when it gets too long. that\'s the discovery of fire and the invention of writing and galileo and newton and the moon landing and 9/11 and last week and this morning. compared to evolution we\'re newborns. compared to geology, we barely exist.',
      'how inappropriate to call this planet "earth," when it is clearly "ocean"',
      'i want to stand as close to the edge as I can without going over. out on the edge you see all kinds of things you can\'t see from the center',
      'the universe is a big place, perhaps the biggest',
      'we are an impossibility in an impossible universe',
      'don\'t forget about stars',
      'the dinosaurs became extinct because they didn\'t have a space program. and if we become extinct because we don\'t have a space program, it\'ll serve us right',
      // 'do i dare disturb the universe',
    ],
    wingame: [
      'we stared into the face of Death, and Death blinked first',
    ],
    symbols: SYMBOLS_COSMOS,
  },
  'dreams': {
    id: 'dreams',
    text: 'dreaming',
    endgameLabel: 'dream ended 🌞',
    endgame: [
      // 'the soft outline of a dream',
      // 'i miss life in the clouds',
      'people say, "i\'m going to sleep now," as if it were nothing',
      'if dreams were not beautiful, they would quickly be forgotten',
      'we\'re artists too, but we do a good job hiding it, don\'t we?',
      'only in chaos are we conceivable',
      'every hundred feet the world changes',
      'i dream. sometimes i think that\'s the only right thing to do',
      'the answer is dreams',
      'gn gn gn gn',
      // 'a poet\'s work ... to shape the world and stop it from going to sleep',
      'the truth comes out in our dreams',
      `\'we were asleep and our dreams had converged on common ground, a place where sound was alien\'\n-- roberto bolaño`,
    ],
    wingame: [
      // 'the only proof he needed for the existence of god was music',
      'i do not know why snow is white. but i do know that snow is beautiful',
    ],
    symbols: symbolsDreams(),
    symbolsFn: () => symbolsDreams(),
  },
  'loss': {
    id: 'loss',
    text: 'don\'t cry',
    endgameLabel: 'game over 🌧️',
    endgame: [
      'i think you ought to know i\'m feeling very depressed',
      // 'now that all hope is gone, a deep relief has taken its place, and i allow myself to enjoy it before the despair sets in',
      `\'ghosts are made up only of the living ... people you know are out there but are forever out of range\'\n-- adam johnson, the orphan master\'s son`,
      'of all the words of mice and men, the saddest are, "it might have been."',
      'cry all you want, i won\'t tell anybody',
      'we\'ve always been terrible at doing the things we\'re supposed to do',
      'it\'s your party, you can cry if you want to',
      'it\'s hard to like, breathe sometimes',
      'just walk it off',
      // 'that\'s just perfectly normal paranoia. everyone in the universe has that',
      // 'did i do anything wrong today, or has the world always been like this and i\'ve been too wrapped up in myself to notice?',
      'it always takes longer than you think it will',
      // 'what is vertigo? fear of falling?',
      // 'the desire to fall, against which, terrified, we defend ourselves',
      'everything that starts as a comedy ends as a tragedy',
      'everything i\'ve ever let go of has claw marks on it',
      // 'now, of course, i\'m out of a job and sometimes, when i\'m in a certain mood, when i wake up with a hangover and it\'s one of those apocalytic mexico city mornings, i think that i did the wrong thing, that i could have invited someone else, in a word, that i fucked up.\\nbut most of the time i\'m not sorry.',
      'don\'t leave',
      `\'so everything lets us down, including curiosity and honesty and what we love best.\nyes, said the voice, but cheer up, it\'s fun in the end\'\n-- roberto bolaño`,
      'perhaps when we find ourselves wanting everything, it is because we are dangerously close to wanting nothing',
      'i must get my soul back from you; i am killing my flesh without it',
      // 'i only wanted / to lie with my hands turned up and be utterly empty',
      'will you remember that i existed, and that i stood next to you here like this?',
      'silence is something you can actually hear',
      `\'if you\'re in pitch blackness, all you can do is sit tight until your eyes get used to the dark\'\n-- haruki murakami`,
      'even if we could turn back, we\'d probably end up where we started',
      `\'now i\'m drivin round on the boulevard trunk bleedin\'\n-- frank ocean`,
      // 'i\'m a ghost and you know this',
      'right? wrong',
      // 'i\'ve dug two graves for us my dear',
      'whenever someone who knows you disappears, you lose one version of yourself',
    ],
    wingame: [
      'no single, individual moment is in and of itself unendurable',
      // 'how nice -- to feel nothing, and still get full credit for being alive'
    ],
    symbols: SYMBOLS_SADNESS
  },
  'thinking': {
    id: 'thinking',
    text: '🧠',
    description: 'the nature of reality',
    endgameLabel: 'game over',
    endgame: [
      'do you find coming to terms with the mindless tedium of it all presents an interesting challenge?',
      'reality is frequently inaccurate',
      `\'i always think that the chances of finding out what really is going on are so absurdly remote that the only thing to do is to say hang the sense of it and just keep yourself occupied\'\n-- douglas adams`,
      'we demand rigidly defined areas of doubt and uncertainty',
      'for a moment, nothing happened. then, after a second or so, nothing continued to happen',
      'it takes a powerful imagination to see a thing for what it really is',
      'you got to be crazy, it\'s too late to be sane',
      `\'you\'re only given a little spark of madness. you lose that, you\'re nothin\'\n-- robin williams`,
      'i do this real moron thing, and it\'s called thinking',
      // 'it wasn\'t a punishment but a new wrinkle',
      'don\'t panic',
      'it takes something more than intelligence to act intelligently',
      'what\'s real and what\'s true aren\'t necessarily the same',
      // 'there is a lot of disconnected research that points toward possible purposes for the posterior cingulate cortex. it may be one of the components of verbal and auditory memory, multisensory perception, visuospatial cognition and/or evaluation of emotional behavior. the right hemisphere posterior cingulate is activated in comprehension of metaphors, and the left in associative learning. story comprehension seems to use the posterior cingulate. it is activated during anxiety and OCD, and may be overactive in bipolar disorder.',
      // 'i took a deep breath and listened to the old brag of my heart. i am, i am, i am.',
      'is there no way out of the mind?',
      'nothing happened today. and if anything did, i\'d rather not talk about it, because i didn\'t understand it',
      'memory conforms to what we think we remember',
      `\'it turns out your memory isn\'t the precise court stenographer you think it is, getting every word down just so. it\'s more like the sketch artist way at the back of the courtroom who is doing his level best to capture images that no longer are\'\n-- norm macdonald`,
      'if you\'re too open-minded, your brain will fall out',
      'those who do not remember the past are condemned to repeat it',
      'call my therapist, tell him he\'s a rich man',
      `\'what is real? because unceasingly we are bombarded with pseudo-realities manufactured by very sophisticated people using very sophisticated electronic mechanisms\'\n-- philip k dick`,
      // 'tired of feelin like im trapped in my damn mind',
      'nothing makes sense',
      'i think i am, therefore, i am ... i think',
      // 'i remember a psychiatrist once telling me that i gamble in order to escape the reality of life, and i told him that\'s why everyone does everything',
      `would it save you a lot of time if i just gave up and went mad now?`,
      'the same equation applies to everything, more or less',
      'reality is a question of perspective',
      `\'the darkness inside your head is something your imagination fills with stories that have nothing to do with the real darkness around you\'\n-- adam johnson`,
      'the only people who see the whole picture are the ones who step out of the frame',
      'the line between reason and madness grows thinner',
      'there is nothing either good or bad but thinking makes it so',
      'if someone with multiple personalities threatens to kill himself, is it considered a hostage situation?',
      'not only do i not know what\'s going on, i wouldn\'t know what to do about it if i did',
      // 'all our dignity consists then in thought. by it we must elevate ourselves, and not by space and time which we cannot fill',
    ],
    wingame: [
      // 'it wasn\'t a punishment but a new wrinkle. it gave us a glimpse of ourselves in our common humanity. it wasn\'t proof of our idle guilt but a sign of our miraculous and pointless innocence.',
      'some people see the glass half full. others see it half empty. i see a glass that\'s twice as big as it needs to be'
    ],
    symbols: SYMBOLS_REGEX
  },
  'signal_loss': {
    id: 'signal_loss',
    text: 'signal loss',
    description: 'the loss of information',
    endgameLabel: 'you are lost',
    endgame: [
      'are you really there? is anyone?',
      'a blessed act of oblivion',
      'looking for some glittering memory',
      'this is it. it\'s going to be gone soon',
      'compared to forgetting, does living really stand a chance',
      // 'the secret story is the one we\'ll never know, although we\'re living it from day to day',
      // 'stop moping. all poets get lost at some point or another',
      // 'have you ever driven in the desert? it looks easy, but there\'s nothing simple about it',
      // 'sunsets in the desert seem like they\'ll never end, until suddenly, before you know it, they\'re done',
      // 'it\'s like someone turned out the lights',
      'i\'m a fan of disappearing. it has a romantic element',
      'nothing is permanent, ever',
      'i think that we\'re all just lost',
      'i\'m so glad that my memory\'s remote',
      'don\'t delete this',
      'sometimes i burn down greenhouses. i choose an abandoned greenhouse and set it on fire',
      'it\'s not about imagining it\'s here. it\'s about forgetting it\'s not there',
      'i just want to vanish, like i never existed',
      'travel light',
      // 'the forces of chance and nature that wipe away shallow prints',
      'now i know what a ghost is',
      'the eraser measures, takes note, follows in the pencil\'s footsteps, leaving only blankness in its wake',
      'how can a signal come from everywhere?',
      'entropy is a bitch',
      'it\'s helpful to establish a crucial fact about information itself: the informative value of a communicated message depends on the degree to which its content is surprising',
      'people aren\'t rational. we\'re not thinking machines, we\'re - we\'re feeling machines that happen to think.',
      // 'machines are your friend. machines don\'t lie. a mysterious machine is just a machine that hasn\'t been decoded yet',
      'the iron machines still exist, but they obey the orders of weightless bits',
    ],
    wingame: [
      'one morning, just as i\'d been hoping, the numbers came back. the sequences didn\'t make any sense at first, but it didn\'t take me long to see the logic in them. the secret was to follow their lead',
      'it is normally supposed that something always gets lost in translation; i cling, obstinately, to the notion that something can also be gained'
    ],
    symbols: SIGNAL_LOSS
  },
  'compiler': {
    id: 'compiler',
    text: '/irregular expressions/',
    cursor: '◼',
    endgameLabel: 'c:\\ >_ ',
    endgame: [
      'the files are corrupted',
      'filesystem error: "brain.exe" not found',
      'missing keys in emotional hashmap',
      'collision detection failed, aborting',
      'exception: you are caught in an infinite loop and have crashed the application',
      'fatal error: reached heap limit allocation failed',
      'maximmum call stack size exceeded while executing fn["cry"]',
      'uncaught reference error',
      'syntax error: illegal character',
      'caught typeerror: illegal invocation',
      'invalid connection',
      'cannot read properties of null (reading "emtn.regulate")',
      'undefined is not a function (evaluating internal_process["logic"])',
      'an error occurred while creating the error report',
      'transfer has started. 2,857,455 minutes are remaining',
      'keyboard not responding. press any key to continue',
      'task failed successfully',
      'authentication failed. your password must be at least 48800 characters',
      'kill process, score, or sacrifice child.',
      'abort, retry, fail?',
      'lp0 on fire',
      'Error: connect ECONNREFUSED: could not connect',
      'FATAL ERROR: CALL_AND_RETRY_LAST allocation failed - heap out of memory',
      'does not compute (lost in space)',
      'connection terminated unexpectedly',
      'cpu out of memory',
      'the operation is insecure',
      'fatal error: connection reset by peer',
      'interrupt service routine',
      'index out of bounds',
      'invalid opcode execution',
      'system failure',
      'double fault',
      '301 moved permanently',
      'user canceled the operation',
      'no trust results are available',
      'the user interface cannot be displayed because the system is in a dark wake state',
      'transaction is rejected',
      'an invalid context was detected',
      'the trust settings are corrupted',
      'the quota was exceeded',
      'self-check failed',
      'the request is lost',
      'found infected file: "brain.exe"',
      'proceeding with the operation "delete" will erase the contents of your hard drive. what do you wish to do?',
      'cache lock error: multiple concurrent requests, cannot write to disk',
      'forget this network',
      'error 418 i\'m a teapot',
      'error 422 unprocessable entity',
      '503 service unavailable',
      '502 service temporarily overloaded by your obsessive ruminating',
      'connection refused by host',
      'restarting',
      'thermal sensor is out of range. press f1 to burst into flames',
      'error while fetching http://slf.control: you have lost connection to the server hosting this web page',
      'cross-origin request blocked: the same origin policy disallows reading the remote resource at http://fn.youaresostupid.com',
    ],
    wingame: [
      'i do not fear computers. i fear the lack of them',
    ],
    symbols: COMPILER
  },
  'roses': {
    id: 'roses',
    text: 'crown of flowers',
    endgameLabel: 'you have returned to the earth',
    endgame: [
      'i like it when a flower or a little tuft of grass grows through a crack in the concrete',
      // 'had she never been hungry enough to eat a flower? did she not know that you could eat daisies, daylilies, pansies, and marigolds? that hungry enough, a person could consume the bright faces of violas, even the stems of dandelions and the bitter hips of roses?',
      'born green we were to this flawed garden',
      'if i told you that a flower bloomed in a dark room, would you trust it?',
    ],
    wingame: [],
    symbols: FLOWERS
  },
  'nonsense': {
    id: 'nonsense',
    text: 'nonsense',
    endgameLabel: '🚬🐖',
    endgame: [
      'there\'s an infinite number of monkeys outside who want to talk to us about this script for Hamlet they\'ve worked out',
      'the answer to the great question ... of life, the universe and everything ... is ... forty-two',
      'i never could get the hang of thursdays',
      'the ships hung in the sky in much the same way that bricks don\'t',
      'life is great man, you can eat at denny\'s or wear a hat, whatever you want',
      'i find a duck\'s opinion of me is very much influenced by whether or not i have bread',
    ],
    wingame: [],
    symbols: NONSENSE
  },
  'what': {
    id: 'what',
    text: '🦀',
    endgameLabel: '⚖️',
    endgame: [
      'your spiritual guide has left the building',
      'you are dead, but you can try manifesting aliveness',
      'no one wants your healing services',
      'mercury is in retrograde',
      // 'this proves two things: firstly, that god moves in extremely mysterious, not to say, circuitous ways. god does not play dice with the universe; he plays an ineffable game of His own devising, which might be compared, from the perspective of any of the other players, [ie., everybody.] to being involved in an obscure and complex version of poker in a pitch-dark room, with blank cards, for infinite stakes, with a Dealer who won\'t tell you the rules, and who smiles all the time.\n secondly, the earth\'s a libra.',
      // 'i just did some calculations, and i\'ve been able to determine that you\'re full of shit',
      'your karmic patterns aren\'t looking good',
      'your daily horoscope: ☠️',
      // 'the cosmic intelligences have whispered in my ear and informed me you have died',
      'your fate is probably not in the stars',
      'even in the darkest places you can find yourself. or you can find your missing sunglasses',
      'left to your own devices, you are probably headng for a fall',
      'you are a freethinker with an inventive mind. for example,  you have freely thought your way into a number of stupid situations',
      'welcome to the afterlife',
      // 'don\'t worry too much about things working out. now that you\'re dead, you can rest knowing that they definitely won\'t',
      // 'keep your eyes open for betrayal. it could come from anywhere',
      'you are practical and persistent. this has not really helped you in any way, as you never remember your mistakes',
      'the rising moon on the tipped axis of uranus says you were once born, and at some point in the next few days or weeks you will meet someone else who was once born',
      'as the leaves begin to change, think carefully about the changes you want to make in your own life. maybe a new hat?',
      'according to your star chart, you were conceived during the daytime or possibly the nighttime',
      // 'the luminous header chiron is in the tenth house of the rising moon, which would have been great for you if you were still alive',
      'the stars didn\'t align, sorry'
    ],
    wingame: [

    ],
    symbols: SYMBOLS_DIVINATION
  },
  'courage': {
    id: 'courage',
    text: '',
    endgame: [
      'what is writing of quality? ... to know how to thrust your head into the darkness, know how to leap into the void, and to understand that literature is basically a dangerous calling',
      'if you want to overcome the whole world, overcome yourself',
      'besides, nowadays, almost all capable people are terribly afraid of being ridiculous, and are miserable because of it',
      'nothing in this world is harder than speaking the truth, nothing easier than flattery',
      'don\'t let fear rule your life. even if you are scared',
    ],
    wingame: [],
    symbols: COMPILER
  },
  'power': {
    id: 'power',
    text: 'arms race',
    endgameLabel: 'you have died',
    endgame: [
      // 'if there\'s anything more important than my ego around, i want it caught and shot now',
      // 'it says here in this history book that, luckily, the good guys have won every single time. what are the odds?',
      `\'pistol in your hand don\'t make you real\'\n-- j cole`,
      'if you die, i\'m dying too. cheers',
      'you know what you are? you\'re a survivor who has nothing to live for',
      'all the lessons you need to learn in life will be taught to you by your enemy',
      // 'people do things to survive, and then after they survive, they can\'t live with what they\'ve done',
      'what are we for? what will we risk our lives to defend?',
      `\'masks beneath masks until suddenly the bare bloodless skull\'\n-- salman rushdie`,
      'free people strike sparks',
      'we all owe death a life',
      'to the latecomers are left the bones',
      `\'dear future generations: please accept our apologies. we were rolling drunk on petroleum\'\n-- kurt vonnegut`,
      'there are no dangerous weapons; there are only dangerous men',
      'you should never be in the company of anyone with whom you would not want to die',
      'stand in the ashes of a trillion dead souls and ask the ghosts if honor matters',
      // 'in some lost fold of the past, we wanted to be lions and we\'re no more than castrated cats',
      'if strength is justice, then is powerlessness a crime?',
      // 'it wasn\'t me who was wrong, it was the world',
      // 'the world can not be changed with pretty words alone',
      'the only way out is in',
      'you can\'t change the world without getting your hands dirty',
      'the trick of real combat is that everyone is human',
      'you must pay for everything in this world, one way or another',
      'if the queen doesn\'t move, then her subjects won\'t follow',
      'be bloody-minded',
      // 'all life seeks primarly to expand itself',
      // 'i burn down my house and build it up again',
      `\'i burn it down twice just for the fun of it\'\n-- labrinth`,
      // 'i got me one gun and me an alibi',
      // 'if i could act on my revenge no would i',
      'the hunt is on, and sprung the trap',
      'pray none of my enemies hold me captive',
      'i smell tnt',
      'I got this killa up inside of me, i can\'t talk to my mother so i talk to my diary',
      // 'started from the bottom',
      'stand for something or die in the morning',
      'i ain\'t a killer, but don\'t push me',
      `\'you\'re nobody til somebody kills you\'\n-- biggie`,
      // 'something must have got in us cause all of us turned to sinners',
      'the key to fighting in the dark is no different: you have to perceive your opponent, sense him, and never use your imagination',
      // 'how is it possible to have a civil war?'
    ],
    wingame: [
      'and you thought that i would let it go and let you walk'
    ],
    symbols: ARMS_RACE
  },
  'entropy': {
    id: 'entropy',
    text: 'entropy and eternal return',
    endgameLabel: 'you have died again',
    endgame: [
      'what is a game?',
      'are we ephemera?',
      'a brief flash of light',
      // `\'are not all things firmly knotted together in such a way that this moment draws after it all things to come?\'\n-- nietzsche`,
      'do you want this again and innumerable times again?',
      'the eternal hourglass of existence is turned over again and again',
      // 'when you can\'t remember your lives, you can\'t change your lives',
      // 'you\'re trapped by that nightmare you keep waking up into',
      'it will surely happen again',
      'there is nothing new under the sun',
      'what has been will be again',
      'time is not a river running inexorably to the sea, but the sea itself',
      'the story is not history alone, it is also prophecy',
      'in the sunset of dissolution, everything is illuminated by the aura of nostalgia',
      `\'the greek word for "return" is nostos. algos means "suffering." so nostalgia is the suffering caused by an unappeased yearning to return\'\n-- milan kundera`,
      'tomorrow, and tomorrow, and tomorrow',
      `\'it\'s the possibility of infinite rebirth, infinite redemption. the idea that if you keep playing, you could win\'\n-- gabrielle zevin`,
      `\'the eternal recurrence of my stupid feelings\'\n-- me`,
      `\'something which does not forever recur has its brief existence, and, once it is complete, the universe goes on existing, utterly indifferent to the completed phenomenon\'\n-- milan kundera`,
      'whether it was horrible, beautiful, or sublime, it means nothing',
      'lightness is the flexible; the weightless; the mobile; the connective; vectors as distinct from structures',
      'it is true that software cannot exercise its powers of lightness except through the weight of hardware',
      'only chance can speak to us',
      'everything that occurs out of necessity, everything expected, repeated day in and day out, is mute',
      'if you\'re looking for infinity, just close your eyes',
      'in infinite time, in infinite matter, in infinite space, is formed a bubble-organism, and that bubble lasts a while and bursts, and that bubble is me',
    ],
    wingame: [],
    symbols: ENTROPY
  },
  'drugs': {
    id: 'drugs',
    text: 'euphoria',
    endgameLabel: '💊 🅿️ 🆚 ❎',
    endgame: [
      'cocaine is god\'s way of saying you make too much money',
      'will you be able to get off H? possibly. but will life have any novelty left after you do? I wouldn\'t bet on it. you\'ve played your own song too many times',
      'my reasons for doing ketamine were to quiet the crying voices and to blunt the sharpness of the pain. i wanted to think Of things maybe but not About things, i\'d been thinking About things my whole life.',
      'the acute withdrawal phase is often followed by a protracted phase of depression and insomnia that can last for months',
      'the dream ended when olney et al demonstrated that animals given high doses of dizocilpine showed curious vacuoles (essentially, tiny holes) in their brains. specifically, the vacuoles showed up in the posterior cingulate cortex and retrosplenial cortex. further research showed that other indicators of damage were present, such as proliferation of microglia, secretion of a protein called HSP70 (heat-shock protein 70), and expression of certain genes.',
      '"take the best orgasm you\'ve ever had, multiply by 1000, and you\'re still nowhere near it"',
      'i love that there are some things that are so awesome that people will do them again and again until they totally fuck themselves up or die. it\'s like some kind of mythical danger, like the sirens. they will kill you but you cannot steer away!',
      'opioids are a class of drugs that derive from, or mimic, natural substances found in the opium poppy plant. as a class of substances, they act on opioid receptors to produce morphine-like effects.',
      'narcotic, derived from words meaning "numbness" or "sleep", as an american legal term, refers to cocaine and opioids and their source materials',
      'sedare dolorem opus divinum est',
      'in england charles romney alder wright developed hundreds of opiate compounds in his search for a nonaddictive opium derivative. in 1874 he became the first person to synthesize diamorphine (heroin), using a process called acetylation, which involved boiling morphine with acetic anhydride for several hours.',
      'euphoria: the experience (or affect) of pleasure or excitement and intense feelings of well-being and happiness. euphoria is also a symptom of certain neurological or neuropsychiatric disorders, such as mania.',
      'the reward system (the mesocorticolimbic circuit) is a group of neural structures responsible for incentive salience (i.e. "wanting"; desire or craving for a reward and motivation), associative learning (primarily positive reinforcement and classical conditioning), and positively-valenced emotions, particularly ones involving pleasure as a core component (e.g. joy, euphoria, and ecstasy). in drug addiction, certain substances over-activate the reward circuit, leading to compulsive substance-seeking behavior resulting from synaptic plasticity in the circuit.',
      'there\'s an undertow involved that you didn\'t see coming. and once its talons are in you, you can\'t get free.',
      'i used to do oxycontin with him. it\'d probably make people who\'d never done it really sick. the feeling of euphoria you get from these things is so surreal.',
      'is this the famous stone that turneth all to gold?',
      'ketamine is called "dissociative" in action, which means that the mind is "separated" from the body. in many cases, this separation results in profound hallucinations and the sensation of entering another reality.',
      'many people who really like dissociatives have told me that they find them so attractive because they help take away a near-constant self-consciousness, an almost self-absorbing embarrassment or "inner critic"',
      'i desire the things that will destroy me in the end',
      'i have this disease late at night sometimes, involving alcohol and the telephone',
      'dear drugs, i miss you',
      'why you babysittin only two or three shots',
      'i drink liquor on liquor',
      'now i\'m talkin to the reaper to reverse death',
      'jumpin off of a mountain into a sea of codeine',
      'i am a prisoner, locked up behind xanax bars',
      'there\'s a thin line in the sand and once you cross it people who don\'t know what\'s going on will want to call an ambulance',
      'ketamine hydrochloride - also known by the trade names ketalar, ketaset, ketavet and by the street names vitamin k, agent k, special k, or just k -- was not discovered in the darkest jungles of south america, nor does it have a long history of traditional use among indigenous tribes. ketamine is a purely human creation',
      'although ketamine was an effective anesthetic it soon became clear that it did have one unusual side effect - twenty percent of all patients anesthetized with ketamine reported having waking dreams, out of body experiences, and other odd mind phenomena while under the influence',
      // 'during normal waking activity, your thalamus acts as a routing center for all sense data which comes up the spinal cord from the body. by shutting this central router down, you can effectively cut off all the sense data that\'s coming in from the rest of your body. this is primarily what makes ketamine a perfect anesthetic',
      'some people i know think they have stopped breathing, but you won\'t, so don\'t worry',
      // 'more than nine million vials of injectable ketamine have disappeared from china\'s pharmaceutical distribution network. following an audit in june, the food and drug bureau in china\'s central hunan province discovered that 3,092 cases (9.3 million vials) of the product had vanished from the official paper trail over the preceding year', 
      'i did it all, and everything crashed around me',
      'the hole I told you about ... speed filled it, and i didn\'t want to go back to it being empty',
      'i plan to quit this summer',
      'for a fistful of ten dollar bills you can feel like a king of small country',
      'you might say to yourself, i\'m bigger than this little pile on the mirror',
      'it\'s so easy to get back up there. it\'s just one little line',
      'it just made me better at everything. then it wore off',
      // '&%*$ the dishes, %&$ the vacuum, i\'d rather sit here and stare at the back of my eyelids',
      'i\ll kiss you again, between the bars',
      `\'drink up baby stay up all night / with the things you could do, you won\'t but you might\'\n-- elliott smith`,
      // 'now i understand what truly longing for a drug is ... how you think about how good it was, and how much better you would feel, if you just got a little more',
      // 'i\'m going on a date with a rich white lady',
      // 'this is the place where time reverses',
      'the game looks easy, that\'s why it sells',
      // 'alcohol will turn you into the same asshole your father was',
      `\'this is what you call a flip, ten keys from a quarter brick\'\n-- j cole`,
      'an addiction is a deep hook',
    ],
    wingame: [
      'a new strategy of drug development takes receptor signal transduction into consideration. this strategy strives to increase the activation of desirable signalling pathways while reducing the impact on undesirable pathways. this differential strategy has been given several names, including functional selectivity and biased agonism.'
    ],
    symbols: SYMBOLS_DRUGS,
  },
  'femininity': {
    id: 'femininity',
    text: 'girls',
    subtext: [
      'in a 2014 study, university of pennsylvania researchers imaged the brains of 428 males and 521 female youths - an uncharacteristically huge sample - and found that the females\' brains more consistently showed more coordinated activity between hemispheres, while the males\' brain activity was more tightly coordinated within local brain regions. this finding, a confirmation of results in smaller studies published earlier, tracks closesly with others\' observation that the corpus callosum -- the white matter cable that crosses and connects the hemispheres -- is bigger in women than in men and women\'s brains tend to be more bilaterally symmetrical than me.',
    ],
    endgameLabel: '🌸☠️',
    endgame: [
      'does the heat of a girl matter?',
      'men are from earth, women are from earth. deal with it',
      'i want to be important. by being different',
      'that’s one of the reasons i never wanted to get married. the last thing i wanted was infinite security and to be the place an arrow shoots off from',
    ],
    wingame: [
      'the female body plan is our default condition. take that, adam and eve',
    ],
    symbols: GIRLS
  },
  // letter: {
  //   id: 'letter',
  //   text: 'this is a love letter',
  //   endgame: '',
  //   wingame: '',
  //   symbols: LETTERS
  // },
};

export const LOVE_LETTERS = [
  'i miss you',
  'i think our love can do anything we want it to',
  'you are a song a dream a whisper',
  'it was real wasnt it',
  'kiss me again kiss me until im sick of it',
  'you dont love because you love despite',
  'you have been in every line i have ever read',
  'i am half agony half hope',
  'against reason against promise against peace against hope against happiness against all discouragement',
  'im never not thinking of you',
  'i fell in love with your courage your sincerity and your flaming self respect',
  'you are one of the lights the lights of all lights',
  'you know youre in love when you cant fall asleep because reality is finally better than your dreams',
  'have you ever been in love? horrible isnt it?',
];

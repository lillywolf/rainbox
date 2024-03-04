import { COSMOS, SYMBOLS as SYMBOLS_SPARKLES } from './sparkles';
import { SYMBOLS_OCCULT, SYMBOLS as SYMBOLS_WEIRD } from './weird';
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
  subtext?: string | string[];
  cursor?: string;
  endgameLabel?: string;
  endgamePrefix?: string;
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
  }
};

export const SYMBOLS_DRUGS = {
  mine: {
    text: '💀',
  },
  empty: {
    text: '⬜',
  },
  0: {
    text: '💊'
  },
  1: {
    text: '⚡'
  },
  2: {
    text: '❤️'
  },
  3: {
    text: '🐉'
  },
  4: {
    text: '🤎'
  }
};

export const SYMBOLS_LOVE = {
  mine: {
    text: '🥀',
  },
  empty: {
    text: '',
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
  }
};

export const symbolsFruit = () => {
  const symbols = FRUITS[Math.floor(Math.random() * FRUITS.length)];

  return {
    mine: {
      text: '✹',
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
    text: '🌕'
  },
  2: {
    text: '🌑'
  },
  3: {
    text: '☄️'
  },
  4: {
    text: '🪐'
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
  }
};

export const SYMBOLS_STANDARD = {
  mine: {
    text: '✖',
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
  }
};


export const SYMBOLS_FEMININITY = {
  mine: {
    text: '👶',
  },
  empty: {
    text: '🦢',
  },
  0: {
    text: '🦢',
  },
  1: {
    text: '🎀'
  },
  2: {
    text: '💄'
  },
  3: {
    text: '🎈'
  },
  4: {
    text: '❣️'
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
  }
};

export const SYMBOLS_SADNESS = {
  mine: {
    text: '🌧️',
  },
  empty: {
    text: '❤︎',
  },
  0: {
    text: '␡',
  },
  1: {
    text: '❤︎'
  },
  2: {
    text: '☎'
  },
  3: {
    text: '✄'
  },
  4: {
    text: '🪽'
  }
};

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
  }
}

export const SYMBOLS_COMPILER = {
  mine: {
    text: '✖',
  },
  empty: {
    text: '⚛☒☒⍁❑',
  },
  0: {
    text: '❑',
  },
  1: {
    text: '␛'
  },
  2: {
    text: '☒'
  },
  3: {
    text: '﹟'
  },
  4: {
    text: ''
  }
};

export const SYMBOLS_DIVINATION = {
  mine: {
    text: '🕷️',
  },
  empty: {
    text: '🩻😵',
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
  }
};

export const SYMBOLS_DREAMS = {
  mine: {
    text: '☀️',
  },
  empty: {
    text: '💭',
  },
  0: {
    text: '☁️',
  },
  1: {
    text: '🌊'
  },
  2: {
    text: '🫧'
  },
  3: {
    text: '🎈'
  },
  4: {
    text: '❤️'
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
    text: '♥︎',
    endgameLabel: '❤️‍🩹',
    endgame: [
      'when viewing picture of their partner, lovers show significant activation in some brain regions which include the ventral tegmental area (VTA), nucleus accumbens (NAC), caudate, insula, dorsal anterior cingulate cortex (dACC), dorsolateral prefrontal cortex (dlPFC), hippocampus, posterior cingulate cortex (PCC), precuneus, temporo-parietal junction (TPJ), and hypothamalus.',
      'are you happy i\'m here?',
      'isn\'t love just obsession that takes longer?',
      'kiss me, and you will see how important i am.',
      'i\'ll tell you, my friends: it\'s all in the nerves. the nerves that tense and relax as you approach the edges of companionship and love. the razor-sharp edges of companionship and love.',
      'every love story is a ghost story',
      'disruption of pair bonding induces plastic changes in the hypothalamic CRF system, and these changes are associated with individuals returning to their former partner.',
      'i should have loved a thunderbird instead; at least when spring comes they roar back again.',
      'yes, i was infatuated with you: i am still',
      'i cut you out because i couldn\'t stand being a passing fancy.',
      'it\'s weird to feel like you miss someone you\'re not even sure you know',
      'what did my arms do before they held you?',
      'for you, a thousand times over',
      'it takes two to make an accident',
      'for a moment i thought i loved her. but i am slow-thinking and full of interior rules that act as brakes on my desires',
      'when the heart speaks, the mind finds it indecent to object',
      'you don\'t know how happy i am to be with you',
      'love is by definition an unmerited gift; being loved without meriting it is the very proof of real love',
      'nothing good ever comes of love. what comes of love is always something better',
      'for a moment the two of them looked at each other, wordless, as if they were asleep and their dreams had converged on common ground, a place where sound was alien.',
      // 'i simply regard romantic comedies as a subgenre of sci-fi, in which the world created therein has different rules than my regular human world.',
    ],
    wingame: [
      'two people in love, alone, isolated from the world, that\'s beautiful',
      'with love everything is bought, everything is saved.',
      'a purpose of human life, no matter who is controlling it, is to love whoever is around to be loved.',
      'i feel and think much as you do, care about many of the things you care about, although most people do not care about them. you are not alone.',
    ],
    symbols: SYMBOLS_LOVE,
  },
  'standard': {
    id: 'standard',
    text: 'standard',
    endgameLabel: 'game over ☹',
    endgame: [
      'you have died. please take a number',
      'there is no why',
      'thank you for playing',
      'you and your friends are dead',
      'you ded',
      'you stepped on a mine and you\'re dead now',
      'you live and learn. then you die and forget it all',
      'and now for a final word from our sponsor',
      'i did not attend your funeral, but i sent a nice letter saying i approved of it.',
      'yep, you\'re dead',
      'aaaaaand you died',
      'good effort',
      'you died ☹',
    ],
    wingame: [
      'congratulations on another controlled near-death experience!',
      'is this how we cheat death?',
      'you have evaded destruction. appreciate this moment, because it won\'t last',
    ],
    symbols: SYMBOLS_STANDARD,
  },
  'retro': {
    id: 'retro',
    text: '',
    endgame: [],
    wingame: [],
    symbols: SYMBOLS_RETRO,
  },
  'fruits': {
    id: 'fruits',
    text: 'random fruits 🍋',
    // endgameLabel: '✹ game over',
    endgame: [
      'hi',
      'i miss you',
      'would you like to be friends?',
      'we can try again',
      'let\'s build a dream together',
      'i want to weigh less, to float up to where you are ‧₊˚',
      'will it all be wiped away',
      'are you really there? is anyone?',
      'we don\'t have to delete this',
      'what makes a core memory',
      'don\'t be scared. let\'s hold hands and never let go',
      'nothing makes sense',
      'this is the logical outcome of our ridiculous lives',
      'i think i made you up inside my head',
      'the brain appears to possess a special area which we might call poetic memory and which records everything that charms or touches us, that makes our lives beautiful ... love begins with a metaphor.',
      '🍑 🥝 🍉 🥥 🍋 🍐 🍋',
      'you\'re cute',
      ':)',
      'we should meet in another life, we should meet in air, me and you',
      'i can\'t see anything i don\'t like about you',
    ],
    wingame: [
      'your world is beautiful and i want to be in it with you',
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
    endgameLabel: 'game over 👾',
    endgame: [
      'in the beginning there was nothing, which exploded.',
      'space is big. you just won\'t believe how vastly, hugely, mind-bogglingly big it is. i mean, you may think it\'s a long way down the road to the chemist\'s, but that\'s just peanuts to space.',
      'left index finger to right index finger straight across your heart, that\'s the history of the earth. you know what human history is? human history is the nail on your right-hand index finger. not even the whole nail. just that little white part. the part you clip off when it gets too long. that\'s the discovery of fire and the invention of writing and galileo and newton and the moon landing and 9/11 and last week and this morning. compared to evolution we\'re newborns. compared to geology, we barely exist.',
      'looking at these stars suddenly dwarfed my own troubles and all the gravities of terrestrial life',
      'how inappropriate to call this planet "earth," when it is clearly "ocean"',
      'i want to stand as close to the edge as I can without going over. out on the edge you see all kinds of things you can\'t see from the center.',
      'the universe is a big place, perhaps the biggest.',
      'we all know interspecies romance is weird',
      'we are an impossibility in an impossible universe.',
      'two possibilities exist: either we are alone in the Universe or we are not. both are equally terrifying.',
      'the dinosaurs became extinct because they didn\'t have a space program. and if we become extinct because we don\'t have a space program, it\'ll serve us right!',
    ],
    wingame: [
      'we\'d stared into the face of Death, and Death blinked first.',
      'if you\'re looking for infinity, just close your eyes.',
    ],
    symbols: SYMBOLS_COSMOS,
  },
  'dreams': {
    id: 'dreams',
    text: 'dreaming',
    endgameLabel: '☁️',
    endgame: [
      'our dreams prove that to imagine -- to dream about things that have not happened -- is among mankind\'s deepest needs. herein lies the danger. if dreams were not beautiful, they would quickly be forgotten.',
      'for in that sleep of death what dreams may come, when we have shuffled off this mortal coil, must give us pause',
      'nothing happened today. and if anything did, i\'d rather not talk about it, because i didn\'t understand it.',
      'gn gn gn gn',
      'the stars go waltzing out in blue and red, and arbitrary blackness gallops in: i shut my eyes and all the world drops dead.',
      'and finally there is the fourth category, the rarest, the category of people who live in the imaginary eyes of those who are not present. they are the dreamers.',
      'we\'re artists too, but we do a good job hiding it, don\'t we?',
      'only in chaos are we conceivable',
      'would it save you a lot of time if i just gave up and went mad now?',
      'in science fiction, we dream. in order to colonize in space, to rebuild our cities, which are so far out of whack, to tackle any number of problems, we must imagine the future, including the new technologies that are required.',
      'i don\'t just make random things up. i consider the world around me. i live in it. i experience it. i love it. i hate it. i worry about it. then i imagine what\'s to come.',
      'science fiction is any idea that occurs in the head and doesn\'t exist yet, but soon will, and will change everything for everybody, and nothing will ever be the same again.',
      'every hundred feet the world changes',
    ],
    wingame: [
      'THE ONLY PROOF HE NEEDED / FOR THE EXISTENCE OF GOD / WAS MUSIC',
      'i do not know why snow is white. but i do know that snow is beautiful.',
    ],
    symbols: symbolsDreams(),
    symbolsFn: () => symbolsDreams(),
  },
  'loss': {
    id: 'loss',
    // text: 'alexei, do you know what despair is?',
    text: 'being sad',
    endgameLabel: '𓇢𓆸',
    endgame: [
      'sometimes human beings have to just sit in one place and, like, hurt',
      'i think you guys are going to have to come up with a lot of wonderful new lies, or people just aren\'t going to want to go on living.',
      'of all the words of mice and men, the saddest are, "it might have been."',
      'cry all you want, i won\'t tell anybody',
      'we\'ve always been terrible at doing the things we\'re supposed to do',
      'i\'m sorry',
      '"let\'s go" -- you, to me, a long time ago',
      'it\'s your party, you can cry if you want to',
      'it\'s hard to like, breathe sometimes',
      'just try to keep moving',
      'it always takes longer than you think it will',
      'being alone with people is the hardest kind of alone',
      'there\'s no way to hold on',
      'so we beat on, boats against the current, borne back ceaselessly into the past.',
      '"you see i usually find myself among strangers because i drift here and there trying to forget the sad things that happened to me."',
      'if personality is an unbroken series of successful gestures, then there was something gorgeous about you',
      'i\'ve been drunk for about a week now, and i thought it might sober me up to sit in a library',
      'anyone whose goal is "something higher" must expect someday to suffer vertigo. what is vertigo? fear of falling? no, vertigo is something other than fear of falling. it is the voice of the emptiness below us which tempts and lures us, it is the desire to fall, against which, terrified, we defend ourselves.',
      'the greek word for "return" is nostos. algos means "suffering." so nostalgia is the suffering caused by an unappeased yearning to return.',
      'therein lies the whole of man\'s plight. human time does not turn in a circle; it runs ahead in a straight line. that is why man cannot be happy: happiness is the longing for repetition.',
      'we all need someone to look at us',
      'who did they think i was? how did i turn out to be different?',
      'everything that starts as a comedy ends as a tragicomedy',
      'everything i\'ve ever let go of has claw marks on it',
      'i cried at night and i had an iron will',
      'a man goes walking in the forest ... the man goes walking, i go walking, through the forest and i run into five hundred thousand galicians who\'re walking and crying. and then i stop and i ask them why they\'re crying. and one of the galicians stops and says: because we\'re all alone and we\'re lost.',
      'stop moping, said don pancracio, all poets get lost at some point or another.',
      'now, of course, i\'m out of a job and sometimes, when i\'m in a certain mood, when i wake up with a hangover and it\'s one of those apocalytic mexico city mornings, i think that i did the wrong thing, that i could have invited someone else, in a word, that i fucked up, but most of the time i\'m not sorry.',
      'don\'t leave, don\'t leave, don\'t leave',
      'so everything lets us down, including curiosity and honesty and what we love best. yes, said the voice, but cheer up, it\'s fun in the end.',
      'the secret story is the one we\'ll never know, although we\'re living it from day to day, thinking we\'re alive, thinking we\'ve got it all under control and the stuff we overlook doesn\'t matter.',
      'perhaps when we find ourselves wanting everything, it is because we are dangerously close to wanting nothing',
      'god, but life is loneliness, despite all the opiates, despite the shrill tinsel gaiety of "parties" with no purpose, despite the false grinning faces we all wear.',
      'i like people too much or not at all',
      'there is nothing like puking with somebody to make you into old friends',
      'i must get my soul back from you; i am killing my flesh without it.',
      'i didn\'t want my picture taken because i was going to cry. i didn’t know why i was going to cry, but i knew that if anybody spoke to me or looked at me too closely the tears would fly out of my eyes and the sobs would fly out of my throat and i\'d cry for a week.',
      'i don’t care about anyone, and the feeling is quite obviously mutual.',
      'so many people are shut up tight inside themselves like boxes',
      'i didn’t want any flowers, i only wanted / to lie with my hands turned up and be utterly empty. / how free it is, you have no idea how free.',

    ],
    wingame: [
      'no single, individual moment is in and of itself unendurable',
      'how nice -- to feel nothing, and still get full credit for being alive.'
    ],
    symbols: SYMBOLS_SADNESS
  },
  'signal_loss': {
    id: 'signal_loss',
    text: 'signal loss',
    cursor: '◼',
    endgameLabel: 'c:\\ >_ ',
    endgame: [
      'one morning, just as i\'d been hoping, the numbers came back. the sequences didn\'t make any sense at first, but it didn\'t take me long to see the logic in them. the secret was to follow their lead.',
      'people aren\'t rational. we\'re not thinking machines, we\'re - we\'re feeling machines that happen to think.',
      'entropy is a bitch',
      // 'he might be a degenerate and he might not',
    ],
    wingame: [
    ],
    symbols: SYMBOLS_COMPILER
  },
  'compiler': {
    id: 'compiler',
    text: '/irregular expressions/',
    subtext: [
      'i dream of a compiler',
      'machines are your friend. machines don\'t lie. a mysterious machine is just a machine that hasn\'t been decoded yet.',
      'the iron  machines still exist, but they obey the orders of weightless bits.',
      'it\'s helpful to establish a crucial fact about information itself: the informative value of a communicated message depends on the degree to which its content is surprising.',
    ],
    endgame: [
      'filesystem error: "feelings.exe" not found',
      'missing keys in emotional hashmap',
      'collision detection failed, aborting',
      'exception: you are caught in an infinite loop and have crashed the application',
      'fatal error: reached heap limit allocation failed',
      'maximmum call stack size exceeded',
      'uncaught reference error',
      'syntax error: illegal character',
      'caught typeerror: illegal invocation',
      'invalid connection',
      'cannot read properties of null (reading "emotion.timer")',
      'undefined is not a function (evaluating process["control"])',
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
      'error while fetching http://user.control: you have lost connection to the server hosting this web page',
      'cross-origin request blocked: the same origin policy disallows reading the remote resource at http://fn.dontbestupid.com',
    ],
    wingame: [
      'i do not fear computers. i fear the lack of them.',
      'before creation there must be destruction'
    ],
    symbols: SYMBOLS_COMPILER
  },
  'thinking': {
    id: 'thinking',
    text: 'information is control',
    endgame: [
      'the devil was walking down the street with a friend, and they saw a man pick something up, look at it carefully and put it in his pocket. the friend said to the devil, "what\'s that?" the devil said, "he has found a bit of the truth." the friend said, "isn\'t that bad for business?" the devil said, "no, i am going to arrange to have him organize it."',
      'there is a lot of disconnected research that points toward possible purposes for the posterior cingulate cortex. it may be one of the components of verbal and auditory memory, multisensory perception, visuospatial cognition and/or evaluation of emotional behavior. the right hemisphere posterior cingulate is activated in comprehension of metaphors, and the left in associative learning. story comprehension seems to use the posterior cingulate. it is activated during anxiety and OCD, and may be overactive in bipolar disorder.',
      'i took a deep breath and listened to the old brag of my heart. i am, i am, i am.',
      'is there no way out of the mind?',
      'nothing happened today. and if anything did, i\'d rather not talk about it, because i didn\'t understand it.',
      'memory conforms to what we think we remember',
      'if you\'re too open-minded, your brain will fall out.',
      'those who do not remember the past are condemned to repeat it',
      'call my therapist, tell him he\'s a rich man',
      'i have never listened to anyone who criticized my taste in space travel, sideshows or gorillas. when this occurs, i pack up my dinosaurs and leave the room.',
      'what is real? because unceasingly we are bombarded with pseudo-realities manufactured by very sophisticated people using very sophisticated electronic mechanisms.',
    ],
    wingame: [
      'it wasn\'t a punishment but a new wrinkle. it gave us a glimpse of ourselves in our common humanity. it wasn\'t proof of our idle guilt but a sign of our miraculous and pointless innocence.',
    ],
    symbols: SYMBOLS_REGEX
  },
  // 'crown of roses': {},
  'war': {
    id: 'war',
    text: '',
    endgame: [
      'war is hell',
      'dear future generations: please accept our apologies. we were rolling drunk on petroleum.',
      'there are no dangerous weapons; there are only dangerous men.',
      'you should never be in the company of anyone with whom you would not want to die.',
      'stand in the ashes of a trillion dead souls and ask the ghosts if honor matters.',
      'it was a dangerous habit: once policemen stopped being civilians the only other thing they could be was soldiers.',
      'remember, the enemy\'s gate is down',
      'zakalwe, in all the human societies we have ever reviewed, in every age and every state, there has seldom if ever been a shortage of eager young males prepared to kill and die to preserve the security, comfort and prejudices of their elders, and what you call heroism is just an expression of this simple fact; there is never a scarcity of idiots.',
    ],
    wingame: [
      'i have told my sons that they are not under any circumstances to take part in massacres, and that the news of massacres of enemies is not to fill them with satisfaction or glee. i have also told them not to work for companies which make massacre machinery, and to express contempt for people who think we need machinery like that.',
      'human beings can\'t see anything without wanting to destroy it. that\'s original sin. and i\'m going to destroy it. death is going to die.',
      'to defeat evil, i must become a greater evil',
    ],
    symbols: SYMBOLS_COMPILER
  },
  'what': {
    id: 'what',
    text: '🦀',
    endgameLabel: '⚖️',
    endgame: [
      'your spiritual guide has left the building',
      'you are dead, but you can try manifesting aliveness and see if that helps',
      'no one wants your healing services',
      'now that you have reflected, perhaps you can see that death is the right choice for you',
      'mercury is in retrograde. also you are dead',
      'this proves two things: firstly, that god moves in extremely mysterious, not to say, circuitous ways. god does not play dice with the universe; he plays an ineffable game of His own devising, which might be compared, from the perspective of any of the other players, [ie., everybody.] to being involved in an obscure and complex version of poker in a pitch-dark room, with blank cards, for infinite stakes, with a Dealer who won\'t tell you the rules, and who smiles all the time.\n secondly, the earth\'s a libra.',
      'i just did some calculations, and i\'ve been able to determine that you\'re full of shit',
      'your karmic patterns aren\'t looking good',
      'your daily horoscope: dead',
      'the cosmic intelligences have whispered in my ear; according to them, you are no longer alive',
      'your fate is in the stars. the stars say you\'re dead',
      'even in the darkest places you can find yourself. or you can find your missing keys. anyway, you\'re dead.',
      'left to your own devices, you are probably headng for a fall. something tells me',
      'you are a freethinker with an inventive mind. unfortunately, you have freely thought your way into a number of stupid situations, including this one. welcome to the afterlife',
      'you will get you through this. you are in fact already through it, because you are dead.',
      'don\'t worry too much about things working out. now that you\'re dead, you can rest knowing that they definitely won\'t',
      'keep your eyes open for betrayal. it could come from anywhere',
      'you are practical and persistent. this has not really helped you in any way, as you never remember your mistakes. fortunately, you won\'t be making any more of them',
      'horus, the lord of hell, is the number one most powerful being in the universe. he says hey',
      'the rising moon on the tipped axis of uranus says you were once born, and at some point in the next few days or weeks you will meet someone else who was once born. also, you\'re dead',
      'as the leaves begin to change, think carefully about the changes you want to make in your own life. maybe a new hat',
      'according to your star chart, you were conceived during the daytime or possibly the nighttime',
      'the luminous header chiron is in the tenth house of the rising moon, which would have been great for you if you were still alive',
      'the stars didn\'t align, sorry'
    ],
    wingame: [

    ],
    symbols: SYMBOLS_DIVINATION
  },
  'power': {
    id: 'power',
    text: 'v',
    endgame: [
      'in some lost fold of the past, we wanted to be lions and we\'re no more than castrated cats',
      'if strength is justice, then is powerlessness a crime?',
      'it wasn\'t me who was wrong, it was the world',
      'the world can not be changed with pretty words alone',
      'vengeance is in the hands of the father',
      'you can\'t change the world without getting your hands dirty',
      'the trick of real combat is that everyone is human.',
      'you must pay for everything in this world, one way or another',
      'i do not entertain hypotheticals',
      'if the king doesn\'t move, then his subjects won\'t follow',
      'vengeance is mine; i will repay, saith the lord',
      'all life seeks primarly to expand itself',
    ],
    wingame: [
    ],
    symbols: SYMBOLS_POWER
  },
  'philosophy': {
    id: 'philosophy',
    text: 'entropy and eternal return',
    endgame: [
      'it takes all kinds, especially in this business.',
      'the eternal recurrence of my stupid feelings',
      'a human being should be able to change a diaper, plan an invasion, butcher a hog, conn a ship, design a building, write a sonnet, balance accounts, build a wall, set a bone, comfort the dying, take orders, give orders, cooperate, act alone, solve equations, analyse a new problem, pitch manure, program a computer, cook a tasty meal, fight efficiently, die gallantly. specialization is for insects.',
    ],
    wingame: [],
    symbols: SYMBOLS_COMPILER
  },
  'drugs': {
    id: 'drugs',
    text: 'euphoria',
    endgameLabel: '💊 🅿️ 🆚 ❎',
    endgame: [
      'will you be able to get off H? possibly. but will life have any novelty left after you do? I wouldn\'t bet on it. you\'ve played your own song too many times.',
      'my reasons for doing ketamine were to quiet the crying voices and to blunt the sharpness of the pain. i wanted to think Of things maybe but not About things, i\'d been thinking About things my whole life. the pain was always immediate and fresh, as if i\'d never been wounded before. it always took me by surprise.',
      'the acute withdrawal phase is often followed by a protracted phase of depression and insomnia that can last for months.',
      'the dream ended when olney et al demonstrated that animals given high doses of dizocilpine showed curious vacuoles (essentially, tiny holes) in their brains. specifically, the vacuoles showed up in the posterior cingulate cortex and retrosplenial cortex. further research showed that other indicators of damage were present, such as proliferation of microglia, secretion of a protein called HSP70 (heat-shock protein 70), and expression of certain genes.',
      '"take the best orgasm you\'ve ever had, multiply by 1000, and you\'re still nowhere near it."',
      'i love that there are some things that are so awesome that people will do them again and again until they totally fuck themselves up or die. it\'s like some kind of mythical danger, like the sirens. they will kill you but you cannot steer away!',
      'opioids are a class of drugs that derive from, or mimic, natural substances found in the opium poppy plant. as a class of substances, they act on opioid receptors to produce morphine-like effects.',
      'narcotic, derived from words meaning "numbness" or "sleep", as an american legal term, refers to cocaine and opioids and their source materials.',
      'sedare dolorem opus divinum est',
      'in england charles romney alder wright developed hundreds of opiate compounds in his search for a nonaddictive opium derivative. in 1874 he became the first person to synthesize diamorphine (heroin), using a process called acetylation, which involved boiling morphine with acetic anhydride for several hours.',
      'euphoria: the experience (or affect) of pleasure or excitement and intense feelings of well-being and happiness. euphoria is also a symptom of certain neurological or neuropsychiatric disorders, such as mania.',
      'the reward system (the mesocorticolimbic circuit) is a group of neural structures responsible for incentive salience (i.e. "wanting"; desire or craving for a reward and motivation), associative learning (primarily positive reinforcement and classical conditioning), and positively-valenced emotions, particularly ones involving pleasure as a core component (e.g. joy, euphoria, and ecstasy). in drug addiction, certain substances over-activate the reward circuit, leading to compulsive substance-seeking behavior resulting from synaptic plasticity in the circuit.',
      'there\'s an undertow involved that you didn\'t see coming. and once its talons are in you, you can\'t get free.',
      'i used to do oxycontin with him. it\'d probably make people who\'d never done it really sick. the feeling of euphoria you get from these things is so surreal.',
      'is this the famous stone that turneth all to gold?',
      'ketamine is called "dissociative" in action, which means that the mind is "separated" from the body. in many cases, this separation results in profound hallucinations and the sensation of entering another reality.',
      'many people who really like dissociatives have told me that they find them so attractive because they help take away a near-constant self-consciousness, an almost self-absorbing embarrassment or "inner critic".',
      'i desire the things that will destroy me in the end.',
      'i have this disease late at night sometimes, involving alcohol and the telephone.',
      'dear drugs, i miss you',
      'i wonder why i don\'t go to bed and go to sleep. but then it would be tomorrow, so i decide that no matter how tired, no matter how incoherent i am, i can skip on hour more of sleep and live.',
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
      'where is my john wayne',
      'in a 2014 study, university of pennsylvania researchers imaged the brains of 428 males and 521 female youths - an uncharacteristically huge sample - and found that the females\' brains more consistently showed more coordinated activity between hemispheres, while the males\' brain activity was more tightly coordinated within local brain regions. this finding, a confirmation of results in smaller studies published earlier, tracks closesly with others\' observation that the corpus callosum -- the white matter cable that crosses and connects the hemispheres -- is bigger in women than in men and women\'s brains tend to be more bilaterally symmetrical than me.',
    ],
    endgame: [
      'darling, a true lady takes off her dignity with her clothes and does her whorish best. at other times you can be as modest and dignified as your persona requires.',
      'i want to be important. by being different.',
      'that’s one of the reasons i never wanted to get married. the last thing i wanted was infinite security and to be the place an arrow shoots off from. i wanted change and excitement and to shoot off in all directions myself, like the colored arrows from a fourth of july rocket.',
      'i began to think maybe it was true that when you were married and had children it was like being brainwashed, and afterward you went about as numb as a slave in a totalitarian state.',
      'as it happened, i didn\'t grow up to be the kind of woman who is the heroine in a western, and although the men i have known have had many virtues and have taken me to live in many places i have come to love, they have never been john wayne, and they have never taken me to the bend in the river where the cottonwoods grow.',
    ],
    wingame: [
      'the female body plan is our default condition. take that, adam and eve.',
    ],
    symbols: SYMBOLS_FEMININITY
  },
  letter: {
    id: 'letter',
    text: 'this is a love letter',
    endgame: '',
    wingame: '',
    symbols: SYMBOLS_DREAMS
  },
};

export const LOVE_LETTERS = [
  'dear friend, even though we are far apart, i think about you every day. your friend, me',
  'when i met you, i liked you instantly',
  'you felt familiar to me, like someone i\'ve always known but had only just met',
  'i like being lost with you',
  '"let\'s go" -- you, to me, a long time ago',
  'it always felt like the truth with you',
  'it wasn\'t a punishment but a new wrinkle',
  'it wasn\'t proof of our idle guilt but a sign of our pointless and miraculous innocence',
  'every day i miss you. every day that goes by that we don\'t speak is still a day i think of you',
  'hi. can we go back in in time?',
  'let\'s dance together',
  'we were both dreaming in the same direction',
  'touch me, talk to me',
  'sitting on the dock on a sunday afternoon drinking coffee'
];

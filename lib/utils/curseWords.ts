const curseWords = {
    // Fuck
    "fuck": "fuck",
    "fucks": "fuck",
    "fucky": "fuck",
    "fuckin": "fuck",
    "fucking": "fuck",
    "fucko": "fuck",
    "fucker": "fuck",
    "fucked": "fuck",
    "fucc": "fuck",
    "fucken": "fuck",
    "fukken": "fuck",
    "motherfucker": "fuck",
    "mofo": "fuck",
    "muhfuck": "fuck",
    "muhfucker": "fuck",
    "motherfuck": "fuck",
    "mofuck": "fuck",
    "bumblefuck": "fuck",
    "bumfuck": "fuck",
    "clusterfuck": "fuck",
    "facefuck": "fuck",
    "fingerfuck": "fuck",
    "fuckabout": "fuck",
    "fuckaround": "fuck",
    "fuckboy": "fuck",
    "fook": "fuck",
    "feck": "fuck",
    "fookin": "fuck",
    "fooking": "fuck",
    "fecking": "fuck",
    "feckin": "fuck",
    "fuckery": "fuck",
    "fuckface": "fuck",
    "fack": "fuck",
    "fak": "fuck",
    "fuckity": "fuck",
    "mindfuck": "fuck",
    "frack": "fuck",
    "facking": "fuck",
    "freakin": "fuck",
    "freaking": "fuck",
    "freaker": "fuck",
    "fuuck": "fuck",
    "fuuuck": "fuck",
    "sex": "fuck",
    "shag": "fuck",
    "shagging": "fuck",
    "sext": "fuck",
    "sexting": "fuck",
    "humping": "fuck",
    // Shit
    "shit": "shit",
    "shits": "shit",
    "shite": "shit",
    "shittiest": "shit",
    "shiter": "shit",
    "shiters": "shit",
    "shitey": "shit",
    "shitty": "shit",
    "shitter": "shit",
    "shitters": "shit",
    "shat": "shit",
    "shats": "shit",
    "sheet": "shit",
    "sheets": "shit",
    "sheeit": "shit",
    "shittest": "shit",
    "shitbag": "shit",
    "shitbags": "shit",
    "bullshit": "shit",
    "bullshitting": "shit",
    // Bitch
    "bitch": "bitch",
    "bitching": "bitch",
    "bitchin": "bitch",
    "bizzle": "bitch",
    "bitches": "bitch",
    "biatch": "bitch",
    "biatches": "bitch",
    "biznatch": "bitch",
    "bish": "bitch",
    "beech": "bitch",
    // Asshole
    "asshole": "asshole",
    "assholes": "asshole",
    "arsehole": "asshole",
    "arseholes": "asshole",
    "butthole": "asshole",
    "buttholes": "asshole",
    "arse": "asshole",
    "arses": "asshole",
    "arseface": "asshole",
    "bunghole": "asshole",
    "bungholes": "asshole",
    "ahole": "asshole",
    "bhole": "asshole",
    "rectum": "asshole",
    // Dick
    "dick": "dick",
    "dicks": "dick",
    "dicked": "dick",
    "dickwad": "dick",
    "dicky": "dick",
    "dicking": "dick",
    "cock": "dick",
    "cocks": "dick",
    "peepee": "dick",
    "peepees": "dick",
    "dildo": "dick",
    "dildos": "dick",
    "penis": "dick",
    "schlong": "dick",
    "prick": "dick",
    "bellend": "dick",
    "knob": "dick",
    "nob": "dick",
    // Cunt
    "cunt": "cunt",
    "vag": "cunt",
    "fanny": "cunt",
    "twat": "cunt",
    "twot": "cunt",
    "twatty": "cunt",
    "vulva": "cunt",
    "pussy": "cunt",
    "clunge": "cunt",
    "gash": "cunt",
    "punani": "cunt",
    // Bastard
    "bastard": "bastard",
    "bastards": "bastard",
    "basterd": "bastard",
    "basterds": "bastard",
    "bastad": "bastard",
    "bastads": "bastard",
    // Cum
    "semen": "cum",
    "spunk": "cum",
    "spunked": "cum",
    "spooge": "cum",
    "spooging": "cum",
    "spooged": "cum",
    "splooge": "cum",
    "splooging": "cum",
    "splooged": "cum",
    "cumming": "cum",
    "cummin": "cum",
    "cums": "cum",
    "coom": "cum",
    "cooms": "cum",
    "coomer": "cum",
    "cummies": "cum",
    "cummy": "cum",
    "ejaculation": "cum",
    // Jerkoff
    "jerkoff": "jerkoff",
    "jackoff": "jerkoff",
    "wank": "jerkoff",
    "masturbate": "jerkoff",
    "handjob": "jerkoff",
    "jobbie": "jerkoff",
    // Piss
    "piss": "piss",
    "pisses": "piss",
    "pisss": "piss",
    "pissing": "piss",
    "pissed": "piss",
    // Blowjob
    "blowjob": "blowjob",
    "blowjobs": "blowjob",
    "blowie": "blowjob",
    "blowies": "blowjob",
    "jobby": "blowjob",
    "jobbies": "blowjob",
    // Faggot
    "faggot": "the F word",
    "fag": "the F word",
    "faggy": "the F word",
    "homo": "the F word",
    "gayass": "the F word",
    // Racial slurs
    "nigger": "the N word",
    "niggers": "the N word",
    "nagger": "the N word",
    "nigga": "the N word",
    "niggas": "the N word",
    "negro": "the N word",
    "negros": "the N word",
    "darkie": "the N word",
    "darkies": "the N word",
    "chink": "the N word",
    "chinky": "the N word",
    "chinkies": "the N word",
    // Misc. 
    "bollocks": "balls",
    "bollock": "balls",
    "bollocking": "balls",
    "douche": "douche",
    "douches": "douche",
    "douching": "douche",
    "tosser": "tosser",
    "tossa": "tosser",
    "pedophile": "pedophile",
    "pedo": "pedophile",
    "paedophile": "pedophile",
    "paedo": "pedophile",
    "kiddyfiddler": "pedophile",
    "pedobear": "pedophile",
}

export default curseWords
// Seasons 1–4 are copied verbatim from the criminal-minds-quotes-api repo (src/app/data.js); seasons 5–7
// were added from a later quote list. Keep edits here to data fixes only — parsing and cleanup happen in ./parse.ts.
// An author may end in "(note)"; parse.ts moves that into the quote's authorNote.
import type { RawQuoteData } from "./types";

export const rawQuotes = {
	"Season 1": {
		"1×01 Extreme Aggressor": [
			{
				text: "The belief in a supernatural source of evil is not necessary. Men alone are quite capable of every wickedness.",
				author: "Joseph Conrad",
				saidBy: "Gideon",
			},
			{
				text: "All is a riddle, and the key to a riddle…is another riddle.",
				author: "Ralph Waldo Emerson",
				saidBy: "Gideon",
			},
			{
				text: "Try again, fail again. Fail better.",
				author: "Samuel Beckett",
				saidBy: "Gideon",
			},
			{
				text: "Try not, do or do not.",
				author: "Yoda",
				saidBy: "Morgan",
			},
			{
				text: "The farther backward you can look, the farther forward you will see.",
				author: "Winston Churchill",
				saidBy: "Gideon",
			},
			{
				text: "When you look long into an abyss, the abyss looks into you.",
				author: "Friedrich Nietzsche",
				saidBy: "Gideon",
			},
		],
		"1×02, Compulsion": [
			{
				text: "Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.",
				author: "Albert Einstein",
				saidBy: "Gideon",
			},
			{
				text: "There are certain clues at a crime scene which by their very nature do not lend themselves to being collected or examined. How's one collect love, rage, hatred, fear…? These are things that we're trained to look for.",
				author: "James Reese",
				saidBy: "Gideon",
			},
			{
				text: "Don't bother just to be better than your contemporaries or predecessors. Try to be better than yourself.",
				author: "William Faulkner",
				saidBy: "Gideon",
			},
		],
		"1×03, Won't Get Fooled Again": [
			{
				text: "Almost all absurdity of conduct arises from the imitation of those whom we cannot resemble.",
				author: "Samuel Johnson",
				saidBy: "Gideon",
			},
		],
		"1×04, Plain Sight": [
			{
				text: "Don't forget that I cannot see myself — that my role is limited to being the one who looks in the mirror.",
				author: "Jacques Rigaut",
				saidBy: "Gideon",
			},
			{
				text: "Birds sing after a storm. Why shouldn't people feel as free to delight in whatever sunlight remains to them?",
				author: "Rose Kennedy",
				saidBy: "Gideon",
			},
		],
		"1×05, Broken Mirror": [
			{
				text: "When a good man is hurt, all who would be called good must suffer with him.",
				author: "Euripides",
				saidBy: "Gideon",
			},
			{
				text: "When love is in excess, it brings a man no honor, nor worthiness.",
				author: "Euripides",
				saidBy: "Gideon",
			},
		],
		"1×06, L.D.S.K.": [
			{
				text: "The irrationality of a thing is not an argument against its existence, rather, a condition of it.",
				author: "Friedrich Nietzsche",
				saidBy: "Gideon",
			},
			{
				text: "Nothing is so common as the wish to be remarkable.",
				author: "(attributed to) William Shakespeare",
				saidBy: "Hotch",
			},
		],
		"1×07, The Fox": [
			{
				text: "With foxes, we must play the fox.",
				author: "Thomas Fuller",
				saidBy: "Gideon",
			},
		],
		"1×08, Natural Born Killer": [
			{
				text: "There is no hunting like the hunting of man, and those who have hunted armed men long enough, and liked it, never really care for anything else.",
				author: "Ernest Hemingway",
				saidBy: "Gideon",
			},
			{
				text: "The healthy man does not torture others. Generally it is the tortured who turn into torturers.",
				author: "Carl Jung",
				saidBy: "Gideon",
			},
		],
		"1×09, Derailed": [
			{
				text: "A belief is not merely an idea the mind possesses. It is an idea that possesses the mind.",
				author: "Robert Oxton Bolton",
				saidBy: "Gideon",
			},
			{
				text: "The question that sometimes drives me hazy: Am I, or the others crazy?",
				author: "Albert Einstein",
				saidBy: "Reid",
			},
		],
		"1×10, The Popular Kids": [
			{
				text: "Unfortunately, a super-abundance of dreams is paid for by a growing potential for nightmares.",
				author: "Sir Peter Ustinov",
				saidBy: "Gideon",
			},
			{
				text: "Ideologies separate us. Dreams and anguish bring us together.",
				author: "Eugene Ionesco",
				saidBy: "Gideon",
			},
		],
		"1×11, Blood Hungry": [
			{
				text: "The bitterest tears shed over graves are for words left unsaid and deeds left undone.",
				author: "Harriet Beecher Stowe",
				saidBy: "Gideon",
			},
		],
		"1×12, What Fresh Hell?": [
			{
				text: "Evil is always unspectacular and always human. And shares our bed…and eats at our table.",
				author: "W.H. Auden",
				saidBy: "Gideon",
			},
			{
				text: "Measure not the work until the day's out and the labor done.",
				author: "Elizabeth Barrett Browning",
				saidBy: "Gideon",
			},
		],
		"1×13, Poison": [
			{
				text: "What is food to one is to others bitter poison.",
				author: "Lucretius",
				saidBy: "Gideon",
			},
			{
				text: "Before you embark on a journey of revenge, dig two graves.",
				author: "Confucius",
				saidBy: "Gideon",
			},
		],
		"1×14, Riding the Lightning": [
			{
				text: "Who so sheddeth man's blood by man shall his blood be shed.",
				author: "Genesis 9:6",
				saidBy: "Gideon",
			},
			{
				text: "What we do for ourselves dies with us. What we do for others and the world, remains and is immortal.",
				author:
					"Albert Pine – attributed to Pine, but actually by Mason Albert Pike, from his book 'Ex Corde Locutiones: Words from the Heart Spoken of His Dead Brethren'",
				saidBy: "Gideon",
			},
		],
		"1×15, Unfinished Business": [
			{
				text: "It is those we live with and love and should know who elude us.",
				author: "Norman Maclean",
				saidBy: "Gideon",
			},
			{
				text: "Who in his mind has not probe the dark water?",
				author: "'East from Eden' John Steinbeck (here used in a puzzle by the Keystone Killer)",
				saidBy: "Reid",
			},

			{
				text: "In the end, it's not the years in your life that count. It's the life in your years.",
				author: "Abraham Lincoln",
				saidBy: "Elle",
			},
		],
		"1×16, The Tribe": [
			{
				text: "The individual has always had to struggle to keep from being overwhelmed by the tribe.",
				author: "Friedrich Nietzsche",
				saidBy: "Hotch",
			},
		],
		"1×17, A Real Rain": [
			{
				text: "Murder is unique in that it abolishes the party it injures, so that society must take the place of the victim, and on his behalf demand atonement or grant forgiveness.",
				author: "W.H. Auden",
				saidBy: "Gideon",
			},
			{
				text: "It is better to be violent if there is violence in our hearts than to put on the cloak of non-violence to cover impotence.",
				author: "Mahatma Gandhi",
				saidBy: "Gideon",
			},
			{
				text: "I object to violence because when it appears to do good, the good is only temporary. The evil it does is permanent.",
				author: "Mahatma Gandhi",
				saidBy: "Hotch",
			},
		],
		"1×18, Somebody's Watching": [
			{
				text: "A photograph is a secret about a secret. The more it tells you, the less you know.",
				author: "Diane Arbus",
				saidBy: "Gideon",
			},
			{
				text: "An American has no sense of privacy. He does not know what it means. There is no such thing in the country.",
				author: "George Bernard Shaw",
				saidBy: "Gideon",
			},
		],
		"1×19, Machismo": [
			{
				text: "Other things may change us, but we start and end with family.",
				author: "Anthony Brandt",
				saidBy: "Hotch",
			},
			{
				text: "The house does not rest on the ground, but upon a woman.",
				author: "Mexican proverb",
				saidBy: "Hotch",
			},
		],
		"1×20, Charm and Harm": [
			{
				text: "There are some that only employ words for the purpose of disguising their thoughts.",
				author: "Voltaire",
				saidBy: "Gideon",
			},
			{
				text: "We are so accustomed to disguise ourselves to others, that in the end, we become disguised to ourselves.",
				author: "François de la Rochefoucauld",
				saidBy: "Gideon",
			},
		],
		"1×21, Secrets and Lies": [
			{
				text: "Whoever undertakes to set himself up as judge in the field of truth and knowledge is shipwrecked by the laughter of the gods.",
				author: "Albert Einstein",
				saidBy: "Gideon",
			},
			{
				text: "In a time of universal deceit, telling the truth is a revolutionary act.",
				author: "George Orwell",
				saidBy: "Gideon",
			},
		],
		"1×22, The Fisher King (1)": [
			{
				text: "No man needs a vacation so much as the man who has just had one.",
				author: "Elbert Hubbard",
				saidBy: "Gideon",
			},
		],
	},
	"Season 2": {
		"2×01, The Fisher King (2)": [
			{
				text: "The defects and faults of the mind are like wounds in the body. After all imaginable care has been taken to heal them up, still there will be a scar left behind.",
				author: "Francois de la Roche Foucauld",
				saidBy: "Gideon",
			},
			{
				text: "It has been said that time heals all wounds. I do not agree. The wounds remain. In time, the mind, protecting its sanity, covers them with scar tissue, and the pain lessens, but it is never gone.",
				author: "Rose Kennedy",
				saidBy: "Reid",
			},
		],
		"2×02, P911": [
			{
				text: "The test of the morality of a society is what it does for its children.",
				author: "Dietrich Bonhoeffer",
				saidBy: "Gideon",
			},
		],
		"2×03, The Perfect Storm": [
			{
				text: "Of all the animals, man is the only one that is cruel. He is the only one who inflicts pain for the pleasure of doing it.",
				author: "Mark Twain",
				saidBy: "Gideon",
			},
			{
				text: "Out of suffering have emerged the strongest souls. The most massive characters are seared with scars.",
				author: "Khalil Gibran",
				saidBy: "Hotch",
			},
		],
		"2×04, Psychodrama": [
			{
				text: "Man is least himself when he talks in his own person. Give him a mask, and he will tell you the truth.",
				author: "Oscar Wilde",
				saidBy: "Hotch",
			},
			{
				text: "The basis of shame is not some personal mistake of ours, but that this humiliation is seen by everyone.",
				author: "Milan Kundera",
				saidBy: "Hotch",
			},
		],
		"2×05, Aftermath": [
			{
				text: "Although the world is full of suffering, it is also full of overcoming it.",
				author: "Helen Keller",
				saidBy: "Gideon",
			},
		],
		"2×06, The Boogeyman": [
			{
				text: "We can easily forgive a child who is afraid of the dark. The real tragedy of life is when men are afraid of the light.",
				author: "Plato",
				saidBy: "Hotch",
			},
		],
		"2×07, North Mammon": [
			{
				text: "It's not so important who starts the game, but who finishes it.",
				author: "John Wooden",
				saidBy: "JJ",
			},
			{
				text: "The ultimate choice for a man, in as much as he is given to transcend himself, is to create or destroy, to love or to hate.",
				author: "Erich Fromm",
				saidBy: "JJ",
			},
		],
		"2×08, Empty Planet": [
			{
				text: "Crime butchers innocents to secure a prize. And innocence struggles with all its might against the attempts of crime.",
				author: "Maximilien Robespierre",
				saidBy: "Gideon",
			},
		],
		"2×09, The Last Word": [
			{
				text: "If men could only know each other, they would neither idolize nor hate.",
				author: "Elbert Hubbard",
				saidBy: "Gideon",
			},
			{
				text: "Remember that all through history, there have been tyrants and murderers, and for a time, they seem invincible. But in the end, they always fall. Always.",
				author: "Mahatma Ghandi",
				saidBy: "Hotch",
			},
		],
		"2×10, Lessons Learned": [
			{
				text: "Some of the best lessons are learned from past mistakes. The error of the past is the wisdom of the future.",
				author: "Dale Turner",
				saidBy: "Gideon",
			},
			{
				text: "In order to learn the most important lessons of life, one must each day surmount a fear.",
				author: "Ralph Waldo Emerson",
				saidBy: "Gideon",
			},
		],
		"2×11, Sex, Birth, Death": [
			{
				text: "Between the idea and the reality, between the motion and the act, falls the shadow.",
				author: "T.S. Eliot",
				saidBy: "Reid",
			},
			{
				text: "Between the desire and the spasm, between the potency and the existence, between the essence and the descent, falls the shadow. This is the way the world ends.",
				author: "T.S. Eliot",
				saidBy: "Reid",
			},
		],
		"2×12, Profiler, Profiled": [
			{
				text: "All secrets are deep. All secrets become dark. That's in the nature of secrets.",
				author: "Cory Doctorow",
				saidBy: "Morgan",
			},
		],
		"2×13, No Way Out": [
			{
				text: "Evil brings men together.",
				author: "Aristotle",
				saidBy: "Gideon",
			},
		],
		"2×14, The Big Game": [
			{
				text: "I didn't have anything against them, and they never did anything wrong to me, the way other people have all my life. Maybe they're just the ones who have to pay for it.",
				author: "Perry Smith",
				saidBy: "Gideon",
			},
		],
		"2×15, Revelations": [
			{
				text: "There is not a righteous man on Earth who does what is right and never sins.",
				author: "Ecclesiastes 7:20",
				saidBy: "Hotch",
			},
		],
		"2×16, Fear and Loathing": [
			{
				text: "From the deepest desires often come the deadliest hate.",
				author: "Socrates",
				saidBy: "Gideon",
			},
			{
				text: "The life of the dead is placed in the memory of the living.",
				author: "Cicero",
				saidBy: "Reid",
			},
		],
		"2×17, Distress": [
			{
				text: "Our life is made by the death of others.",
				author: "Leonardo Da Vinci",
				saidBy: "Gideon",
			},
			{
				text: "If there must be trouble, let it be in my day, that my child may have peace.",
				author: "Thomas Paine",
				saidBy: "Hotch",
			},
		],
		"2×18, Jones": [
			{
				text: "Tragedy is a tool for the living to gain wisdom, not a guide by which to live.",
				author: "Robert Kennedy",
				saidBy: "Gideon",
			},
		],
		"2×19, Ashes and Dust": [
			{
				text: "The torture of a bad conscience is the hell of a living soul.",
				author: "John Calvin",
				saidBy: "Hotch",
			},
			{
				text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
				author: "Mahatma Ghandi",
				saidBy: "Hotch",
			},
		],
		"2×20, Honor Among Thieves": [
			{
				text: "There can be no good without evil.",
				author: "Russian proverb",
				saidBy: "Prentiss",
			},
			{
				text: "Happy families are all alike. Every unhappy family is unhappy in its own way.",
				author: "Leo Tolstoy",
				saidBy: "Prentiss",
			},
		],
		"2×21, Open Season": [
			{
				text: "One man's wilderness is another man's theme park.",
				author: "Unknown",
				saidBy: "Gideon",
			},
			{
				text: "Wild animals never kill for sport. Man is the only one to whom the torture and death of his fellow creatures is amusing in itself.",
				author: "James Anthony Froud",
				saidBy: "Prentiss",
			},
		],
		"2×22, Legacy": [
			{
				text: "Of all the preposterous assumptions of humanity, nothing exceeds the criticisms made of the habits of the poor by the well-housed, well-warmed, and well-fed.",
				author: "Herman Melville",
				saidBy: "Hotch",
			},
			{
				text: "Nothing is permanent in this wicked world. Not even our troubles.",
				author: "Charles Chaplin",
				saidBy: "Hotch",
			},
		],
		"2×23, No Way Out II: The Evilution of Frank": [
			{
				text: "I choose my friends for their good looks, my acquaintances for their good characters, and my enemies for their good intellects.",
				author: "Oscar Wilde",
				saidBy: "Gideon",
			},
		],
	},
	"Season 3": {
		'3×02, "In Name and Blood"': [
			{
				text: "Let your heart feel for the afflictions and distress of everyone.",
				author: "George Washington",
				saidBy: "Hotch",
			},
		],
		'3×03, "Scared to Death"': [
			{
				text: "He who controls others may be powerful but he who has mastered himself is mightier still.",
				author: "Philosopher Lao Tzu",
				saidBy: "Hotch",
			},
			{
				text: "You gain strength, courage, and confidence by every experience in which you really stop to look fear in the face. You must do the thing which you think you cannot do.",
				author: "Eleanor Roosevelt",
				saidBy: "Hotch",
			},
		],
		'3×04, "Children of the Dark"': [
			{
				text: "In the city, crime is taken as emblematic of class and race. In the suburbs though it's intimate and psychological; resistant to generalization; a mystery of the individual's soul.",
				author: "Barbara Ehrenreich",
				saidBy: "Prentiss",
			},
		],
		'3×05, "Seven Seconds"': [
			{
				text: "Nothing is easier than to denounce the evil doer; Nothing more difficult than understanding him.",
				author: "Fyodor Dostoevsky",
				saidBy: "Hotch",
			},
			{
				text: "Fairy tales do not tell children that dragons exist. Children already know that dragons exist. Fairy tales tell children that dragons can be killed.",
				author: "G.K. Chesterton",
				saidBy: "Hotch",
			},
		],
		'3×06, "About Face"': [
			{
				text: "Now what else is the whole life of mortals, but a sort of comedy in which the various actors, disguised by various costumes and masks, walk on and play each one's part until the manager walks them off the stage?",
				author: "Erasmus",
				saidBy: "Hotch",
			},
		],
		'3×07 "Identity"': [
			{
				text: "An earthly kingdom cannot exist without inequality of persons. Some must be free, some serfs, some rulers, some subjects.",
				author: "Martin Luther",
				saidBy: "Rossi",
			},
		],
		'3×08 "Lucky"': [
			{
				text: "Fantasy abandoned by reason produces impossible monsters.",
				author: "Francisco Goya",
				saidBy: "Morgan",
			},
			{
				text: "God sends meat and the devil sends cooks.",
				author: "Thomas Deloney",
				saidBy: "Morgan",
			},
		],
		'3×09 "Penelope"': [
			{
				text: "Love all. Trust a few. Do wrong to none.",
				author: "William Shakespeare",
				saidBy: "Garcia",
			},
		],
		'3×10 "True Night"': [
			{
				text: "Superman is, after all, an alien life form. He's simply the acceptable face of invading realities.",
				author: "Clive Barker",
				saidBy: "Reid",
			},
			{
				text: "The noir hero is a knight in blood-caked armor. He's dirty and he does his best to deny the fact that he's a hero the whole time.",
				author: "Frank Miller",
				saidBy: "Garcia",
			},
		],
		'3×11 "Birthright"': [
			{
				text: "It doesn't matter who my father was, it matters who I remember he was.",
				author: "Anne Sexton",
				saidBy: "Hotch",
			},
			{
				text: "A simple child that lightly draws its breath and feels its life in every limb. What should it know of death?",
				author: "Wordsworth",
				saidBy: "JJ",
			},
		],
		'3×12 "3rd Life"': [
			{
				text: "No man or woman who tries to pursue an ideal in his or her own way is without enemies.",
				author: "Daisy Bates",
				saidBy: "Hotch",
			},
			{
				text: "It is a wise father that knows his own child.",
				author: "William Shakespeare",
				saidBy: "Hotch",
			},
		],
		'3×13 "Limelight"': [
			{
				text: "I know indeed what evil I intend to do, but stronger than all my afterthoughts is my fury…fury that brings upon mortals the greatest evils.",
				author: "Euripides",
				saidBy: "Rossi",
			},
			{
				text: "For we pay a price for everything we get or take in this world; and although ambitions are well worth having, they are not to be cheaply won.",
				author: "Lucy Maud Montgomery",
				saidBy: "Rossi",
			},
		],
		'3×14 "Damaged"': [
			{
				text: "…within the core of each of us is the child we once were. This child constitutes the foundation of what we have become, who we are, and what we will be.",
				author: "Neuroscientist, Dr. R. Joseph",
				saidBy: "Rossi",
			},
			{
				text: "There is no formula for success except perhaps an unconditional acceptance of life and what it brings.",
				author: "Arthur Rubinstein",
				saidBy: "Hotch",
			},
		],
		'3×15 "A Higher Power"': [
			{
				text: "There is no refuge from confession but suicide; and suicide is confession.",
				author: "Daniel Webster",
				saidBy: "Rossi",
			},
			{
				text: "The most authentic thing about us is our capacity to create, to overcome, to endure, to transform, to love and to be greater than our suffering.",
				author: "Ben Okri",
				saidBy: "Prentiss",
			},
		],
		'3×16 "Elephant\'s Memory"': [
			{
				text: "A sad soul can kill you quicker, far quicker, than a germ.",
				author: "John Steinbeck",
				saidBy: "Reid",
			},
			{
				text: "We cross our bridges when we come to them and burn them behind us, with nothing to show for our progress except a memory of the smell of smoke, and a presumption that once our eyes watered.",
				author: "Tom Stoppard",
				saidBy: "Reid",
			},
		],
		'3×17 "In Heat"': [
			{
				text: "There are no secrets better kept than the secrets that everybody guesses.",
				author: "George Bernard Shaw",
				saidBy: "JJ",
			},
			{
				text: "If we knew each other's secrets, what comforts we should find.",
				author: "John Churton Collins",
				saidBy: "JJ",
			},
		],
		'3×18 "The Crossing"': [
			{
				text: "No man is happy without a delusion of some kind. Delusions are as necessary to our happiness as realities.",
				author: "Christian Nestell Bovee",
				saidBy: "Prentiss",
			},
			{
				text: "A woman must not depend upon the protection of man, but must be taught to protect herself.",
				author: "Susan B. Anthony",
				saidBy: "JJ",
			},
		],
		'3×19 "Tabula Rasa"': [
			{
				text: "All changes, even the most longed for, have their melancholy; for what we leave behind us is a part of ourselves. We must die to one life before we can enter another.",
				author: "Anatole France",
				saidBy: "Hotch",
			},
			{
				text: "What though the radiance that was once so bright, be now forever taken from my sight. Though nothing can bring back the hour of splendor in the grass, of glory in the flower; We will grieve not, rather find strength in what remains behind.",
				author: "William Wordsworth\n(This is not a quote but part of a poem.)",
				saidBy: "Reid",
			},
		],
		'3×20 "Lo-Fi"': [
			{
				text: "The man visited by ecstasies and visions, who takes dreams for realities is an enthusiast; the man who supports his madness with murder is a fanatic.",
				author: "Voltaire",
				saidBy: "Hotch",
			},
		],
	},
	"Season 4": {
		'4×01 "Mayhem"': [
			{
				text: "Never think that war, no matter how necessary, nor how justified, is not a crime.",
				author: "Ernest Hemingway",
				saidBy: "Hotch",
			},
		],
		'4×02 "The Angel Maker"': [
			{
				text: "We all die. The goal isn't to live forever, the goal is to create something that will.",
				author: "Chuck Palahniuk",
				saidBy: "Hotch",
			},
			{
				text: "The past is our definition. We may strive, with good reason, to escape it, or to escape what is bad in it, but we will escape it only by adding something better to it.",
				author: "Wendell Berry",
				saidBy: "Hotch",
			},
		],
		'4×03 "Minimal Loss"': [
			{
				text: "To follow by faith alone is to follow blindly.",
				author: "Benjamin Franklin",
				saidBy: "Reid",
			},
			{
				text: "Reason is not automatic. Those who deny it cannot be conquered by it.",
				author: "Ayn Rand",
				saidBy: "Prentiss",
			},
		],
		'4×04 "Paradise"': [
			{
				text: "A fool's paradise is a wise man's hell.",
				author: "Thomas Fuller",
				saidBy: "Hotch",
			},
			{
				text: "Things are not always what they seem; the first appearance deceives many; the intelligence of a few perceives what has been carefully hidden.",
				author: "Phaedrus",
				saidBy: "Hotch",
			},
		],
		'4×05 "Catching Out"': [
			{
				text: "Plenty sit still. Hunger is a wanderer.",
				author: "Zulu proverb",
				saidBy: "Prentiss",
			},
			{
				text: "Beyond the East the sunrise, beyond the West the sea, And the East and West the wander-thirst that will not let me be.",
				author: "Gerald Gould",
				saidBy: "Prentiss",
			},
		],
		'4×06 "The Instincts"': [
			{
				text: "Who speaks to the instincts speaks to the deepest in mankind and finds the readiest response.",
				author: "Amos Bronson Alcott",
				saidBy: "Hotch",
			},
			{
				text: "I think the truly natural things are dreams, which nature can't touch with decay.",
				author: "Bob Dylan",
				saidBy: "Reid",
			},
		],
		'4×07 "Memoriam"': [
			{
				text: "What was silent in the father speaks in the son, and often I found in the son the unveiled secret of the father.",
				author: "Friedrich Nietzsche",
				saidBy: "Reid",
			},
			{
				text: "There is no refuge from memory and remorse in this world. The spirits of our foolish deeds haunt us, with or without repentance.",
				author: "Gilbert Parker",
				saidBy: "Reid",
			},
		],
		'4×08 "Masterpiece"': [
			{
				text: "Let us consider that we are all insane. It will explain us to each other; it will unriddle many riddles...",
				author: "Mark Twain",
				saidBy: "Rossi",
			},
			{
				text: "Man must evolve for all human conflict a method which rejects revenge, aggression and retaliation. The foundation of such a method is love.",
				author: "Martin Luther King, Jr.",
				saidBy: "Rossi",
			},
		],
		'4×09 "52 Pickup"': [
			{
				text: "The minute people fall in love, they become liars.",
				author: "Harlan Ellison",
				saidBy: "Prentiss",
			},
			{
				text: "Cleanliness becomes more important when godliness is unlikely.",
				author: "P.J. O'Rourke",
				saidBy: "Rossi",
			},
		],
		'4×10 "Brothers in Arms"': [
			{
				text: "We are all brothers under the skin, and I, for one, would be willing to skin humanity to prove it.",
				author: "Ayn Rand",
				saidBy: "Morgan",
			},
			{
				text: "…for he today who sheds his blood with me shall be my brother.",
				author: "William Shakespeare",
				saidBy: "Morgan",
			},
		],
		'4×11 "Normal"': [
			{
				text: "Every normal man must be tempted at times to spit on his hands, hoist the black flag, and begin to slit throats.",
				author: "H.L. Mencken",
				saidBy: "Hotch",
			},
			{
				text: "There's no tragedy in life like the death of a child. Things never get back to the way they were.",
				author: "President Dwight Eisenhower",
				saidBy: "Rossi",
			},
		],
		'4×12 "Soul Mates"': [
			{
				text: "No mortal can keep a secret. If his lips are silent, he chatters with his fingertips; betrayal oozes out of him at every pore.",
				author: "Sigmund Freud",
				saidBy: "Reid",
			},
			{
				text: "Delay is the deadliest form of denial.",
				author: "British Historian C. Northcote Parkinson",
				saidBy: "Morgan",
			},
		],
		'4×13 "Bloodline"': [
			{
				text: "There is no doubt that it is around the family and the home that all the greatest virtues, the most dominating virtues of human society, are created, strengthened and maintained.",
				author: "Winston Churchill",
				saidBy: "Prentiss",
			},
			{
				text: "The strength of a family, like the strength of an army, is in its loyalty to each other.",
				author: "Mario Puzo",
				saidBy: "Hotch",
			},
		],
		'4×14 "Cold Comfort"': [
			{
				text: "And so, all the night-tide, I lay down by the side. Of my darling, my darling, my life and my bride. In the sepulchre there by the sea. In her tomb by the sounding sea.",
				author: "Edgar Allan Poe (this is from his poem, 'Annabel Lee').",
				saidBy: "JJ",
			},
			{
				text: "For those who believe, no proof is necessary. For those who don't believe, no proof is possible.",
				author: "Stuart Chase",
				saidBy: "Rossi",
			},
		],
		'4×15 "Zoe\'s Reprise"': [
			{
				text: "I never teach my pupils; I only attempt to provide the conditions in which they can learn.",
				author: "Albert Einstein",
				saidBy: "Rossi",
			},
			{
				text: "In youth we learn; in age we understand.",
				author: "Austrian novelist, Marie von Ebner-Eschenbach",
				saidBy: "Rossi",
			},
		],
		'4×16 "Pleasure is my Business"': [
			{
				text: "The prostitute is not, as feminists claim, the victim of men, but rather their conqueror, an outlaw, who controls the sexual channels between nature and culture.",
				author: "Camille Paglia",
				saidBy: "Hotch",
			},
		],
		'4×17 "Demonology"': [
			{
				text: "He who does not punish evil, commands it to be done.",
				author: "Leonardo Da Vinci",
				saidBy: "Prentiss",
			},
			{
				text: "There is no heresy or no philosophy which is so abhorrent to the church as a human being.",
				author: "James Joyce",
				saidBy: "Rossi",
			},
		],
		'4×18 "Omnivore"': [
			{
				text: "Fate is not satisfied with inflicting one calamity.",
				author: "Roman author Publilius Syrus",
				saidBy: "Hotch",
			},
			{
				text: "Men heap together the mistakes of their lives, and create a monster they call destiny.",
				author: "John Hobbes",
				saidBy: "Hotch",
			},
		],
		'4×19 "House On Fire"': [
			{
				text: "We all live in a house on fire, no fire department to call; no way out.",
				author: "Tennessee Williams",
				saidBy: "Hotch",
			},
			{
				text: "I have loved to the point of madness; That which is called madness, That which to me, is the only sensible way to love.",
				author: "Francoise Sagan",
				saidBy: "Hotch",
			},
		],
		'4×20 "Conflicted"': [
			{
				text: "Light thinks it travels faster than anything but it is wrong. No matter how fast light travels, it finds the darkness has always got there first, and is waiting for it.",
				author: "Terry Pratchett",
				saidBy: "Reid",
			},
			{
				text: "Monsters are real, and ghosts are real too. They live inside us, and sometimes, they win.",
				author: "Stephen King",
				saidBy: "Reid",
			},
		],
		'4×21 "A Shade of Gray"': [
			{
				text: "To lose a child is to lose a piece of yourself.",
				author: "Dr. Burton Grebin",
				saidBy: "Rossi",
			},
			{
				text: "Without a family, man, alone in the world, trembles with the cold.",
				author: "Andre Maurois",
				saidBy: "Rossi",
			},
		],
		'4×22 "The Big Wheel"': [
			{
				text: "In order for the light to shine so brightly, the darkness must be present.",
				author: "Francis Bacon",
				saidBy: "Hotch",
			},
			{
				text: "No matter how dark the moment, love and hope are always possible.",
				author: "George Chakiris",
				saidBy: "Morgan",
			},
		],
		'4×23 "Roadkill"': [
			{
				text: "I'm not sure about automobiles. With all their speed forward they may be a step backward in civilization.",
				author: "Booth Tarkington",
				saidBy: "Hotch",
			},
			{
				text: "The human voice can never reach the distance that is covered by the still small voice of conscience.",
				author: "Mahatma Gandhi",
				saidBy: "JJ",
			},
		],
		'4×24 "Amplification"': [
			{
				text: "It will become fine dust over all the land of Egypt and it will become boils breaking out with sores on man and beast through all the land of Egypt.",
				author: "Exodus 9:9",
				saidBy: "Reid",
			},
			{
				text: "Security is mostly a superstition. It does not exist in nature, nor do the children of men as a whole experience it.",
				author: "Helen Keller",
				saidBy: "Reid",
			},
		],
		'4×25/26 "To Hell…And Back"': [
			{
				text: "If there were no hell, we would be like the animals. No hell, no dignity.",
				author: "Flannery O'Connor",
				saidBy: "Hotch",
			},
			{
				text: "Sometimes there are no words. No clever quotes to neatly sum up what's happened that day… sometimes the day… just… ends.",
				author:
					"Aaron Hotchner (Note: This is the first time that a quote used in the beginning or end of the episode had one of the main characters as its author.)",
				saidBy: "Hotch",
			},
		],
	},
	"Season 5": {
		'5×01 "Nameless, Faceless"': [
			{
				text: "A weak man has doubts before a decision. A strong man has them afterwards.",
				author: "Karl Kraus",
				saidBy: "Rossi",
			},
		],
		'5×02 "Haunted"': [
			{
				text: "One need not be a chamber to be haunted, one need not to be a house. The brain has corridors surpassing material place.",
				author: "Emily Dickinson",
				saidBy: "Hotch",
			},
			{
				text: "There is no witness so dreadful, no accuser so terrible as the conscience that dwells in the heart of every man.",
				author: "Polybius",
				saidBy: "Hotch",
			},
		],
		'5×03 "Reckoner"': [
			{
				text: "Justice without force is powerless; force without justice is tyrannical.",
				author: "Blaise Pascal",
				saidBy: "Rossi",
			},
			{
				text: "I have always found that mercy bears richer fruits than strict justice.",
				author: "Abraham Lincoln",
				saidBy: "Rossi",
			},
		],
		'5×04 "Hopeless"': [
			{
				text: "There is no lasting hope in violence, only temporary relief from hopelessness.",
				author: "Kingman Brewster, Jr.",
				saidBy: "Morgan",
			},
			{
				text: "These violent delights have violent ends.",
				author: "William Shakespeare",
				saidBy: "Morgan",
			},
		],
		'5×05 "Cradle to Grave"': [
			{
				text: "You don’t really understand human nature unless you know why a child on a merry-go-round will wave at his parents every time around and why his parents will always wave back.",
				author: "William D. Tammeus",
				saidBy: "JJ",
			},
		],
		'5×06 "The Eyes Have It"': [
			{
				text: "And if thy right eye offend thee, pluck it out and cast it from thee.",
				author: "Matthew 5:29",
				saidBy: "Morgan",
			},
			{
				text: "Dwell in peace in the home of your own being and the messenger of death will not be able to touch you.",
				author: "Guru Nanak",
				saidBy: "Morgan",
			},
		],
		'5×07 "The Performer"': [
			{
				text: "In all the darkest pages of the malign supernatural, there is no more terrible tradition than that of the vampire – a pariah even among demons.",
				author: "Montague Summers",
				saidBy: "Reid",
			},
			{
				text: "Better to write for yourself and have no public than to write for the public and have no self.",
				author: "Cyril Connolly",
				saidBy: "Prentiss",
			},
		],
		'5×08 "Outfoxed"': [
			{
				text: "Man usually avoids attributing cleverness to somebody else unless it’s an enemy.",
				author: "Albert Einstein",
				saidBy: "Morgan",
			},
		],
		'5×09 "100"': [
			{
				text: "He who fights with monsters might take care lest he thereby become a monster. And if you gaze for long into an abyss, the abyss gazes also into you.",
				author: "Friedrich Nietzsche",
				saidBy: "Hotch",
			},
			{
				text: "So much of what is best in us is bound up in our love of family that it remains the measure of our stability because it measures our sense of loyalty.",
				author: "Haniel Long",
				saidBy: "Hotch",
			},
		],
		'5×10 "The Slave of Duty"': [
			{
				text: "Where we love is home, home that our feet may leave, but not our hearts.",
				author: "Oliver Wendell Holmes",
				saidBy: "Hotch",
			},
			{
				text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
				author: "Ralph Waldo Emerson",
				saidBy: "Hotch",
			},
		],
		'5×11 "Retaliation"': [
			{
				text: "Men are more ready to repay an injury than a benefit, because gratitude is a burden and revenge a pleasure.",
				author: "Tacitus",
				saidBy: "Prentiss",
			},
			{
				text: "There is a sacredness in tears. They are not the mark of weakness but of power. They are messengers of overwhelming grief and of unspeakable love.",
				author: "Washington Irving",
				saidBy: "Prentiss",
			},
		],
		'5×12 "The Uncanny Valley"': [
			{
				text: "Anything you cannot relinquish when it has outlived its usefulness possesses you, and in this materialistic age a great many of us are possessed by our possessions.",
				author: "Peace Pilgrim",
				saidBy: "Reid",
			},
			{
				text: "In life, unlike chess, the game continues after checkmate.",
				author: "Isaac Asimov",
				saidBy: "Reid",
			},
		],
		'5×13 "Risky Business"': [
			{
				text: "Life is a game – play it … Life is too precious, do not destroy it.",
				author: "Mother Teresa",
				saidBy: "JJ",
			},
			{
				text: "Experience is a brutal teacher, but you learn. My God, do you learn.",
				author: "C.S. Lewis",
				saidBy: "JJ",
			},
		],
		'5×14 "Parasite"': [
			{
				text: "Oh, what a tangled web we weave when first we practice to deceive.",
				author: "Sir Walter Scott",
				saidBy: "Prentiss",
			},
			{
				text: "If I am what I have, and if I lose what I have, who, then, am I?",
				author: "Erich Fromm",
				saidBy: "Prentiss",
			},
		],
		'5×15 "Public Enemy"': [
			{
				text: "When a father gives to his son, both laugh; when his son gives to his father, both cry.",
				author: "William Shakespeare",
				saidBy: "Rossi",
			},
			{
				text: "Show me a hero, and I will write you a tragedy.",
				author: "F. Scott Fitzgerald",
				saidBy: "Rossi",
			},
		],
		'5×16 "Mosley Lane"': [
			{
				text: "Hope is the thing with feathers, that perches in the soul, and sings the tune without words, and never stops at all.",
				author: "Emily Dickinson",
				saidBy: "JJ",
			},
			{
				text: "Hope is the worst of evils, for it prolongs the torments of man.",
				author: "Friedrich Nietzsche",
				saidBy: "JJ",
			},
		],
		'5×17 "Solitary Man"': [
			{
				text: "Family is a haven in a heartless world.",
				author: "Christopher Lasch",
				saidBy: "Morgan",
			},
			{
				text: "We’re all of us sentenced to solitary confinement inside our own skins, for life.",
				author: "Tennessee Williams",
				saidBy: "Prentiss",
			},
		],
		'5×18 "The Fight"': [
			{
				text: "I have found the paradox, that if you love until it hurts, there can be no more hurt, only more love.",
				author: "Mother Teresa",
				saidBy: "Hotch",
			},
		],
		'5×19 "Rite of Passage"': [
			{
				text: "Many persons have the wrong idea of what constitutes true happiness. It is not attained through self-gratification, but through fidelity to a worthy purpose.",
				author: "Helen Keller",
				saidBy: "Hotch",
			},
			{
				text: "A lion’s work hours are only when he’s hungry. Once he’s satisfied, the predator and prey lie peacefully together.",
				author: "Chuck Jones",
				saidBy: "Prentiss",
			},
		],
		'5×20 "…A Thousand Words"': [
			{
				text: "A sincere artist tries to create something which is, in itself, a living thing.",
				author: "William Dobell",
				saidBy: "Rossi",
			},
			{
				text: "I have seen children successfully surmount the effects of an evil inheritance. That is due to purity being an inherent attribute of the soul.",
				author: "Mahatma Gandhi",
				saidBy: "Hotch",
			},
		],
		'5×21 "Exit Wounds"': [
			{
				text: "Nature, in her most dazzling aspects or stupendous parts, is but the background and theater of the tragedy of man.",
				author: "John Morley",
				saidBy: "Garcia",
			},
			{
				text: "Nothing is so strong as gentleness, and nothing is so gentle as real strength.",
				author: "Ralph W. Sockman",
				saidBy: "Garcia",
			},
		],
		'5×22 "The Internet Is Forever"': [
			{
				text: "The single biggest problem with communication is the illusion that it has taken place.",
				author: "George Bernard Shaw",
				saidBy: "Hotch",
			},
			{
				text: "The Internet is the first thing that humanity has built that humanity doesn’t understand, the largest experiment in anarchy that we have ever had.",
				author: "Eric Schmidt",
				saidBy: "Rossi",
			},
		],
		'5×23 "Our Darkest Hour"': [
			{
				text: "And out of the darkness came the hands that reach thro’ nature, moulding men.",
				author: "Alfred Lord Tennyson",
				saidBy: "Morgan",
			},
		],
	},
	"Season 6": {
		'6×01 "The Longest Night"': [
			{
				text: "A family is a place where minds come in contact with one another. If these minds love one another, the home will be as beautiful as a flower garden. But if these minds get out of harmony with one other it is like a storm that plays havoc with the garden.",
				author: "The Buddha",
				saidBy: "JJ",
			},
		],
		'6×02 "JJ"': [
			{
				text: "A tragedy need not have blood and death; it’s enough that it all be filled with that majestic sadness that is the pleasure of tragedy.",
				author: "Jean Racine",
				saidBy: "JJ",
			},
		],
		'6×03 "Remembrance of Things Past"': [
			{
				text: "Remembrance of things past is not necessarily the remembrance of things as they were.",
				author: "Marcel Proust",
				saidBy: "Rossi",
			},
			{
				text: "When I was younger, I could remember anything, whether it had happened or not. But my faculties are decaying now, and soon I shall be so that I cannot remember any but the things that never happened. It is sad to go to pieces like this, but we all have to do it.",
				author: "Mark Twain",
				saidBy: "Rossi",
			},
		],
		'6×04 "Compromising Positions"': [
			{
				text: "We all wear masks, and the times comes when we cannot remove them without removing our own skin.",
				author: "Andre Berthiaume",
				saidBy: "Prentiss",
			},
			{
				text: "Whatever you are, be a good one.",
				author: "Abraham Lincoln",
				saidBy: "Garcia",
			},
		],
		'6×05 "Safe Haven"': [
			{
				text: "All humanity is one undivided and indivisible family. I cannot detach myself from the wickedest soul.",
				author: "Mahatma Gandhi",
				saidBy: "Morgan",
			},
			{
				text: "But I have promises to keep, and miles to go before I sleep, and miles to go before I sleep.",
				author: "Robert Frost",
				saidBy: "Morgan",
			},
		],
		'6×06 "Devil’s Night"': [
			{
				text: "If an injury has to be done to a man it should be so severe that his vengeance need not be feared.",
				author: "Niccolo Machiavelli",
				saidBy: "Hotch",
			},
			{
				text: "Love feels no burden, thinks nothing of its trouble, attempts what is above its strength, pleads no excuse of impossibility; for it thinks all things lawful for itself, and all things possible.",
				author: "Thomas à Kempis",
				saidBy: "Hotch",
			},
		],
		'6×07 "Middle Man"': [
			{
				text: "Without heroes, we are all plain people and don’t know how far we can go.",
				author: "Bernard Malamud",
				saidBy: "Hotch",
			},
			{
				text: "The herd seek out the great, not for their sake but for their influence; and the great welcome them out of vanity or need.",
				author: "Napoleon Bonaparte",
				saidBy: "Hotch",
			},
		],
		'6×08 "Reflection of Desire"': [
			{
				text: "Fame will go by and, so long, I’ve had you, fame. If it goes by, I’ve always known it was fickle. So at least it’s something I experience, but that’s not where I live.",
				author: "Marilyn Monroe",
				saidBy: "Garcia",
			},
			{
				text: "I believe humanity was born from conflict. Maybe that’s why in all of us lives a dark side. Some of us embrace it. Some have no choice. The rest of us fight it. In the end, it’s as natural as the air we breathe. At some point, we’re forced to face the truth. Ourselves.",
				author: "Penelope Garcia (Garcia’s own words)",
				saidBy: "Garcia",
			},
		],
		'6×09 "Into the Woods"': [
			{
				text: "I am invisible, understand, simply because people refuse to see me.",
				author: "Ralph Ellison",
				saidBy: "Morgan",
			},
			{
				text: "Evil endures a moment’s flush, and then leaves but a burnt out shell.",
				author: "Elise Cabot",
				saidBy: "Hotch",
			},
		],
		'6×10 "What Happens at Home"': [
			{
				text: "When we were children, we used to think that when we grew up we would no longer be vulnerable. But to grow up is to accept vulnerability… to be alive is to be vulnerable.",
				author: "Madeleine L’Engle",
				saidBy: "Hotch",
			},
			{
				text: "Children begin by loving their parents; as they grow older they judge them; sometimes they forgive them.",
				author: "Oscar Wilde",
				saidBy: "Rossi",
			},
		],
		'6×11 "25 to Life"': [
			{
				text: "There is no such thing as part freedom.",
				author: "Nelson Mandela",
				saidBy: "Morgan",
			},
			{
				text: "All truths are easy to understand once they are discovered. The point is to discover them.",
				author: "Galileo",
				saidBy: "Morgan",
			},
		],
		'6×12 "Corazón"': [
			{
				text: "No man chooses evil because it is evil; he only mistakes it for happiness, the good he seeks.",
				author: "Mary Wollstonecraft Shelley",
				saidBy: "Reid",
			},
			{
				text: "The best and most beautiful things in life cannot be seen or even touched. They must be felt with the heart.",
				author: "Helen Keller",
				saidBy: "Reid",
			},
		],
		'6×13 "The Thirteenth Step"': [
			{
				text: "What really raises one’s indignation against suffering is not suffering intrinsically, but the senselessness of suffering.",
				author: "Friedrich Nietzsche",
				saidBy: "Prentiss",
			},
			{
				text: "What happened in the past that was painful has a great deal to do with what we are today.",
				author: "William Glasser",
				saidBy: "Prentiss",
			},
		],
		'6×14 "Sense Memory"': [
			{
				text: "Hunting is not a sport. In a sport, both sides should know they are in the game.",
				author: "Paul Rodriguez",
				saidBy: "Morgan",
			},
			{
				text: "Nothing revives the past so completely as a smell that was once associated with it.",
				author: "Vladimir Nabokov",
				saidBy: "Prentiss",
			},
		],
		'6×15 "Today I Do"': [
			{
				text: "There’s no chance, no destiny, no fate, that can circumvent or hinder or control the firm resolve of a determined soul.",
				author: "Ella Wheeler Wilcox",
				saidBy: "Prentiss",
			},
			{
				text: "It’s hard to fight an enemy who has outposts in your head.",
				author: "Sally Kempton",
				saidBy: "Rossi",
			},
		],
		'6×16 "Coda"': [
			{
				text: "Tomorrow, you promise yourself, will be different, but tomorrow is too often a repetition of today.",
				author: "James T. McCay",
				saidBy: "Reid",
			},
		],
		'6×17 "Valhalla"': [
			{
				text: "When I let go of what I am, I become what I might be.",
				author: "Lao Tzu",
				saidBy: "Prentiss",
			},
			{
				text: "Confession is always weakness. The grave soul keeps its own secrets, and takes its own punishment in silence.",
				author: "Dorothea Dix",
				saidBy: "Prentiss",
			},
		],
		'6×18 "Lauren"': [
			{
				text: "People will believe a big lie sooner than a little one, and if you repeat it frequently enough, people will sooner or later believe it.",
				author: "Walter Langer",
				saidBy: "JJ",
			},
			{
				text: "The secret to getting away with lying is believing with all your heart. That goes for lying to yourself, even moreso than lying to another.",
				author: "Elizabeth Bear",
				saidBy: "Prentiss",
			},
		],
		'6×19 "With Friends Like These…"': [
			{
				text: "The old faiths light their candles all about, but burly truth comes by and puts them out.",
				author: "Lizette Reese",
				saidBy: "Reid",
			},
			{
				text: "It is not his enemy or foe that lures him to evil ways.",
				author: "Siddhartha Buddha",
				saidBy: "Morgan",
			},
		],
		'6×20 "Hanley Waters"': [
			{
				text: "Man, when he does not grieve, hardly exists.",
				author: "Antonio Porchia",
				saidBy: "Morgan",
			},
		],
		'6×21 "The Stranger"': [
			{
				text: "Sometimes human places create inhuman monsters.",
				author: "Stephen King",
				saidBy: "Hotch",
			},
		],
		'6×22 "Out of the Light"': [
			{
				text: "Of this alone, even God is deprived, the power of making things that are past never to have been.",
				author: "Agathon",
				saidBy: "Rossi",
			},
			{
				text: "Bring the past only if you’re going to build from it.",
				author: "Doménico Cieri Estrada",
				saidBy: "Hotch",
			},
		],
		'6×23 "Big Sea"': [
			{
				text: "The sea has never been friendly to man. At most, it has been the accomplice of human restlessness.",
				author: "Joseph Conrad",
				saidBy: "Rossi",
			},
			{
				text: "We are tied to the ocean. And when we go back to the sea, whether it is to sail or to watch, we are going back from whence we came.",
				author: "John F. Kennedy",
				saidBy: "Morgan",
			},
		],
		'6×24 "Supply & Demand"': [
			{
				text: "And yet to every bad there’s a worse.",
				author: "Thomas Hardy",
				saidBy: "Hotch",
			},
			{
				text: "What lies in our power to do, lies in our power not to do.",
				author: "Aristotle",
				saidBy: "Rossi",
			},
		],
	},
	"Season 7": {
		'7×01 "It Takes a Village"': [
			{
				text: "The past cannot be cured.",
				author: "Queen Elizabeth I",
				saidBy: "JJ",
			},
			{
				text: "I do solemnly swear that I will support and defend the Constitution of the United States against all enemies, foreign and domestic; that I will bear true faith and allegiance to the same; that I take this obligation freely, without any mental reservation or purpose of evasion; and that I will well and faithfully discharge the duties of the office on which I am about to enter. So help me God.",
				author: "FBI Oath of Office",
				saidBy: "Prentiss",
			},
		],
		'7×02 "Proof"': [
			{
				text: "If it is a miracle, any sort of evidence will answer. But if it is a fact, proof is necessary.",
				author: "Mark Twain",
				saidBy: "Reid",
			},
			{
				text: "Nothing inspires forgiveness quite like revenge.",
				author: "Scott Adams",
				saidBy: "Rossi",
			},
		],
		'7×03 "Dorado Falls"': [
			{
				text: "Men are not prisoners of fate, but only prisoners of their own minds.",
				author: "Franklin Delano Roosevelt",
				saidBy: "Reid",
			},
			{
				text: "We’re born alone, we live alone, we die alone. Only through our love and friendship can we create the illusion for the moment that we’re not alone.",
				author: "Orson Welles",
				saidBy: "Rossi",
			},
		],
		'7×04 "Painless"': [
			{
				text: "You may leave school, but it never leaves you.",
				author: "Andy Partridge",
				saidBy: "Reid",
			},
			{
				text: "Pain is the breaking of the shell that encloses your understanding.",
				author: "Kahlil Gibran",
				saidBy: "Hotch",
			},
		],
		'7×05 "From Childhood’s Hour"': [
			{
				text: "From childhood’s hour I have not been As others were; I have not seen As others saw.",
				author: "Edgar Allan Poe",
				saidBy: "Reid",
			},
			{
				text: "All things truly wicked start from an innocence.",
				author: "Ernest Hemingway",
				saidBy: "Rossi",
			},
		],
		'7×06 "Epilogue"': [
			{
				text: "To die is poignantly bitter, but the idea of having to die without having lived is unbearable.",
				author: "Erich Fromm",
				saidBy: "Rossi",
			},
			{
				text: "The timing of death, like the ending of a story, gives a changed meaning to what preceded it.",
				author: "Mary Catherine Bateson",
				saidBy: "Rossi",
			},
		],
		'7×07 "There’s No Place Like Home"': [
			{
				text: "For the man sound in body and serene of mind there is no such thing as bad weather, every sky has its beauty, and storms which whip the blood do but make it pulse more vigorously.",
				author: "George Gissing",
				saidBy: "Hotch",
			},
			{
				text: "Adversity is like a strong wind. I don’t mean just that it holds us back from places we might otherwise go. It also tears away from us all but the things that cannot be torn, so that afterward we see ourselves as we really are, and not merely as we might like to be.",
				author: "Arthur Golden",
				saidBy: "JJ",
			},
		],
		'7×08 "Hope"': [
			{
				text: "Hope is faith holding out its hand in the dark.",
				author: "George Iles",
				saidBy: "Garcia",
			},
			{
				text: "We are each on our own journey. Each of us is on our very own adventure; encountering all kinds of challenges, and the choices we make on that adventure will shape us as we go; these choices will stretch us, test us and push us to our limit; and our adventure will make us stronger then we ever know we could be.",
				author: "LuLu (Credited with “Thank you, LuLu!”)",
				saidBy: "Garcia",
			},
			{
				text: "Find a place inside where there’s joy, and the joy will burn out the pain.",
				author: "Joseph Campbell (Garcia calls him her favorite author)",
				saidBy: "Garcia",
			},
		],
		'7×09 "Self-Fulfilling Prophecy"': [
			{
				text: "Things do not change. We change.",
				author: "Henry David Thoreau",
				saidBy: "Morgan",
			},
			{
				text: "Beware, so long as you live, of judging men by their outward appearance.",
				author: "Jean de la Fontaine",
				saidBy: "Morgan",
			},
		],
		'7×10 "The Bittersweet Science"': [
			{
				text: "Everybody wants to go to heaven, but nobody wants to die.",
				author: "Joe Louis",
				saidBy: "Hotch",
			},
			{
				text: "Some of us think holding on makes us strong; but sometimes it is letting go.",
				author: "Hermann Hesse",
				saidBy: "Hotch",
			},
		],
		'7×11 "True Genius"': [
			{
				text: "Three can keep a secret if two of them are dead.",
				author: "Benjamin Franklin",
				saidBy: "Morgan",
			},
			{
				text: "There is no greater sorrow than to recall happiness in times of misery.",
				author: "Dante Alighieri",
				saidBy: "Reid",
			},
		],
		'7×12 "Unknown Subject"': [
			{
				text: "We do not suffer from the shock of our trauma, but we make out of it just what suits our purposes.",
				author: "Alfred Adler",
				saidBy: "Hotch",
			},
			{
				text: "All the art of living lies in a fine mingling of letting go and holding on.",
				author: "Henry Ellis",
				saidBy: "Prentiss",
			},
		],
		'7×13 "Snake Eyes"': [
			{
				text: "At the gambling table, there are no fathers or sons.",
				author: "Chinese proverb",
				saidBy: "Hotch",
			},
			{
				text: "A gambler with a system must be, to a greater or lesser extent, insane.",
				author: "George Augustus Sala",
				saidBy: "Rossi",
			},
		],
		'7×14 "Closing Time"': [
			{
				text: "For trust not him that hath once broken faith.",
				author: "William Shakespeare",
				saidBy: "Hotch",
			},
			{
				text: "You may be deceived if you trust too much, but you will live in torment if you do not trust enough.",
				author: "Frank Crane",
				saidBy: "Hotch",
			},
		],
		'7×15 "A Thin Line"': [
			{
				text: "Equality may perhaps be a right – but no power on earth can ever turn it into a fact.",
				author: "Honore de Balzac",
				saidBy: "Morgan",
			},
			{
				text: "I’m for truth, no matter who tells it. I’m for justice, no matter who it’s for – or against.",
				author: "Malcolm X",
				saidBy: "Prentiss",
			},
		],
		'7×16 "A Family Affair"': [
			{
				text: "Where there is anger, there is always pain underneath.",
				author: "Eckhart Tolle",
				saidBy: "Morgan",
			},
			{
				text: "Live so that when your children think of fairness and integrity, they think of you.",
				author: "H. Jackson Brown, Jr.",
				saidBy: "JJ",
			},
		],
		'7×17 "I Love You, Tommy Brown"': [
			{
				text: "Love is giving someone the ability to destroy you, but trusting them not to.",
				author: "Unknown",
				saidBy: "Morgan",
			},
			{
				text: "For every good reason there is to lie, there is a better reason to tell the truth.",
				author: "Bo Bennett",
				saidBy: "Morgan",
			},
		],
	},
} satisfies RawQuoteData;

export interface QuoteType {
	text: string;
	author: string;
	saidBy: string;
	season: string;
	episode: string;
}

export interface SeasonType {
	season: string;
	quotes: number;
}

export interface QuoteEpisodeType {
	text: string;
	author: string;
	saidBy: string;
	episode: string;
}

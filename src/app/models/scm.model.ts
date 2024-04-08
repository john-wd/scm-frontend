export interface Song {
  song_id: number;
  song_name: string;
  game_id: string;
  game_name: string;
  uploader: string;
  downloads: number;
  length: number;
  loop?: Loop;
}


export interface SongDetails extends Song {
  game_banner_exists: boolean;
  description: string;
  loop_start: number;
  loop_end: number;
  sample_rate: number;
  filesize: number;
}

export interface Game {
  game_id: number;
  game_name: string;
  song_count: number;
  // TO BE ADDED in backend v2
  series?: string;
  console?: string;
  total_downloads?: number;
  thumbnail_url?: string;
}

export interface Gamelist {
  games: Game[],
  game_count: number,
  song_count: number,
}

export interface Songlist {
  songs: Song[],
  song_count: number,
  game_id: number,
  game_name: string,
  game_banner_exists: boolean,
}


export type LoopType = "default" | "none" | "time" | "count"
export const availableTypes: LoopType[] = [
  "default",
  "count",
  "time",
  "none"
]
export type Loop = {
  loopType: LoopType;
  value?: number;
}

export namespace Api {
  export interface Gamelist {
    game_count: number;
    ok: boolean;
    total_song_count: number;
    games: GamelistEntry[];
  }

  export interface GamelistEntry {
    game_id: number;
    game_name: string;
    song_count: number;
  }

  export interface Songlist {
    ok: boolean;
    game_id: number;
    game_name: string;
    track_count: number;
    game_banner_exists: boolean;
    songs: SonglistEntry[];
  }

  export interface SonglistEntry {
    song_id: number;
    song_name: string;
    song_length: number;
    song_loop: ApiLoop;
    song_uploader: string;
    song_available: boolean;
    song_downloads: number;
  }

  export type ApiLoop = "Normal" | "Custom" | "E to S" | "None"

  export function loopForApiLoop(loop: ApiLoop): Loop {
    let type = (loop === "None") ? "none" : "default"
    return {
      loopType: type as LoopType,
    }
  }

  export interface Song {
    ok: boolean;
    name: string;
    description: string;
    approved_by: string;
    uploader: string;
    available: boolean;
    downloads: number;
    song_id: number;
    game_id: string;
    game_name: string;
    game_banner_exists: boolean;
    loop_type: ApiLoop;
    start_loop_point: number;
    end_loop_point: number;
    sample_rate: number;
    length: number;
    size: number;
    remix: boolean;
    theme_type: string;
  }
}



export namespace GameList {
  export interface Root {
    game_count: number;
    ok: boolean;
    total_song_count: number;
    games: Array<Entry>;
  }

  export interface Entry {
    game_id: number;
    game_name: string;
    song_count: number;
    // TO BE ADDED in backend v2
    series?: string;
    console?: string;
    total_downloads?: number;
    thumbnail_url?: string;
  }
}

export namespace SongList {
  export interface Root {
    ok: boolean;
    game_id: number;
    game_name: string;
    track_count: number;
    game_banner_exists: boolean;
    songs: Array<Entry>;
  }

  export interface Entry {
    song_id: number;
    song_name: string;
    song_length: number;
    song_loop: ScmLoopType;
    song_uploader: string;
    song_available: boolean;
    song_downloads: number;
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
  loop_type: ScmLoopType;
  start_loop_point: number;
  end_loop_point: number;
  sample_rate: number;
  length: number;
  size: number;
  remix: boolean;
  theme_type: string;
  loop?: Loop;
}

export enum ScmLoopType {
  normal = 'Normal',
  custom = 'Custom',
  etos = 'E to S',
  none = 'None',
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

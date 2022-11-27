export namespace GameList {
  export interface Main {
    game_count: number;
    ok: boolean;
    total_song_count: number;
    games: Entry[];
  }

  export interface Entry {
    game_id: number;
    game_name: string;
    song_count: number;
  }
}

export namespace Game {
  export interface Main {
    ok: boolean;
    game_name: string;
    track_count: number;
    game_banner_exists: boolean;
    songs: Song[];
  }

  export interface Song {
    song_id: number;
    song_name: string;
    song_length: number;
    song_loop: LoopType;
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
  game_id: string;
  game_name: string;
  game_banner_exists: boolean;
  loop_type: LoopType;
  start_loop_point: number;
  end_loop_point: number;
  sample_rate: number;
  length: number;
  size: number;
  remix: boolean;
  theme_type: string;
}

export enum LoopType {
    normal = "Normal",
    custom = "Custom",
    etos = "E to S",
    none = "None"
  }

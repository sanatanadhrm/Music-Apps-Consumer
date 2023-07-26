/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistsById(playlistId) {
    const query1 = {
      text: `SELECT a.id, a.name FROM playlists AS a 
          WHERE (a.id = $1)`,
      values: [playlistId],
    };

    const query2 = {
      text: `SELECT songs.id, songs.title, songs.performer 
      FROM songs LEFT JOIN playlists_songs ON 
      songs.id = playlists_songs.songs_id 
      WHERE playlists_songs.playlists_id = $1`,
      values: [playlistId],
    };
    const result1 = await this._pool.query(query1);
    const result2 = await this._pool.query(query2);
    return {
      playlist: {
        ...result1.rows[0],
        songs: result2.rows,
      },
    };
  }
}
module.exports = PlaylistsService;
